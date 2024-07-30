<template>
  <ContentWrap v-loading="formLoading">
    <!-- <div  class="test">11</div> -->
    <el-tabs v-model="activeName" v-if="true">
      <el-tab-pane label="基础设置" name="info">
        <div
          style="height: calc(100vh - 250px);overflow-y: scroll;">
          <InfoForm
          ref="infoRef"
          v-model:activeName="activeName"
          :is-detail="isDetail"
          :propFormData="formData"
        />
        </div>
       
      </el-tab-pane>
    
      <!-- <el-tab-pane label="物流设置" name="delivery">
        <DeliveryForm
          ref="deliveryRef"
          v-model:activeName="activeName"
          :is-detail="isDetail"
          :propFormData="formData"
        />
      </el-tab-pane> -->
      <el-tab-pane label="商品详情" name="description">
        <DescriptionForm
          ref="descriptionRef"
          v-model:activeName="activeName"
          :is-detail="isDetail"
          :propFormData="formData"
        />
      </el-tab-pane>
      <el-tab-pane label="属性规格" name="sku">
        <div
        style="max-height: calc(100vh - 250px);overflow-y: scroll;">
        <SkuForm
          ref="skuRef"
          v-model:activeName="activeName"
          :is-detail="isDetail"
          :propFormData="formData"
        />
      </div>

      </el-tab-pane>
      <el-tab-pane label="套餐设置" name="other">
        <div
          style="max-height: calc(100vh - 250px);overflow-y: scroll;">
        <OtherForm
          ref="otherRef"
          v-model:activeName="activeName"
          :is-detail="isDetail"
          :propFormData="formData"
        />
      </div>
      </el-tab-pane>
    </el-tabs>
    <el-form>
      <el-form-item style="float: right">
        <el-button v-if="!isDetail" :loading="formLoading" type="primary" @click="submitForm">
          保存
        </el-button>
        <el-button @click="close">返回</el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>
</template>
<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import { useTagsViewStore } from '@/store/modules/tagsView'
import * as ProductSpuApi from '@/api/mall/product/spu'
import InfoForm from './InfoForm.vue'
import DescriptionForm from './DescriptionForm.vue'
import OtherForm from './OtherForm.vue'
import SkuForm from './SkuForm.vue'
import DeliveryForm from './DeliveryForm.vue'
import { convertToInteger, floatToFixed2, formatToFraction } from '@/utils'
import { log } from 'console'

