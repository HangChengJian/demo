<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="订单内部编号" prop="no">
        <el-input v-model="formData.no" placeholder="请输入订单内部编号" />
      </el-form-item>
      <el-form-item label="下单链接" prop="downUrl">
        <el-input v-model="formData.downUrl" placeholder="请输入下单链接" />
      </el-form-item>
      <el-form-item label="购买链接" prop="productUrl">
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
      <el-form-item label="商品套餐编号" prop="thaliId">
        <el-input v-model="formData.thaliId" placeholder="请输入商品套餐编号" />
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
      <el-form-item label="地区编号" prop="regionId">
        <el-input v-model="formData.regionId" placeholder="请输入地区编号" />
      </el-form-item>
      <el-form-item label="收件人名称" prop="receiverName">
        <el-input v-model="formData.receiverName" placeholder="请输入收件人名称" />
      </el-form-item>
      <el-form-item label="收件人手机" prop="receiverMobile">
        <el-input v-model="formData.receiverMobile" placeholder="请输入收件人手机" />
      </el-form-item>
      <el-form-item label="收件人邮箱" prop="receiverEmali">
        <el-input v-model="formData.receiverEmali" placeholder="请输入收件人邮箱" />
      </el-form-item>
      <el-form-item label="收件人地址" prop="receiverAddress">
        <el-input v-model="formData.receiverAddress" placeholder="请输入收件人地址" />
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
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { OrderApi, OrderVO } from '@/api/mall/order'

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
  userRemark: undefined
})
const formRules = reactive({
  no: [{ required: true, message: '订单内部编号不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '订单状态(0待审核 1待发货 2已发货 3已签收 4未签收 5无效订单)不能为空', trigger: 'blur' }],
  receiverName: [{ required: true, message: '收件人名称不能为空', trigger: 'blur' }],
  receiverMobile: [{ required: true, message: '收件人手机不能为空', trigger: 'blur' }],
  receiverEmali: [{ required: true, message: '收件人邮箱不能为空', trigger: 'blur' }],
  receiverAddress: [{ required: true, message: '收件人地址不能为空', trigger: 'blur' }],
  receiverLatitude: [{ required: true, message: '收件人经度不能为空', trigger: 'blur' }],
  receiverLongitude: [{ required: true, message: '收件人维度不能为空', trigger: 'blur' }],
  receiverCity: [{ required: true, message: '收件人城市不能为空', trigger: 'blur' }],
  receiverProvince: [{ required: true, message: '收件人省份不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await OrderApi.getOrder(id)
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
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as OrderVO
    if (formType.value === 'create') {
      await OrderApi.createOrder(data)
      message.success(t('common.createSuccess'))
    } else {
      await OrderApi.updateOrder(data)
      message.success(t('common.updateSuccess'))
    }
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
    userRemark: undefined
  }
  formRef.value?.resetFields()
}
</script>