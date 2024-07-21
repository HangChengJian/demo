<template>
  <Dialog title="导出订单" v-model="dialogVisible" width="600px">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="导出模版" prop="id">
        <el-cascader
          v-model="formData.id"
          :options="props.list"
          :props="userProps"
          class="w-1/1"
          clearable
          filterable
          placeholder="请选择导出模版"
        />
      </el-form-item>
      
    </el-form>
    <template #footer>
      <el-button @click="submitReplyForm" type="primary" :disabled="formLoading">确 定 </el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import * as ProductSpuApi from '@/api/mall/product/spu'

import { DICT_TYPE,getIntDictOptions } from '@/utils/dict'

import { Console, log } from 'console';
import { ElInput } from 'element-plus'

defineOptions({ name: 'ProductComment' })
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const dialogVisible = ref(false) // 弹窗的是否展示
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formData = ref({
  id: undefined,//模版id
})
const formRules = reactive({
  id: [{ required: true, message: '请选择导出模版', trigger: 'blur' }],
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async () => {
  resetForm()
  dialogVisible.value = true

  // formData.value.id = id
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitReplyForm = async () => {
  formData.value.id
  // 校验表单
  const valid = await formRef?.value?.validate()
  if (!valid) return
  emit('success',formData.value.id)
  dialogVisible.value = false
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
  }
  formRef.value?.resetFields()
}
const userProps = {
  children: 'children',
  label: 'templateName',
  value: 'id',
  isLeaf: 'leaf',
  emitPath: false // 用于 cascader 组件：在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
}
</script>
