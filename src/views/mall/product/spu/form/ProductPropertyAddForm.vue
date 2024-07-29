<!-- 商品发布 - 库存价格 - 添加属性 -->
<template>
  <Dialog v-model="dialogVisible" :title="'添加商品' + text">
    <el-form
      ref="formRef"
      v-loading="formLoading"
      :model="formData"
      :rules="formRules"
      label-width="120px"
      v-if="skuId"
    >
      <el-form-item :label="text + '名称(中文)'" prop="name">
        <!-- <el-input v-model="formData.name" placeholder="请输入名称" /> -->
            <el-select
                        v-model="formData.name"
                        placeholder="请选择规格"
                        filterable
                        ref="selectName"
                        allow-create
                        default-first-option
                        @blur="nameBlur"
                        @change="nameChange"
                        @visible-change="visibleNameChange"
                    >
                        <el-option v-for="item in skuSelectList" :key="item.id" :label="item.name" :value="item.name"/>
                    </el-select>
      </el-form-item>
      <el-form-item :label="text + '名称(英文)'" prop="nameUs" class="mt-4">
        <el-input v-model="formData.nameUs" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item :label="text + '名称(阿语)'" prop="nameArab" class="mt-4">
        <el-input v-model="formData.nameArab" placeholder="请输入名称" />
      </el-form-item>
    </el-form>
    <div v-else>
      <el-radio-group v-model="formData.addType" style="margin-bottom: 20px">
        <el-radio v-for="dict in addType" :key="dict.value" :label="dict.value">
          {{ dict.label }}
        </el-radio>
      </el-radio-group>
      <el-form
        ref="formRef"
        v-loading="formLoading"
        :model="formData"
        :rules="formRules"
        label-width="120px"
        v-if="!formData.addType"
      >
        <el-form-item :label="text + '名称(中文)'" prop="name">
          <el-input v-model="formData.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item :label="text + '名称(英文)'" prop="nameUs" class="mt-4">
          <el-input v-model="formData.nameUs" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item :label="text + '名称(阿语)'" prop="nameArab" class="mt-4">
          <el-input v-model="formData.nameArab" placeholder="请输入名称" />
        </el-form-item>
      </el-form>
      <el-form
        ref="formRef"
        v-loading="formLoading"
        :model="formData"
        :rules="formRules"
        label-width="120px"
        v-else
      >
      <el-form-item label="属性模版" prop="tapId" class="mt-4">
        <el-cascader
          v-model="formData.tapId"
          :options="tanpList"
          :props="tapProps"
          class="w-1/1"
          clearable
          filterable
          placeholder="请选择属性模版"
        />
        </el-form-item>
      
      </el-form>
    </div>

    <template #footer>
      <el-button :disabled="formLoading" type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>
import * as PropertyApi from '@/api/mall/product/property'

import { log } from 'console'

