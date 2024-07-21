<template>
  <Dialog v-model="dialogVisible" title="物流信息" width="400">
    <!-- <el-timeline>
            <el-timeline-item
              v-for="(express, index) in props.list"
              :key="index"
              :timestamp="formatDate(express.time)"
            >
              {{ express.content }}
            </el-timeline-item>
          </el-timeline> -->
        <!-- <el-timeline>
            <el-timeline-item
              v-for="(express, index) in props.list.trackingList"
              :key="index"
              :timestamp="express.time"
            >
              {{ express.location }}
            </el-timeline-item>
          </el-timeline> -->
<el-timeline style="max-width: 600px">
  <!-- <el-timeline style="max-width: 600px">
    <el-timeline-item :timestamp="express.time" placement="top"  v-for="(express, index) in props.list.trackingList" :key="index">
      <el-card>
        <h4>{{ express.location }}</h4>
        <p>{{ express.description }}</p>
      </el-card>
    </el-timeline-item> -->
    <el-timeline-item
      v-for="(activity, index) in props.list.trackingList"
      :key="index"
      :timestamp="(activity.time+'——'+activity.description)"
    >
      {{ activity.description }}
    </el-timeline-item>
  </el-timeline>
   
  <!-- </el-timeline> -->
    <template #footer>
      <el-button :disabled="formLoading" type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>
import * as CustomerApi from '@/api/crm/customer'
import download from '@/utils/download'
import type { UploadUserFile } from 'element-plus'
import * as UserApi from '@/api/system/user'
import { useUserStore } from '@/store/modules/user'
import { OrderApi, OrderVO } from '@/api/mall/order'

defineOptions({ name: 'SystemUserImportForm' })
const props = defineProps({
  list: {
    type: Object,
    default: () => {}
  }
})
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const formLoading = ref(false) // 表单的加载中
const uploadRef = ref()
const fileList = ref<UploadUserFile[]>([]) // 文件列表
const updateSupport = ref(false) // 是否更新已经存在的客户数据
const ownerUserId = ref<undefined | number>() // 负责人编号
const userOptions = ref<UserApi.UserVO[]>([]) // 用户列表

/** 打开弹窗 */
const open = async () => {
  dialogVisible.value = true
  await resetForm()
  // 获得用户列表
  userOptions.value = await UserApi.getSimpleUserList()
  ownerUserId.value = useUserStore().getUser.id
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const submitForm = async () => {
  formLoading.value = false

}

/** 文件上传成功 */
const emits = defineEmits(['success'])
const submitFormSuccess = (response: any) => {
  if (response.code !== 0) {
    message.error(response.msg)
    formLoading.value = false
    return
  }
  // 拼接提示语
  const data = response.data
  let text = '上传成功数量：' + data.createCustomerNames.length + ';'
  for (let customerName of data.createCustomerNames) {
    text += '< ' + customerName + ' >'
  }
  text += '更新成功数量：' + data.updateCustomerNames.length + ';'
  for (const customerName of data.updateCustomerNames) {
    text += '< ' + customerName + ' >'
  }
  text += '更新失败数量：' + Object.keys(data.failureCustomerNames).length + ';'
  for (const customerName in data.failureCustomerNames) {
    text += '< ' + customerName + ': ' + data.failureCustomerNames[customerName] + ' >'
  }
  message.alert(text)
  formLoading.value = false
  dialogVisible.value = false
  // 发送操作成功的事件
  emits('success')
}

/** 上传错误提示 */
const submitFormError = (): void => {
  message.error('上传失败，请您重新上传！')
  formLoading.value = false
}

/** 重置表单 */
const resetForm = async () => {
  // 重置上传状态和文件
  fileList.value = []
  updateSupport.value = false
  ownerUserId.value = undefined
  await nextTick()
  uploadRef.value?.clearFiles()
}

/** 文件数超出提示 */
const handleExceed = (): void => {
  message.error('最多只能上传一个文件！')
}

/** 下载模板操作 */
const importTemplate = async () => {
  const res = await CustomerApi.importCustomerTemplate()
  download.excel(res, '客户导入模版.xls')
}
</script>
