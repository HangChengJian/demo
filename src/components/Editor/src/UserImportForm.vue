<template>
  <div class="sc">
    <Dialog v-model="dialogVisible" title="插入图片" width="800" >
    <div class="img-list">
      <el-switch
      @change="changeAll"
        v-model="value1"
        class="mb-2"
        active-text="全选"
        inactive-text="反选"
        v-if="upImgList.length>0"
        style="width: 100%;"
      />
      <div class="img-item pointer" v-for="(item, index) in upImgList" :key="index" @click="toggleCheck(item)">
        <img :src="item||''" alt="" class="up-img" />
        <!-- <img src="../../../assets/imgs/sc.png" alt="" @click.stop="clearImg(index)" class="clear-icon pointer"/> -->
        <div class="tag" v-if="isSelected(item)">
          <div class="tt">{{ isSelected(item) ? getSequence(item) : '' }}</div>
        </div>
      </div>
    </div>
    <div style="display: flex;justify-content: space-around;">
      <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      accept="image/jpeg, image/png, image/gif,image/webp"
      :action="uploadUrl"
      :disabled="formLoading"
      :http-request="httpRequest"
      :limit="99"
      :auto-upload="true"
      :on-error="submitFormError"
      :on-exceed="handleExceed"
      :on-success="submitFormSuccess"
      :before-upload="beforeUpload"
      :multiple="true"
      :show-file-list="false"
    >
    <el-button
          type="primary"
          plain
          :loading="loading"
          class="mt-10px"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 添加图片
        </el-button>
    </el-upload>
    </div>
 
    <template #footer>
      <el-button :disabled="formLoading" type="primary" @click="submitForm">插 入</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
  </div>
  
</template>
<script lang="ts" setup>
import * as UserApi from '@/api/system/user'
import { getAccessToken, getTenantId } from '@/utils/auth'
import download from '@/utils/download'
import type { UploadFile, UploadProps, UploadUserFile } from 'element-plus'
import { createImageViewer } from '@/components/ImageViewer'
import { ref, computed  } from 'vue'

import { useUpload } from '@/components/UploadFile/src/useUpload'
const { uploadUrl, httpRequest } = useUpload()

defineOptions({ name: 'SystemUserImportFormEditor' })

const message = useMessage() // 消息弹窗
const loading = ref(false) // 上传的加载中
const value1 = ref(false)
const dialogVisible = ref(false) // 弹窗的是否展示
const formLoading = ref(false) // 表单的加载中
const uploadRef = ref()
const importUrl =
  import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_URL + '/system/user/import'
