<template>
  <Dialog title="详情" v-model="dialogVisible">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="订单详情" name="first">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-row>
        <el-col :span="24">
          <div class="title-text"> 基本信息 </div>
        </el-col>

        <el-col :span="12">
          <el-form-item label="订单号" prop="">
            <div class='text-color'>
                  {{ formData.no }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="内部编号" prop="">
            <div class='text-color'>
                  {{ formData.id }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下单时间" prop="">
            <div class='text-color'>
                  {{ formatDate(formData.createTime) }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12"  v-if='formData.cancelTime'>
          <el-form-item label="取消时间" prop="">
            <div class='text-color'>
                  {{ formatDate(formData.cancelTime) }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if='formData.deliveryTime'>
          <el-form-item label="发货时间" prop="" >
            <div class='text-color'>
                  {{ formatDate(formData.deliveryTime) }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if='formData.finishTime'>
          <el-form-item label="签收时间" prop="" >
            <div class='text-color'>
                  {{ formatDate(formData.finishTime) }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单状态" prop="downUrl">
              <el-tag type="primary" v-if='formData.status == 1'>{{ statusName(formData.status)}}</el-tag>
            <el-tag type="success" v-if='formData.status == 2 || formData.status == 3'>{{ statusName(formData.status)}}</el-tag>
            <el-tag type="info" v-if='formData.status == 5'>{{ statusName(formData.status)}}</el-tag>
            <el-tag type="warning" v-if='formData.status == 0'>{{ statusName(formData.status)}}</el-tag>
        
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if='formData.logisticsNo'>
          <el-form-item label="物流单号" prop="" >
            <div class='text-color'>
                  {{ formData.logisticsNo }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if='formData.logisticsNo'>
          <el-form-item label="物流单号" prop="" >
            <div class='text-color'>
                  {{ formData.logisticsNo }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if='formData.logisticsWaybillUrl'>
          <el-form-item label="面单地址" prop="" >
            <div class='text-color'>
                  {{ formData.logisticsWaybillUrl }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <div class="title-text"> 客户信息 </div>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="receiverName">
            <div class='text-color'>
                  {{ formData.receiverName }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="receiverEmali">
            <div class='text-color'>
                  {{ formData.receiverEmali }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="receiverMobile">
            <div class='text-color'>
                  {{ formData.receiverMobile }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备用电话" prop="receiverSpareMobile">
            <div class='text-color'>
                  {{ formData.receiverSpareMobile }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="详细地址" prop="receiverAddress">
            <div class='text-color'>
                  {{ formData.receiverAddress }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="IP地址" prop="ipAddress">
            <div class='text-color'>
                  {{ formData.ipAddress }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="IP详细地址" prop="ipAddressDetail">
            <div class='text-color'>
                  {{ formData.ipAddressDetail }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="省份" prop="receiverProvince">
            <div class='text-color'>
                  {{ formData.receiverProvince }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="城市" prop="receiverCity">
            <div class='text-color'>
                  {{ formData.receiverCity }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经度" prop="receiverLatitude">
            <div class='text-color'>
                  {{ formData.receiverLatitude }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纬度" prop="receiverLongitude">
            <div class='text-color'>
                  {{ formData.receiverLongitude }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="买家备注" prop="userRemark">
            <div class='text-color'>
                  {{ formData.userRemark }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="内部备注" prop="remark">
            <div class='text-color'>
                  {{ formData.remark }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <div class="title-text"> 商品信息 </div>
        </el-col>
        <el-col :span="24">
          <el-form-item label="商品名称" prop="spuName" >
            <div class='text-color'>
                  {{ formData.spuName }}
            </div>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="套餐名称" prop="downUrl">
            <el-input v-model="formData.downUrl" placeholder="请输入下单链接" style="width: 90%" />
          </el-form-item>
        </el-col> -->
        <el-col :span="24">
          <el-table :data="formData.items" border class="tabNumWidth" max-height="500" size="small">
            <!-- <el-table-column align="center" label="图片" width="75" >
      <template #default="{ row }">
        <div>{{ row }}</div>
      </template>
    </el-table-column> -->
            <el-table-column align="center" label="规格" >
              <template #default="{ row }">
                <!-- <UploadImg v-model="row.picUrl" height="50px" width="50px" /> -->
                <div class='text-color'>{{ row.skuName }}</div>
                <!-- <el-cascader
                  v-model="row.skuId"
                  :options="skuList"
                  :props="skuProps"
                  class="w-1/1"
                    filterable
                    placeholder="请选择商品规格"
                /> -->
              </template>
            </el-table-column>
            <el-table-column align="center" label="skuId" width="105">
              <template #default="{ row }">
                <div >{{ row.skuId }}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="数量" >
              <template #default="{ row }">
                {{ row.count }}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-col :span="24">
          <div class="title-text" style="margin-top: 20px;"> 支付金额 </div>
        </el-col>
        <el-col :span="24">
          <div style="display: flex;align-items: baseline;justify-content: end;">
            {{dw}}
          <div style="font-weight: bold;font-size: 30px;color: darkorange;">
              {{ formData.productPrice }}
            </div>
          </div>
         
        </el-col>
    </el-form>
    </el-tab-pane>
    <el-tab-pane label="订单日志" name="second">
      <div v-for="(item, index) in formData.logs" :key="index" class="log-list">
        <div style="font-weight: bold;">{{ item.content }}</div>
        <div style="color: #999;">{{ formatDate(item.createTime)}}</div>
      </div>
   </el-tab-pane>
  </el-tabs>
    <template #footer>
      <el-button @click="dialogVisible = false" type="primary">关 闭</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { OrderApi, OrderVO } from '@/api/mall/order'
import { formatDate } from '@/utils/formatTime'
import { CountryConfigApi } from '@/api/trade/countryrconfig'
import type { TabsPaneContext } from 'element-plus'

/** 跨国订单 表单 */
defineOptions({ name: 'OrderForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  no: undefined,
  downUrl: undefined,
  productUrl: undefined,
  type: undefined,
  origion: undefined,
  status: undefined,
  cancelTime: undefined,
  deliveryTime: undefined,
  finishTime: undefined,
  logisticsNo: undefined,
  logisticsStatus: undefined,
  logisticsWaybillUrl: undefined,
  salesman: undefined,
  productPrice: undefined,
  remark: undefined,
  thaliId: undefined,
  spuId: undefined,
  spuName: undefined,
  skuId: undefined,
  regionId: undefined,
  receiverName: undefined,
  receiverMobile: undefined,
  receiverEmali: undefined,
  receiverAddress: undefined,
  receiverLatitude: undefined,
  receiverLongitude: undefined,
  receiverCity: undefined,
  receiverProvince: undefined,
  ipAddress: undefined,
  ipAddressDetail: undefined,
  userRemark: undefined,
  receiverSpareMobile:undefined,
  createTime:undefined,

})
const formRules = reactive({
  id: [{ required: true, message: '订单id不能为空', trigger: 'blur' }],
  no: [{ required: true, message: '订单内部编号不能为空', trigger: 'blur' }],
  receiverName: [{ required: true, message: '收件人姓名不能为空', trigger: 'blur' }],
  receiverMobile: [{ required: true, message: '收件人号码不能为空', trigger: 'blur' }],
  receiverAddress: [{ required: true, message: '收件地址不能为空', trigger: 'blur' }],
  // no: [{ required: true, message: '订单内部编号不能为空', trigger: 'blur' }],
  // status: [
  //   {
  //     required: true,
  //     message: '订单状态(0待审核 1待发货 2已发货 3已签收 4未签收 5无效订单)不能为空',
  //     trigger: 'blur'
  //   }
  // ],
  // receiverName: [{ required: true, message: '收件人名称不能为空', trigger: 'blur' }],
  // receiverMobile: [{ required: true, message: '收件人手机不能为空', trigger: 'blur' }],
  // receiverEmali: [{ required: true, message: '收件人邮箱不能为空', trigger: 'blur' }],
  // receiverAddress: [{ required: true, message: '收件人地址不能为空', trigger: 'blur' }],
  // receiverLatitude: [{ required: true, message: '收件人经度不能为空', trigger: 'blur' }],
  // receiverLongitude: [{ required: true, message: '收件人维度不能为空', trigger: 'blur' }],
  // receiverCity: [{ required: true, message: '收件人城市不能为空', trigger: 'blur' }],
  // receiverProvince: [{ required: true, message: '收件人省份不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref
const time = ref('')
const skuList = ref([])
const gjList = ref([])
const dw = ref('')
const skuProps = {
  children: 'children',
  label: 'valueName',
  value: 'skuId',
  isLeaf: 'leaf',
  emitPath: false // 用于 cascader 组件：在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
}
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
/** 打开弹窗 */
const open = async (id?: number) => {
  dialogVisible.value = true
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await OrderApi.getOrder(id)
      skuList.value = await OrderApi.getSku(formData.value.spuId)
      gjList.value = await CountryConfigApi.getCountryConfigPage({pageNo:1,pageSize:99})
      formData.value.items = formData.value.items.map(e=>{
        return{
          skuName:e.properties.map(i=>i.valueName).join(','),
          skuId:e.skuId,
          count:e.count,
        }
      })
      
      // time.value = formatDate(formData.value.createTime)
      gjList.value.list.forEach(e=>{
        if(e.id == formData.value.regionId){
          dw.value = e.currency
        }
      })

    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  console.log(formData.value)
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value
    await OrderApi.updateOrder(data)
    message.success(t('common.createSuccess'))
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    no: undefined,
    downUrl: undefined,
    productUrl: undefined,
    type: undefined,
    origion: undefined,
    status: undefined,
    cancelTime: undefined,
    deliveryTime: undefined,
    finishTime: undefined,
    logisticsNo: undefined,
    logisticsStatus: undefined,
    logisticsWaybillUrl: undefined,
    salesman: undefined,
    productPrice: undefined,
    remark: undefined,
    thaliId: undefined,
    spuId: undefined,
    spuName: undefined,
    skuId: undefined,
    regionId: undefined,
    receiverName: undefined,
    receiverMobile: undefined,
    receiverEmali: undefined,
    receiverAddress: undefined,
    receiverLatitude: undefined,
    receiverLongitude: undefined,
    receiverCity: undefined,
    receiverProvince: undefined,
    ipAddress: undefined,
    ipAddressDetail: undefined,
    userRemark: undefined,
    receiverSpareMobile:undefined,
    createTime:undefined,

  }
  formRef.value?.resetFields()
}
const tabsData = ref([
  {
    name: '全部',
    type: 99,
    count: 0
  },
  {
    name: '待审核',
    type: 0,
    count: 0
  },
  {
    name: '待发货',
    type: 1,
    count: 0
  },
  {
    name: '已发货',
    type: 2,
    count: 0
  },
  {
    name: '已签收',
    type: 3,
    count: 0
  },
  {
    name: '未签收',
    type: 4,
    count: 0
  },
  {
    name: '无效订单',
    type: 5,
    count: 0
  },
])
const statusName = (status)=>{
  let name = tabsData.value.filter(e => e.type == status )[0].name
  return name
}
const delItem = (index)=>{
  console.log(index)
  if(formData.value.items.length === 1){
    message.warning('至少保留一项规格')
    return
  }
  formData.value.items.splice(index,1)
}
const addSku = ()=>{
  formData.value.items.push({
    skuId:skuList.value[0].skuId,
    count:1,
  })
}
</script>
<style lang="scss" scoped>
.title-text {
  font-weight: bold;
  padding-bottom: 20px;
}
.text-color{
  color: rgb(64, 158, 255);
}
.log-list{
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  &:last-child{
    border-bottom: none;
  }
}
</style>
