<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="模板名称" prop="templateName">
        <el-input v-model="formData.templateName" placeholder="请输入模板名称" />
      </el-form-item>
      <el-form-item label="是否置顶" prop="isTop">
        <el-cascader
          v-model="formData.isTop"
          :options="topType"
          :props="topProps"
          class="w-1/1"
          clearable
          placeholder="请选择是否置顶"
        />
      </el-form-item>
      <el-form-item label="模板值" prop="templateValue">
        <div style="display: flex">
          <el-button color="#409eff" plain @click="openTitleuForm">添加表头项</el-button>
          <el-button color="#626aef" plain @click="addDiy">添加自定义表头项</el-button>
        </div>
      </el-form-item>
      <el-table :data="titleList" border class="tabNumWidth" max-height="500" size="small">
        <!-- <el-table-column align="center" label="图片" width="75" >
      <template #default="{ row }">
        <div>{{ row }}</div>
      </template>
    </el-table-column> -->
        <el-table-column align="center" label="表头名称">
          <template #default="{ row }">
            <!-- <UploadImg v-model="row.picUrl" height="50px" width="50px" /> -->
            <div v-if="!row.isDiy">{{ row.name }}</div>
            <div class="center-input" v-else>
              <el-input v-model="row.name" placeholder="请输入表头名称" />
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="名称对应字段">
          <template #default="{ row }">
            <div v-if="!row.isDiy">{{ row.filedName }}</div>
            <div class="center-input" v-else>
              <el-input
                v-model="row.filedName"
                placeholder="请输入名称对应字段"
                style="text-align: center"
              />
            </div>
            <!-- <el-input-number
              v-model="row.count"
              :min="1"
              :precision="0"
              :step="1"
              class="w-100%"
              controls-position="right"
            /> -->
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="105">
          <template #default="scope">
            <el-button link type="danger" @click="delItem(scope.$index)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
  <!-- 表单弹窗：菜单权限 -->
  <TitleForm ref="titleFormRef" @success="addValue" />
</template>
<script setup lang="ts">
import { OrderTemplateApi, OrderTemplateVO } from '@/api/trade/ordertemplate'
import TitleForm from './titleForm.vue'

/** tb订单模板 表单 */
defineOptions({ name: 'OrderTemplateForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  templateName: undefined,
  templateValue: {
      innerList:[],
      diyList:[]
    },
  isTop: undefined
})
const formRules = reactive({
  templateName: [{ required: true, message: '模版名称不能为空', trigger: 'blur' }],
  isTop: [{ required: true, message: '请选择是否置顶', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref
const topProps = {
  children: 'children',
  label: 'nickname',
  value: 'id',
  isLeaf: 'leaf',
  emitPath: false // 用于 cascader 组件：在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
}
const topType = [
  {
    nickname: '置顶',
    id: 1
  },
  {
    nickname: '未置顶',
    id: 0
  }
]
const titleList = ref([])

/** 菜单权限操作 */
const titleFormRef = ref()
const openTitleuForm = async () => {
  titleFormRef.value.open()
}
/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  titleList.value = []
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await OrderTemplateApi.getOrderTemplate(id)
      console.log(formData.value)
      if(formData.value.templateValue.innerList){
        formData.value.templateValue.innerList.forEach(e=>{
          const obj = {
              name:e.name,
              filedName:e.filedName,
            }
            titleList.value.push(obj)
          
        })
      }
      if(formData.value.templateValue.diyList){
        formData.value.templateValue.diyList.forEach(e=>{
          const obj = {
              name:e.name,
              filedName:e.value,
              isDiy:true
            }
            titleList.value.push(obj)
          
        })
      }
      formData.value.templateValue = {
      innerList:[],
      diyList:[]
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
  // 校验表单
  await formRef.value.validate()

  const isInput = titleList.value.some(e=>{
    return (!e.name || !e.filedName)
  })
  if(isInput ){
    message.warning('请输入相关配置')
    return
  }
  if(titleList.value.length === 0){
    message.warning('请添加表头项')
  }

  // 提交请求
  formLoading.value = true

  try {
    let data = formData.value as unknown as OrderTemplateVO
    titleList.value.forEach(e=>{
      const obj = {
          name:e.name,
          filedName:e.filedName
        }
        const obj2 = {
          name:e.name,
          value:e.filedName
        }
      if(!e.isDiy){
        data.templateValue.innerList.push(obj)
      }else{
        data.templateValue.diyList.push(obj2)

      }
    })

    if (formType.value === 'create') {
      await OrderTemplateApi.createOrderTemplate(data)
      message.success(t('common.createSuccess'))
    } else {
      await OrderTemplateApi.updateOrderTemplate(data)
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
    templateName: undefined,
    templateValue: {
      innerList:[],
      diyList:[]
    },
    isTop: undefined
  }
  formRef.value?.resetFields()
}
const addValue = (list) => {
  titleList.value = titleList.value.concat(list)
}
const addDiy = () => {
  titleList.value.push({
    name:'',
    filedName:'',
    isDiy:true
  })

}
const delItem = (index)=>{
  console.log(index)
  if(titleList.value.length === 1){
    message.warning('至少保留一项')
    return
  }
  titleList.value.splice(index,1)
}
</script>
<style lang="scss" scoped>
.center-input {
  ::v-deep(.el-input__inner) {
    text-align: center !important;
  }
}
</style>