const uploadHeaders = ref() // 上传 Header 头
const fileList = ref<UploadUserFile[]>([])
const upImgList = ref([])
const updateSupport = ref(0) // 是否更新已经存在的用户数据
/** 打开弹窗 */
const open = () => {
  dialogVisible.value = true
  value1.value = false
  updateSupport.value = 0
  fileList.value = []
  upImgList.value = []
  selectedItems.value = []
  selectedSequence.value = []
  resetForm()
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const submitForm = async () => {
  if (fileList.value.length == 0) {
    message.error('请添加图片')
    return 
  }
  let addList = selectedSequence.value.sort((a, b) => a - b).map(e=>{
    return selectedItems.value[e-1]
  })
  emits('success',addList)
  dialogVisible.value = false
  console.log('addList',addList,dialogVisible.value)

  // // 提交请求
  // uploadHeaders.value = {
  //   Authorization: 'Bearer ' + getAccessToken(),
  //   'tenant-id': getTenantId()
  // }
  // formLoading.value = true
  // uploadRef.value!.submit()
}
const uploadList = ref<UploadUserFile[]>([])
  const uploadNumber = ref<number>(0)

/** 文件上传成功 */
const emits = defineEmits(['success'])
const submitFormSuccess = (res: any) => {
  message.success('上传成功')
  // 删除自身
  const index = fileList.value.findIndex((item) => item.response?.data === res.data)
  // fileList.value.splice(index, 1)
  uploadList.value.push({ name: res.data, url: res.data })
  console.log('res',fileList.value)

  if (uploadList.value.length == uploadNumber.value) {
    // let result: string[] = uploadList.value.map((file) => file.url!)
    let result: string[] = []
    // fileList.value.push(...uploadList.value)
    fileList.value.forEach(e=>{
      console.log('e',e.response.data)
      if( uploadList.value.find(function (item) {
        return item.url == e.response.data;
      })){
        result.push(e.response.data)
      }
    })
    console.log('uploadList',uploadList.value)
  console.log('result',result)

    uploadList.value = []
    uploadNumber.value = 0
    upImgList.value = upImgList.value.concat(result)
    formLoading.value = false
    loading.value = false
    value1.value = false
    // selectedItems.value = selectedItems.value.concat(upImgList.value.map(e=>e))
    // updateSequence();

  }

return
  if (response.code !== 0) {
    message.error(response.msg)
    formLoading.value = false
    return
  }
  // 拼接提示语
  const data = response.data
  let text = '上传成功数量：' + data.createUsernames.length + ';'
  for (let username of data.createUsernames) {
    text += '< ' + username + ' >'
  }
  text += '更新成功数量：' + data.updateUsernames.length + ';'
  for (const username of data.updateUsernames) {
    text += '< ' + username + ' >'
  }
  text += '更新失败数量：' + Object.keys(data.failureUsernames).length + ';'
  for (const username in data.failureUsernames) {
    text += '< ' + username + ': ' + data.failureUsernames[username] + ' >'
  }
  message.alert(text)
  formLoading.value = false
  dialogVisible.value = false
  // 发送操作成功的事件
  emits('success')
}
/**
 * @description 文件上传之前判断
 * @param rawFile 上传的文件
 * */
 const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log('rawFile',rawFile)
  // const imgSize = rawFile.size / 1024 / 1024 < props.fileSize || true
  // const imgType = props.fileType
  // if (!imgType.includes(rawFile.type as FileTypes))
  //   ElNotification({
  //     title: '温馨提示',
  //     message: '上传图片不符合所需的格式！',
  //     type: 'warning'
  //   })
  // if (!imgSize)
  //   ElNotification({
  //     title: '温馨提示',
  //     message: `上传图片大小不能超过 ${props.fileSize}M！`,
  //     type: 'warning'
  //   })
  uploadNumber.value++
  loading.value = true
  return true
}
/** 上传错误提示 */
const submitFormError = (): void => {
  message.error('上传失败，请您重新上传！')
  formLoading.value = false
  loading.value = false

}

/** 重置表单 */
const resetForm = async (): Promise<void> => {
  // 重置上传状态和文件
  formLoading.value = false
  loading.value = false

  await nextTick()
  uploadRef.value?.clearFiles()
}

/** 文件数超出提示 */
const handleExceed = (): void => {
  message.error('最多只能上传99个图片！')
  loading.value = false

}

/** 商品图预览 */
const imagePreview = (imgUrl: string) => {
  createImageViewer({
    urlList: [imgUrl]
  })
}
const changeAll = (e)=>{
  if(e){
    upImgList.value.forEach(i=>{
      if(!selectedItems.value.includes(i)){
        selectedItems.value.push(i)
        updateSequence();
      }
    })
  }else{
    selectedItems.value = []
    selectedSequence.value = []
  }
}
const clearImg = (index)=>{
upImgList.value.splice(index,1)
}
const  selectedItems= ref([]) // 存储被选中的项
const  selectedSequence = ref([]) // 存储被选中项的序号
    const toggleCheck=(item)=> {
      const index = selectedItems.value.findIndex(i => i === item);
      if (index === -1) {
        selectedItems.value.push(item);
        updateSequence();
      } else {
        selectedItems.value.splice(index, 1);
        updateSequence();
      }
    }
   

    const isSelected=(item)=> {
      return selectedItems.value.some(i => i === item);
    }
    const getSequence=(item)=> {
      return selectedItems.value.findIndex(i => i === item) + 1;
    }
    const updateSequence=()=> {
      selectedSequence.value = selectedItems.value.map((_, index) => index + 1);
      value1.value = selectedSequence.value.length === upImgList.value.length
      
    }

</script>
<style lang="scss">
// :deep(.el-overlay) {
//     z-index: 1000 !important;
//   }
.sc{
  .img-list{
  display: flex;
  flex-wrap: wrap;
  
  .img-item{
    width: 100px;
    height: 100px;
    border-radius: 6px;
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    .tag{
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0,0,0,.4);
      width: 100%;
      height: 100%;
      border-radius: 6px;

     .tt{
      border-radius: 6px;
      width: 20px;
      height: 20px;
      position: absolute;
      top: 0;
      left: 0;
      text-align: center;
      line-height: 20px;
      color: #fff;
      background: #409eff;
      font-size: 12px;
      
     }
    }
    .clear-icon{
      width: 20px;
    height: 20px;
    position: absolute;
    right: -10px;
    top: -8px;
    }
    .up-img{
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
  }
}
}

</style>