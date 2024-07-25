<template>

  <div class="flex flex-col">
    <el-row :gutter="16" class="summary">
      <el-col :sm="6" :xs="12">
        <TradeStatisticValue
          tooltip="昨日数据"
          title="昨日数据"
          :value="summary?.yesterdayData?.price || 0"
          :type='true'
          :percent="summary?.yesterdayData?.allPrice || 0"
        />
      </el-col>
      <el-col :sm="6" :xs="12">
        <TradeStatisticValue
          tooltip="今日数据"
          title="今日数据"
          :value="summary?.todayData?.price || 0"
          :percent="summary?.todayData?.allPrice || 0"
        />
      </el-col>
      <el-col :sm="6" :xs="12">
        <TradeStatisticValue
          tooltip="本周数据"
          title="本周数据"
          prefix="￥"
          :decimals="2"
          :value="summary?.weekData?.price || 0"
          :type='true'
          :percent="summary?.weekData?.allPrice || 0"
        />
      </el-col>
      <el-col :sm="6" :xs="12">
        <TradeStatisticValue
          tooltip="本月数据"
          title="本月数据"
          prefix="￥"
          ::decimals="2"
          :value="summary?.monthData?.price || 0"
          :percent="summary?.monthData?.allPrice || 0"
        />
      </el-col>
    </el-row>
    <el-row :gutter="16" class="summary">
      <el-col :sm="6" :xs="12">
        <TradeStatisticValueT
          tooltip="昨日数据"
          title="昨日数据"
          :value="jiaoyi?.yesterdayData?.effectiveCount || 0"
          :type='true'
          :percent="jiaoyi?.yesterdayData?.allCount || 0"
        />
      </el-col>
      <el-col :sm="6" :xs="12">
        <TradeStatisticValueT
          tooltip="今日数据"
          title="今日数据"
          :value="jiaoyi?.todayData?.effectiveCount || 0"
          :percent="jiaoyi?.todayData?.allCount || 0"
        />
      </el-col>
      <el-col :sm="6" :xs="12">
        <TradeStatisticValueT
          tooltip="本周数据"
          title="本周数据"
          prefix="￥"
          :decimals="2"
          :value="jiaoyi?.weekData?.effectiveCount || 0"
          :type='true'
          :percent="jiaoyi?.weekData?.allCount || 0"
        />
      </el-col>
      <el-col :sm="6" :xs="12">
        <TradeStatisticValueT
          tooltip="本月数据"
          title="本月数据"
          prefix="￥"
          ::decimals="2"
          :value="jiaoyi?.monthData?.price || 0"
          :percent="jiaoyi?.monthData?.allCount || 0"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import * as TradeStatisticsApi from '@/api/mall/statistics/trade'
import TradeStatisticValue from './components/TradeStatisticValue.vue'
import TradeStatisticValueT from './components/TradeStatisticValueT.vue'

import SummaryCard from '@/components/SummaryCard/index.vue'
import { EChartsOption } from 'echarts'
import { DataComparisonRespVO } from '@/api/mall/statistics/common'
import { TradeSummaryRespVO, TradeTrendSummaryRespVO } from '@/api/mall/statistics/trade'
import { calculateRelativeRate, fenToYuan } from '@/utils'
import download from '@/utils/download'
import { CardTitle } from '@/components/Card'
import * as DateUtil from '@/utils/formatTime'
import dayjs from 'dayjs'

/** 交易统计 */
defineOptions({ name: 'TradeStatistics' })

const message = useMessage() // 消息弹窗

const trendLoading = ref(true) // 交易状态加载中
const exportLoading = ref(false) // 导出的加载中
const summary = ref<DataComparisonRespVO<TradeSummaryRespVO>>() // 交易统计数据
const jiaoyi = ref({})
const trendSummary = ref<DataComparisonRespVO<TradeTrendSummaryRespVO>>() // 交易状况统计数据
const shortcutDateRangePicker = ref()

/** 折线图配置 */
const lineChartOptions = reactive<EChartsOption>({
  dataset: {
    dimensions: ['date', 'turnoverPrice', 'orderPayPrice', 'rechargePrice', 'expensePrice'],
    source: []
  },
  grid: {
    left: 20,
    right: 20,
    bottom: 20,
    top: 80,
    containLabel: true
  },
  legend: {
    top: 50
  },
  series: [
    { name: '营业额', type: 'line', smooth: true },
    { name: '商品支付金额', type: 'line', smooth: true },
    { name: '充值金额', type: 'line', smooth: true },
    { name: '支出金额', type: 'line', smooth: true }
  ],
  toolbox: {
    feature: {
      // 数据区域缩放
      dataZoom: {
        yAxisIndex: false // Y轴不缩放
      },
      brush: {
        type: ['lineX', 'clear'] // 区域缩放按钮、还原按钮
      },
      saveAsImage: { show: true, name: '交易状况' } // 保存为图片
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    padding: [5, 10]
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisTick: {
      show: false
    }
  },
  yAxis: {
    axisTick: {
      show: false
    }
  }
}) as EChartsOption

/** 处理交易状况查询 */
const getTradeTrendData = async () => {
  trendLoading.value = true
  // 1. 处理时间: 开始与截止在同一天的, 折线图出不来, 需要延长一天
  const times = shortcutDateRangePicker.value.times
  if (DateUtil.isSameDay(times[0], times[1])) {
    // 前天
    times[0] = DateUtil.formatDate(dayjs(times[0]).subtract(1, 'd'))
  }
  // 查询数据
  await Promise.all([getTradeStatisticsAnalyse(), getTradeStatisticsList()])
  trendLoading.value = false
}

/** 查询交易统计 */
const getTradeStatisticsSummary = async () => {
  summary.value = await TradeStatisticsApi.getTbSummaryPrice()
  jiaoyi.value = await TradeStatisticsApi.getJySum()

  console.log(jiaoyi.value)
}

/** 查询交易状况数据统计 */
const getTradeStatisticsAnalyse = async () => {
  const times = shortcutDateRangePicker.value.times
  trendSummary.value = await TradeStatisticsApi.getTradeStatisticsAnalyse({ times })
}

/** 查询交易状况数据列表 */
const getTradeStatisticsList = async () => {
  // 查询数据
  const times = shortcutDateRangePicker.value.times
  const list = await TradeStatisticsApi.getTradeStatisticsList({ times })
  // 处理数据
  for (let item of list) {
    item.turnoverPrice = fenToYuan(item.turnoverPrice)
    item.orderPayPrice = fenToYuan(item.orderPayPrice)
    item.rechargePrice = fenToYuan(item.rechargePrice)
    item.expensePrice = fenToYuan(item.expensePrice)
  }
  // 更新 Echarts 数据
  if (lineChartOptions.dataset && lineChartOptions.dataset['source']) {
    lineChartOptions.dataset['source'] = list
  }
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const times = shortcutDateRangePicker.value.times
    const data = await TradeStatisticsApi.exportTradeStatisticsExcel({ times })
    download.excel(data, '交易状况.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(async () => {
  await getTradeStatisticsSummary()
})
</script>
<style lang="scss" scoped>
.summary {
  .el-col {
    margin-bottom: 1rem;
  }
}
</style>
