<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
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
          <el-form-item label="内部编号" prop="id">
            <el-input v-model="formData.id" placeholder="" style="width: 90%" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单号" prop="no">
            <el-input v-model="formData.no" placeholder="" style="width: 90%" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下单时间" prop="time">
            <el-input v-model="time" placeholder="" style="width: 90%" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if='formData.deliveryTime'>
          <el-form-item label="发货时间" prop="" >
                      <el-input v-model="time3" placeholder="" style="width: 90%" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12"  v-if='formData.cancelTime'>
          <el-form-item label="取消时间" prop="">
                       <el-input v-model="time2" placeholder="" style="width: 90%" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if='formData.finishTime'>
          <el-form-item label="签收时间" prop="" >
                       <el-input v-model="time4" placeholder="" style="width: 90%" disabled />
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
        <el-col :span="24">
          <div class="title-text"> 客户信息 </div>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="receiverName">
            <el-input v-model="formData.receiverName" placeholder="请输入收件人姓名" style="width: 90%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="receiverEmali">
            <el-input v-model="formData.receiverEmali" placeholder="请输入邮箱" style="width: 90%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="receiverMobile">
            <el-input v-model="formData.receiverMobile" placeholder="请输入联系电话" style="width: 90%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备用电话" prop="receiverSpareMobile">
            <el-input v-model="formData.receiverSpareMobile" placeholder="请输入备用电话" style="width: 90%" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="详细地址" prop="receiverAddress">
            <el-input
              v-model="formData.receiverAddress"
              placeholder="请输入详细地址"
              style="width: 95.4%"
            />
          </el-form-item>
        </el-col>
        
        <el-col :span="12">
          <el-form-item label="IP地址" prop="ipAddress" >
            <el-input v-model="formData.ipAddress" placeholder="" style="width: 90%" disabled/>
          </el-form-item>
        </el-col>
       <el-col :span="12">
          <el-form-item label="IP定位地址" prop="ipAddressDetail">
            <el-input v-model="formData.ipAddressDetail" placeholder="" style="width: 90%" disabled/>
          </el-form-item>
        </el-col>
      
        <el-col :span="12">
          <el-form-item label="省份" prop="receiverProvince">
            <el-input v-model="formData.receiverProvince" placeholder="请输入省份" style="width: 90%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="城市" prop="receiverCity">
            <el-input v-model="formData.receiverCity" placeholder="请输入城市" style="width: 90%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经度" prop="receiverLatitude">
            <el-input v-model="formData.receiverLatitude" placeholder="请输入收件人经度" style="width: 90%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纬度" prop="receiverLongitude">
            <el-input v-model="formData.receiverLongitude" placeholder="请输入收件人纬度" style="width: 90%" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="买家备注" prop="userRemark">
            <el-input v-model="formData.userRemark" placeholder="请输入买家备注" style="width: 90%" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="内部备注" prop="remark">
            <el-input v-model="formData.remark" placeholder="请输入内部备注" style="width: 90%" />
          </el-form-item>
        </el-col>
       
        <el-col :span="24">
          <div class="title-text"> 商品信息 </div>
        </el-col>
        <el-col :span="24">
          <el-form-item label="商品名称" prop="spuName" >
            <el-input v-model="formData.spuName" placeholder="请输入下单链接" style="width: 95.2%" disabled />
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
                <!-- <div>{{ row.skuName }}</div> -->
                <el-cascader
                  v-model="row.skuId"
                  :options="skuList"
                  :props="skuProps"
                  class="w-1/1"
                    filterable
                    placeholder="请选择商品规格"
                />
              </template>
            </el-table-column>
            <el-table-column align="center" label="skuId" width="105">
              <template #default="{ row }">
                <div>{{ row.skuId }}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="数量" >
              <template #default="{ row }">
                <el-input-number
                  v-model="row.count"
                  :min="1"
                  :precision="0"
                  :step="1"
                  class="w-100%"
                  controls-position="right"
                />
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="105">
              <template #default="scope">
                <el-button link type="danger" @click='delItem(scope.$index)'> 删除 </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24">
          <el-button color="#626aef" plain style="margin-top: 20px;" @click='addSku'>添加规格</el-button>
        </el-col>
        <!-- 
        <el-col :span="12">
          <el-form-item label="套餐商品金额" prop="productPrice">
            <el-input
              v-model="formData.productPrice"
              placeholder="请输入套餐商品金额"
              style="width: 90%"
            />
          </el-form-item>
        </el-col>

        <el-form-item label="商家备注" prop="productPrice">
          <el-input v-model="formData.productPrice" placeholder="请输入商家备注" />
        </el-form-item>
        <el-form-item label="商家备注" prop="productPrice">
          <el-input v-model="formData.productPrice" placeholder="请输入商家备注" />
        </el-form-item>
        <el-form-item label="商品套餐编号" prop="thaliId">
          <el-input v-model="formData.thaliId" placeholder="请输入商品套餐编号" />
        </el-form-item>
        <el-form-item label="地区" prop="region">
          <el-input v-model="formData.region" placeholder="请输入地区" />
        </el-form-item>
        <el-form-item label="地区编号" prop="regionId">
          <el-input v-model="formData.regionId" placeholder="请输入地区编号" />
        </el-form-item>

        <el-form-item label="收件人名称" prop="receiverName">
          <el-input v-model="formData.receiverName" placeholder="请输入收件人名称" />
        </el-form-item>
        <el-form-item label="收件人手机" prop="receiverMobile">
          <el-input v-model="formData.receiverMobile" placeholder="请输入收件人手机" />
        </el-form-item>
        <el-form-item label="收件人备用手机" prop="receiverSpareMobile">
          <el-input v-model="formData.receiverSpareMobile" placeholder="请输入收件人备用手机" />
        </el-form-item>
        <el-form-item label="收件人邮箱" prop="receiverEmali">
          <el-input v-model="formData.receiverEmali" placeholder="请输入收件人邮箱" />
        </el-form-item>
        <el-form-item label="收件人地址" prop="receiverAddress">
          <el-input v-model="formData.receiverAddress" placeholder="请输入收件人地址" />
        </el-form-item> -->

        <!-- <el-form-item label="购买链接" prop="productUrl">
        <el-input v-model="formData.productUrl" placeholder="请输入购买链接" />
      </el-form-item>
      <el-form-item label="订单类型" prop="type">
        <el-select v-model="formData.type" placeholder="请选择订单类型">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="订单来源终端" prop="origion">
        <el-input v-model="formData.origion" placeholder="请输入订单来源终端" />
      </el-form-item>
      <el-form-item label="订单状态(0待审核 1待发货 2已发货 3已签收 4未签收 5无效订单)" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="订单审核时间" prop="cancelTime">
        <el-date-picker
          v-model="formData.cancelTime"
          type="date"
          value-format="x"
          placeholder="选择订单审核时间"
        />
      </el-form-item>
      <el-form-item label="订单发货时间" prop="deliveryTime">
        <el-date-picker
          v-model="formData.deliveryTime"
          type="date"
          value-format="x"
          placeholder="选择订单发货时间"
        />
      </el-form-item>
      <el-form-item label="订单签收时间" prop="finishTime">
        <el-date-picker
          v-model="formData.finishTime"
          type="date"
          value-format="x"
          placeholder="选择订单签收时间"
        />
      </el-form-item>
      <el-form-item label="物流公司单号" prop="logisticsNo">
        <el-input v-model="formData.logisticsNo" placeholder="请输入物流公司单号" />
      </el-form-item>
      <el-form-item label="物流状态" prop="logisticsStatus">
        <el-radio-group v-model="formData.logisticsStatus">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="物流公司面单下载地址" prop="logisticsWaybillUrl">
        <el-input v-model="formData.logisticsWaybillUrl" placeholder="请输入物流公司面单下载地址" />
      </el-form-item>
      <el-form-item label="业务员" prop="salesman">
        <el-input v-model="formData.salesman" placeholder="请输入业务员" />
      </el-form-item>
      <el-form-item label="商品金额" prop="productPrice">
        <el-input v-model="formData.productPrice" placeholder="请输入商品金额" />
      </el-form-item>
      <el-form-item label="商家备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入商家备注" />
      </el-form-item>
    
      <el-form-item label="商品 SPU 编号" prop="spuId">
        <el-input v-model="formData.spuId" placeholder="请输入商品 SPU 编号" />
      </el-form-item>
      <el-form-item label="商品 SPU 名称" prop="spuName">
        <el-input v-model="formData.spuName" placeholder="请输入商品 SPU 名称" />
      </el-form-item>
      <el-form-item label="商品 SKU 编号" prop="skuId">
        <el-input v-model="formData.skuId" placeholder="请输入商品 SKU 编号" />
      </el-form-item>
    
      <el-form-item label="收件人经度" prop="receiverLatitude">
        <el-input v-model="formData.receiverLatitude" placeholder="请输入收件人经度" />
      </el-form-item>
      <el-form-item label="收件人维度" prop="receiverLongitude">
        <el-input v-model="formData.receiverLongitude" placeholder="请输入收件人维度" />
      </el-form-item>
      <el-form-item label="收件人城市" prop="receiverCity">
        <el-input v-model="formData.receiverCity" placeholder="请输入收件人城市" />
      </el-form-item>
      <el-form-item label="收件人省份" prop="receiverProvince">
        <el-input v-model="formData.receiverProvince" placeholder="请输入收件人省份" />
      </el-form-item>
      <el-form-item label="ip地址" prop="ipAddress">
        <el-input v-model="formData.ipAddress" placeholder="请输入ip地址" />
      </el-form-item>
      <el-form-item label="ip地址详细信息" prop="ipAddressDetail">
        <el-input v-model="formData.ipAddressDetail" placeholder="请输入ip地址详细信息" />
      </el-form-item>
      <el-form-item label="用户备注" prop="userRemark">
        <el-input v-model="formData.userRemark" placeholder="请输入用户备注" />
      </el-form-item> -->
      </el-row>
      <el-col :span="24">
          <div class="title-text" style="margin-top: 20px;"> 支付金额 </div>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="dw" prop="productPrice">
            <el-input-number
                  v-model="formData.productPrice"
                  :min="1"
                  :precision="0"
                  :step="1"
                  class="w-100%"
                  controls-position="right"
                />
          </el-form-item>
        </el-col>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { OrderApi, OrderVO } from '@/api/mall/order'
import { formatDate } from '@/utils/formatTime'
import { CountryConfigApi } from '@/api/trade/countryrconfig'
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
const time2 = ref('')
const time3 = ref('')
const time4 = ref('')

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
/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = type?'编辑':'详情'
  formType.value = type
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
          skuId:e.skuId,
          count:e.count,
        }
      })
      
      time.value = formatDate(formData.value.createTime)
      time2.value = formatDate(formData.value.cancelTime)
      time3.value = formatDate(formData.value.deliveryTime)
      time4.value = formatDate(formData.value.finishTime)

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
  let obj = {...formData.value}

  delete obj.cancelTime;
  delete obj.createTime;
  delete obj.deliveryTime;
  delete obj.finishTime;
  delete obj.logisticsNo;
  delete obj.logisticsWaybillUrl;
  delete obj.logs;
  delete obj.no;
  delete obj.origion;
  delete obj.productUrl;
  delete obj.productUrl;
  delete obj.salesman;
  delete obj.skuId;
  delete obj.spuName;
  delete obj.status;
  delete obj.type;
  delete obj.updateTime;
  delete obj.logisticsStatus;
  // 提交请求
  formLoading.value = true
  try {
    await OrderApi.updateOrder(obj)
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
</style>