defineOptions({ name: 'ProductSpuAdd' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗
const { push, currentRoute } = useRouter() // 路由
const { params, name } = useRoute() // 查询参数
const { delView } = useTagsViewStore() // 视图操作

const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const activeName = ref('info') // Tag 激活的窗口
const isDetail = ref(false) // 是否查看详情
const infoRef = ref() // 商品信息 Ref
const skuRef = ref() // 商品规格 Ref
const deliveryRef = ref() // 物流设置 Ref
const descriptionRef = ref() // 商品详情 Ref
const otherRef = ref() // 其他设置 Ref
// SPU 表单数据
const formData = ref({
  salesman:'',//业务员
  name: '', // 商品名称中文
  nameUs:'',//商品名称英文
  nameArab:'',//商品名称阿语
  introduction:'',//副标题中文
  introductionUs:'',//副标题英文
  introductionArab:'',//副标题阿语
  virtualSalesCount:0,//虚拟销量
  categoryId: undefined, // 商品分类
  procureUrls:[],//采购链接
  // keyword: '', // 关键字
  picUrl: '', // 商品封面图
  sliderPicUrls: [], // 商品轮播图
  whatsapp:'',
  marketingUrl:'',//活动图
  weight:'',//重量
  procurePrice:0,//采购价
  // deliveryTypes: [], // 配送方式数组
  // deliveryTemplateId: undefined, // 运费模版
  // brandId: undefined, // 商品品牌
  specType: true, // 商品规格
  // subCommissionType: false, // 分销类型
  skus: [
    {
      price: 0, // 商品价格
      marketPrice: 0, // 市场价
      costPrice: 0, // 成本价
      barCode: '', // 商品条码
      picUrl: '', // 图片地址
      stock: 0, // 库存
      weight: 0, // 商品重量
      volume: 0, // 商品体积
      firstBrokeragePrice: 0, // 一级分销的佣金
      secondBrokeragePrice: 0 // 二级分销的佣金
    }
  ],
  description: '', // 商品详情
  thalis:[],//套餐
  sort: 1, // 投放渠道
  // giveIntegral: 0, // 赠送积分
})

/** 获得详情 */
const getDetail = async () => {
  if ('ProductSpuDetail' === name) {
    isDetail.value = true
  }
  const id = params.id as unknown as number
  if (id) {
    // formLoading.value = true
    try {
      const res = await ProductSpuApi.getSpu(id)
      res.salesman =  parseInt(res.salesman)
        res.thalis?.forEach((item) => {
          item.id = ''
          item.properties.forEach(e=>{
            e.thaliId = ''
          })
      })
      // res.skus?.forEach((item) => {
      //   if (isDetail.value) {
      //     item.price = floatToFixed2(item.price)
      //     item.marketPrice = floatToFixed2(item.marketPrice)
      //     item.costPrice = floatToFixed2(item.costPrice)
      //     item.firstBrokeragePrice = floatToFixed2(item.firstBrokeragePrice)
      //     item.secondBrokeragePrice = floatToFixed2(item.secondBrokeragePrice)
      //   } else {
      //     // 回显价格分转元
      //     item.price = formatToFraction(item.price)
      //     item.marketPrice = formatToFraction(item.marketPrice)
      //     item.costPrice = formatToFraction(item.costPrice)
      //     item.firstBrokeragePrice = formatToFraction(item.firstBrokeragePrice)
      //     item.secondBrokeragePrice = formatToFraction(item.secondBrokeragePrice)
      //   }
      // })
      formLoading.value = false

      formData.value = res
      
    } finally {
      formLoading.value = false
    }
  }
}

/** 提交按钮 */
const submitForm = async () => {
  // 提交请求
  formLoading.value = true
  try {
    // 校验各表单
    // await unref(infoRef)?.validate()
    // await unref(descriptionRef)?.validate()
  //   await unref(skuRef)?.validate()
    
  // console.log(formData.value);

    await unref(infoRef)?.validate()
    await unref(skuRef)?.validate()
    await unref(descriptionRef)?.validate()
    console.log(formData.value);


    // await unref(deliveryRef)?.validate()
    // await unref(otherRef)?.validate()
    // 深拷贝一份, 这样最终 server 端不满足，不需要影响原始数据
    const deepCopyFormData = cloneDeep(unref(formData.value)) as ProductSpuApi.Spu
    deepCopyFormData.skus!.forEach((item) => {
      // 给sku name赋值
      item.name = deepCopyFormData.name
      // sku相关价格元转分
      // item.price = convertToInteger(item.price)
      // item.marketPrice = convertToInteger(item.marketPrice)
      // item.costPrice = convertToInteger(item.costPrice)
      // item.firstBrokeragePrice = convertToInteger(item.firstBrokeragePrice)
      // item.secondBrokeragePrice = convertToInteger(item.secondBrokeragePrice)
    })
    // 处理轮播图列表
    const newSliderPicUrls: any[] = []
    deepCopyFormData.sliderPicUrls!.forEach((item: any) => {
      // 如果是前端选的图
      typeof item === 'object' ? newSliderPicUrls.push(item.url) : newSliderPicUrls.push(item)
    })
    deepCopyFormData.sliderPicUrls = newSliderPicUrls
    // 校验都通过后提交表单
    const data = deepCopyFormData as ProductSpuApi.Spu
    const id = params.id as unknown as number
    if (!id) {
      await ProductSpuApi.createSpu(data)
      message.success(t('common.createSuccess'))
    } else {
      await ProductSpuApi.updateSpu(data)
      message.success(t('common.updateSuccess'))
    }
    close()
  } finally {
    formLoading.value = false
  }
}

/** 关闭按钮 */
const close = () => {
  delView(unref(currentRoute))
  push({ name: 'ProductSpu' })
}



/** 初始化 */
onMounted(async () => {
  await getDetail()
  console.log(window.screen.height)
})
</script>
<style>
.test{
  max-height:100% !important
}
</style>