defineOptions({ name: 'ProductPropertyForm' })
const selectName = ref(null)
const skuChilderId = ref(null)
const test = ref([
    {
        id: 168,
        name: "规格1",
        nameArab: "3",
        nameUs: "2"
    },
    {
        id: 160,
        name: "规格2",
        nameArab: "搜狗9",
        nameUs: "搜狗8"
    },
    {
        id: 159,
        name: "规格3",
        nameArab: "搜狗4",
        nameUs: "搜狗3"
    }
])
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const tapProps = {
  children: 'children',
  label: 'name',
  value: 'id',
  isLeaf: 'leaf',
  emitPath: false // 用于 cascader 组件：在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
}
const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗
const addType = ref([
  {
    value: true,
    label: '属性模版'
  },
  {
    value: false,
    label: '自定义属性'
  }
])
const dialogVisible = ref(false) // 弹窗的是否展示
const formLoading = ref(false) // 表单的加载中
const formData = ref({
  name: '',
  nameUs: '',
  nameArab: '',
  addType: true,
  tapId:'',
})
const formRules = reactive({
  name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
  nameUs: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
  nameArab: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
  tapId: [{ required: true, message: '请选择属性模版', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref
const attributeList = ref([]) // 商品属性列表
const props = defineProps({
  propertyList: {
    type: Array,
    default: () => {}
  },
  skuId: {
    type: Object,
    default: null
  }
})
const text = ref(props.skuId ? '规格' : '属性')
watch(
  () => props.propertyList, // 解决 props 无法直接修改父组件的问题
  (data) => {
    if (!data) return
    attributeList.value = data
  },
  {
    deep: true,
    immediate: true
  }
)
const skuSelectList = ref([])
/** 打开弹窗 */
const open = async () => {
  if(props.skuId){
    const skuList = await PropertyApi.getPropertyValuePage({pageNo:1,pageSize:99,propertyId:props.skuId.id})
    if(skuList.list){
      skuSelectList.value = skuList.list
    }else{
      skuSelectList.value = []
    }
  }
  dialogVisible.value = true
  skuChilderId.value = null
  resetForm()
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

const tanpList = ref([])
/** 查询属性模版 */
const gettap = async () => {
  try {
    const data = await PropertyApi.getPropertyPage({pageNo:1,pageSize:99})
    tanpList.value = data.list
  } finally {
  }
}
const nameBlur = (e) => {
  // console.log('isTapisTapisTapisTapisTap',e.target.value)
  if(!e.target || !e.target.value) return
  let isTap = skuSelectList.value.some(itme => {
    return itme.name === e.target.value
  })
  if(isTap) return
  formData.value.name = e.target.value
  skuChilderId.value = null
  // formData.value.nameUs = ''
  // formData.value.nameArab = ''
}
const nameChange = (e)=>{
  skuSelectList.value.forEach(item => {
    if(item.name === e){
      skuChilderId.value = item.id
      formData.value.nameUs = item.nameUs
      formData.value.nameArab = item.nameArab
    }
  })
}
const visibleNameChange = (e)=>{
  if (!e && selectName.value) {
     selectName.value.blur()
  }
}
/** 提交表单 */
const submitForm = async () => {
  // attributeList.value.length = 1
  // 校验表单
  if (!formRef) return
  const valid = await formRef.value.validate()
  if (!valid) return
  // 提交请求
  formLoading.value = true
  const data = {...formData.value}
  delete data.addType;
  delete data.tapId;
  //添加规格
  if (props.skuId) {
    if(skuChilderId.value){
      attributeList.value[props.skuId.index].values.push({ id:skuChilderId.value, ...data })
      dialogVisible.value = false
      formLoading.value = false
      return
    }
    try {
      const id = await PropertyApi.createPropertyValue({ propertyId: props.skuId.id, ...data })
      attributeList.value[props.skuId.index].values.push({ id, ...data })
      // message.success(t('common.createSuccess'))
      emit('success')
      dialogVisible.value = false
    } finally {
      formLoading.value = false
    }
    return
  }

  // 添加属性
  try {
    // 使用模版
    if(formData.value.addType){
      const skuList = await PropertyApi.getPropertyValuePage({pageNo:1,pageSize:99,propertyId:formData.value.tapId})
      if(skuList.list && skuList.list.length>0){
        let tapData = {}
         tanpList.value.forEach(e=>{
          if(e.id === formData.value.tapId){
            tapData = {
              id:e.id,
              name:e.name,
              nameArab:e.nameArab,
              nameUs:e.nameUs,

            }
          }
        })
        attributeList.value.push({
              id: formData.value.tapId,
              ...tapData,
              values: [],
            //   skuList: skuList.list.map(element => {
            //     return{
            //       id:element.id,
            //       name:element.name,
            //       nameArab:element.nameArab,
            //       nameUs:element.nameUs,
            //     }
            // })
          })
      }
    }else{
      const propertyId = await PropertyApi.createProperty(data)
      attributeList.value.push({
        id: propertyId,
        ...data,
        values: []
      })
    }
    emit('success')
    dialogVisible.value = false
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    name: '',
    nameUs: '',
    nameArab: '',
    addType: true,
    tapId:'',
  }
  formRef.value?.resetFields()
}
gettap()
</script>
