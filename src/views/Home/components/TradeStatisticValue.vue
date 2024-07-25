<template>
  <div class="flex flex-col gap-2 bg-[var(--el-bg-color-overlay)] p-6 bg1" >
    <div class="flex items-center justify-between text-gray-500">
      <span>{{ title }}</span>
      <el-tooltip :content="tooltip" placement="top-start" v-if="tooltip">
        <Icon icon="ep:warning" />
      </el-tooltip>
    </div>
    <div class=" text-3xl" style="align-items: center;display: flex;">
      <span class="lable">客单价:</span>
      <!-- <CountTo :prefix="prefix" :end-val="value" :decimals="decimals" /> -->
      <span class="sum">{{ value.toFixed(0) }}</span>

    </div>
    <div class=" text-3xl" style="align-items: center;display: flex;">
      <span class="lable">营业额(元):</span>
      <!-- <CountTo :prefix="prefix" :end-val="value" :decimals="decimals" /> -->
      <span class="sum">{{  percent.toFixed(0) }}</span>

    </div>
    <!-- <div class="flex flex-row gap-1 text-sm">
      <span class="text-gray-500">环比</span>
      <span :class="toNumber(percent) > 0 ? 'text-red-500' : 'text-green-500'">
        {{ Math.abs(toNumber(percent)) }}%
        <Icon :icon="toNumber(percent) > 0 ? 'ep:caret-top' : 'ep:caret-bottom'" class="!text-sm" />
      </span>
    </div> -->
    <img src="../../../assets/imgs/bg2.png" class="bg-img" v-if="type" />
    <img src="../../../assets/imgs/gb1.png" class="bg-img" v-else />

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

</script>
<style>
.bg1{
  border-radius: 10px;

  position: relative;
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
}
.sum{
  font-size: 24px;
}
</style>
