<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="国家二字代码" prop="countryCode">
        <el-input v-model="formData.countryCode" placeholder="请输入国家二字代码" />
      </el-form-item>
      <el-form-item label="国家英文名称" prop="countryEn">
        <el-input v-model="formData.countryEn" placeholder="请输入国家英文名称" />
      </el-form-item>
      <el-form-item label="国家中文名称" prop="countryZh">
        <el-input v-model="formData.countryZh" placeholder="请输入国家中文名称" />
      </el-form-item>
      <el-form-item label="电话代码" prop="phoneCode">
        <el-input v-model="formData.phoneCode" placeholder="请输入电话代码" />
      </el-form-item>
      <el-form-item label="电话前缀" prop="phonePre">
        <el-input v-model="formData.phonePre" placeholder="请输入电话前缀" />
      </el-form-item>
      <el-form-item label="电话最小长度" prop="phoneMin">
        <el-input v-model="formData.phoneMin" placeholder="请输入电话最小长度" />
      </el-form-item>
      <el-form-item label="电话最大长度" prop="phoneMax">
        <el-input v-model="formData.phoneMax" placeholder="请输入电话最大长度" />
      </el-form-item>
      <el-form-item label="货币" prop="currency">
        <el-input v-model="formData.currency" placeholder="请输入货币" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { CountryConfigApi, CountryConfigVO } from '@/api/trade/countryrconfig'

/** 国家配置 表单 */
defineOptions({ name: 'CountryConfigForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  countryCode: undefined,
  countryEn: undefined,
  countryZh: undefined,
  phoneCode: undefined,
  phonePre: undefined,
  phoneMin: undefined,
  phoneMax: undefined,
  currency: undefined
})
const formRules = reactive({
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
      formData.value = await CountryConfigApi.getCountryConfig(id)
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
    const data = formData.value as unknown as CountryConfigVO
    if (formType.value === 'create') {
      await CountryConfigApi.createCountryConfig(data)
      message.success(t('common.createSuccess'))
    } else {
      await CountryConfigApi.updateCountryConfig(data)
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
    countryCode: undefined,
    countryEn: undefined,
    countryZh: undefined,
    phoneCode: undefined,
    phonePre: undefined,
    phoneMin: undefined,
    phoneMax: undefined,
    currency: undefined
  }
  formRef.value?.resetFields()
}
</script>