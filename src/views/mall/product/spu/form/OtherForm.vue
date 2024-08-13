<!-- 套餐 -->
<template>
  <el-form ref="formRef" :model="formData" :rules="rules"  :disabled="isDetail">
    <el-form-item >
      <PackageAttributes
        :propFormData="propertyDate"
        :is-detail="isDetail"
      />
      <el-button color="#626aef" plain class="mb-10px mr-15px" @click="addSku">添加套餐</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
import { copyValueToTarget } from '@/utils'
import { propTypes } from '@/utils/propTypes'
import {
  getPropertyList,
  PropertyAndValues,
  RuleConfig,
  SkuList
} from '@/views/mall/product/spu/components/index'
import PackageAttributes from './PackageAttributes.vue'
import type { Spu } from '@/api/mall/product/spu'
import { DICT_TYPE,getIntDictOptions, getStrDictOptions } from '@/utils/dict'
let countryList = getIntDictOptions(DICT_TYPE.COUNTRY_TYPE)

defineOptions({ name: 'ProductSpuSkuForm' })

// sku 相关属性校验规则
const ruleConfig: RuleConfig[] = [
  {
    name: 'stock',
    rule: (arg) => arg >= 0,
    message: '商品库存必须大于等于 1 ！！！'
  },
  {
    name: 'price',
    rule: (arg) => arg >= 0.01,
    message: '商品销售价格必须大于等于 0.01 元！！！'
  },
  {
    name: 'marketPrice',
    rule: (arg) => arg >= 0.01,
    message: '商品市场价格必须大于等于 0.01 元！！！'
  },
  {
    name: 'costPrice',
    rule: (arg) => arg >= 0.01,
    message: '商品成本价格必须大于等于 0.00 元！！！'
  }
]

const message = useMessage() // 消息弹窗

const props = defineProps({
  propFormData: {
    type: Object as PropType<Spu>,
    default: () => {}
  },
  isDetail: propTypes.bool.def(false) // 是否作为详情组件
})
const attributesAddFormRef = ref() // 添加商品属性表单
const formRef = ref() // 表单 Ref
const propertyDate = ref({}) // 
const skuListRef = ref() // 商品属性列表 Ref
const formData = reactive({
  thalis:[],//套餐
})
const rules = reactive({
  specType: [required],
  // subCommissionType: [required]
})

/** 将传进来的值赋值给 formData */
watch(
  () => props.propFormData,
  (data) => {
    if (!data) {
      return
    }
    copyValueToTarget(formData, data)
    
    propertyDate.value = data
  },
  {
    immediate: true
  }
)

/** 表单校验 */
const emit = defineEmits(['update:activeName'])
const validate = async () => {
  if (!formRef) return
  try {
    // 校验 sku
    skuListRef.value.validateSku()
    await unref(formRef).validate()
    // 校验通过更新数据
    Object.assign(props.propFormData, formData)
  } catch (e) {
    message.error('【库存价格】不完善，请填写相关信息')
    emit('update:activeName', 'sku')
    throw e // 目的截断之后的校验
  }
}
defineExpose({ validate })

/** 分销类型 */
const changeSubCommissionType = () => {
  // 默认为零，类型切换后也要重置为零
  for (const item of formData.skus!) {
    item.firstBrokeragePrice = 0
    item.secondBrokeragePrice = 0
  }
}

/** 选择规格 */
const onChangeSpec = () => {
  // 重置商品属性列表
  propertyList.value = []
  // 重置sku列表
  formData.skus = [
    {
      price: 0,
      marketPrice: 0,
      costPrice: 0,
      barCode: '',
      picUrl: '',
      stock: 0,
      weight: 0,
      volume: 0,
      firstBrokeragePrice: 0,
      secondBrokeragePrice: 0
    }
  ]
}

// 添加属性
const addSku=()=>{
  const obj = {
    isMaster:0,
    isAlone:0,
    num:1,
    name:'',
    properties: []
    }
    countryList.forEach(e=>{
      obj.properties.push({
        name:e.label,
        nameUs:'',
        nameArab:'',
        price:0,
        discountPrice:''
      })
    })
  if(!propertyDate.value.thalis){
    propertyDate.value.thalis = [obj]

  }else{
    propertyDate.value.thalis.push(obj)
  }
    
}

</script>
