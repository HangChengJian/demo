<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入Banner 标题" />
      </el-form-item>
      <el-form-item label="图片" prop="imgArr">
          <UploadImgs v-model="formData.imgArr"  />
      </el-form-item>
      <el-form-item label="有效时间" prop="time">
        <el-date-picker
          v-model="formData.time"
          type="datetimerange"
          value-format="x"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          class="!w-240px"
        />
      </el-form-item>
      <!-- <el-form-item label="开始时间" prop="beginTime">
        <el-date-picker
          v-model="formData.beginTime"
          type="date"
          value-format="x"
          placeholder="选择开始时间"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="formData.endTime"
          type="date"
          value-format="x"
          placeholder="选择结束时间"
        />
      </el-form-item> -->
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { MarketingApi, MarketingVO } from '@/api/product/marketing'
import { log, time } from 'console';
import { formatDate } from '@/utils/formatTime'

/** 营销图片管理 表单 */
defineOptions({ name: 'MarketingForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  imgArr:[],
  time:[],
  id: undefined,
  title: undefined,
  picUrls: undefined,
  beginTime: undefined,
  endTime: undefined
})
const formRules = reactive({
  title: [{ required: true, message: 'Banner 标题不能为空', trigger: 'blur' }],
  // beginTime: [{ required: true, message: '更新时间不能为空', trigger: 'blur' }],
  // endTime: [{ required: true, message: '更新时间不能为空', trigger: 'blur' }],
  time: [{ required: true, message: '请选择有效时间', trigger: 'blur' }],
  imgArr: [{ required: true, message: '请上传图片', trigger: 'blur' }],
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
      formData.value = await MarketingApi.getMarketing(id)
      formData.value.time = [formatDate(formData.value.beginTime),formatDate(formData.value.endTime)]
      if(formData.value.picUrls){
        formData.value.imgArr = formData.value.picUrls.split(',')
      }
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  console.log(formData.value.imgArr);
  
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as MarketingVO
    const obj = {
        id: data.id,
        title: data.title,
        picUrls: [],
        beginTime: '',
        endTime: ''
    }
    obj.picUrls = [data.imgArr.join(',')]
    obj.beginTime = data.time[0]
    obj.endTime = data.time[1]

    if (formType.value === 'create') {
      await MarketingApi.createMarketing(obj)
      message.success(t('common.createSuccess'))
    } else {
      await MarketingApi.updateMarketing(obj)
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
    imgArr:[],
    time:[],
    id: undefined,
    title: undefined,
    picUrls: undefined,
    beginTime: undefined,
    endTime: undefined
  }
  formRef.value?.resetFields()
}
</script>