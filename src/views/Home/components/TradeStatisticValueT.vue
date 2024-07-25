<template>
  <div class="flex flex-col gap-2 bg-[var(--el-bg-color-overlay)] p-6 bg1" >
    <div class="flex items-center justify-between text-gray-500">
      <span style="color: #fff;">{{ title }}</span>
      <el-tooltip :content="tooltip" placement="top-start" v-if="tooltip">
        <Icon icon="ep:warning" />
      </el-tooltip>
    </div>
    <div class="bar" >
        <div class="bar_in" :style="{'width':calculatePercentage(value,percent)}"></div>
    </div>
    <div style="width: 100%;display: flex;justify-content: space-between;">
      <span class="lable">有效订单:{{ value }}</span>
      <span class="lable">总订单:{{percent}}</span>

    </div>
    <!-- <div class=" text-3xl" style="align-items: center;display: flex;">
      <span class="lable">客单价:</span>
      <span class="sum">{{ value.toFixed(0) }}</span>

    </div>
    <div class=" text-3xl" style="align-items: center;display: flex;">
      <span class="lable">营业额(元):</span>
      <span class="sum">{{  percent.toFixed(0) }}</span>
    </div> -->
    


  </div>
</template>
<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'
import { toNumber } from 'lodash-es'

/** 交易统计值组件 */
defineOptions({ name: 'TradeStatisticValue' })

defineProps({
  tooltip: propTypes.string.def(''),
  title: propTypes.string.def(''),
  prefix: propTypes.string.def(''),
  value: propTypes.number.def(0),
  type: propTypes.bool.def(false),
  decimals: propTypes.number.def(0),
  percent: propTypes.number.def(0)
})
const calculatePercentage=(numerator, denominator)=> {
  if (denominator === 0 || isNaN(numerator) || isNaN(denominator)) {
    return '0';
  }
  return (numerator / denominator * 100).toFixed(2) + '%';
}
</script>
<style scoped>
.bg1{
  border-radius: 10px;
  position: relative;
  border-radius: 10px;
  background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
  .bg-img{
    position: absolute;
    right: 0;
    width: 150px;
    height: 100x;
    z-index: 1;
  }
}
.lable{
  font-size: 16px;
  padding-right: 10px;
  color: #fff;
}
.sum{
  font-size: 24px;
}
.bar {
            width: 100%;
            height: 15px;
            border-radius: 10px;
            padding: 1px;
            background: #fff;
        }
        .bar_in {
            width: 50%;
            height: 100%;
            background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
            transition: width 1s;
            border-radius:10px;

        }
        /* .bar:hover .bar_in {
            width: 100%;
        } */
</style>
