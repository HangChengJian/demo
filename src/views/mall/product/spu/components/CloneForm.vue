<template>
  <Dialog title="复制商品" v-model="dialogVisible" width="600px">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="业务员" prop="salesman">
        <!-- <el-input type="textarea" v-model="formData.业务员" /> -->
        <el-cascader
          v-model="formData.salesman"
          :options="props.list"
          :props="userProps"
          class="w-1/1"
          clearable
          filterable
          placeholder="请选择业务员"
        />
      </el-form-item>
      <el-form-item label="投放渠道" prop="sort">
      <el-radio-group v-model="formData.sort">
          <el-radio
            v-for="dict in getIntDictOptions(DICT_TYPE.CHANNEL_TYPE)"
            :key="dict.value"
            :label="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
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
  id: undefined,//商品id
  salesman: undefined,//业务员
  sort:undefined,//投放渠道
})
const formRules = reactive({
  salesman: [{ required: true, message: '请选择业务员', trigger: 'blur' }],
  sort: [{ required: true, message: '请选投放渠道', trigger: 'blur' }],
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (id?: any) => {
  resetForm()
  formData.value.id = id
  dialogVisible.value = true
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitReplyForm = async () => {
  // 校验表单
  const valid = await formRef?.value?.validate()
  if (!valid) return
  // 提交请求
  formLoading.value = true
  try {
    await ProductSpuApi.cloneGoods(formData.value)
    message.success('复制成功')
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
    业务员: undefined
  }
  formRef.value?.resetFields()
}
const userProps = {
  children: 'children',
  label: 'nickname',
  value: 'id',
  isLeaf: 'leaf',
  emitPath: false // 用于 cascader 组件：在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
}
</script>
