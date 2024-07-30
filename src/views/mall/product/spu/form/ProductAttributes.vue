<!-- 商品发布 - 库存价格 - 属性列表 -->
<template>
  <el-col v-for="(item, index) in attributeList" :key="index">
    <!-- ref="formRef"
      v-loading="formLoading"
      :model="formData"
      :rules="formRules"
      label-width="110px" -->
    <el-form
      ref="formRef"
      label-width="160px"
    >
   <el-row>
      <el-col :span="6">
          <el-form-item label="属性名称(中文)" prop="name" style="font-weight: 600;">
            <el-input v-model="item.name" placeholder="请输入属性名称" @input="updateDate"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="属性名称(英文)" prop="nameUs"  style="font-weight: 600;">
            <el-input v-model="item.nameUs" placeholder="请输入属性名称" @input="updateDate"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="属性名称(阿语)" prop="nameArab"  style="font-weight: 600;">
            <el-input v-model="item.nameArab" placeholder="请输入属性名称" @input="updateDate"/>
          </el-form-item>
        </el-col>
        <el-button color="red" class="ml-10"  plain  @click="handleCloseProperty(index)">删除</el-button>
    </el-row>
    <!-- 规格 -->
    <el-row class="mt-8" v-for="(value, valueIndex) in item.values" :key="value.id">
      <el-col :span="6">
          <el-form-item label="规格名称(中文)" prop="title">
            <el-input v-model="value.name" placeholder="请输入规格名称" @input="updateDate"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="规格名称(英文)" prop="categoryId">
            <el-input v-model="value.nameUs" placeholder="请输入规格名称" @input="updateDate"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="规格名称(阿语)" prop="categoryId">
            <el-input v-model="value.nameArab" placeholder="请输入规格名称" @input="updateDate"/>
          </el-form-item>
        </el-col>
        <el-col :span="4" v-if='index === 0'>
          <div style="display: flex; align-items: center;">
            <el-form-item label="规格封面" prop="title" label-width="110px"  >
            <UploadImg  :showBtnText="false" :showDelete="false" height="50px" width="50px" style="top: -8px;position: absolute;" v-model="value.valuePicUrl" @success='updateDate'/>
          </el-form-item>
          <el-button color="red" class="ml-20"  plain   @click="handleCloseValue(index, valueIndex)">删除</el-button>
          </div>
        </el-col>
        <el-button color="red" class="ml-10"  plain   @click="handleCloseValue(index, valueIndex)" v-else>删除</el-button>

    </el-row>
    <el-button type="success" class="ml-14 mt-4"  plain  @click="addSku(index,item.id)">添加规格</el-button>
  </el-form>
    <!-- <div>
      <el-text class="mx-1">属性名：</el-text>
      <el-tag class="mx-1" :closable="!isDetail" type="success" @close="handleCloseProperty(index)">
        {{ item.name }}
      </el-tag>
    </div>
    <div>
      <el-text class="mx-1">属性值：</el-text>
      <el-tag
        v-for="(value, valueIndex) in item.values"
        :key="value.id"
        class="mx-1"
        :closable="!isDetail"
        @close="handleCloseValue(index, valueIndex)"
      >
        {{ value.name }}
      </el-tag>
      <el-input
        v-show="inputVisible(index)"
        :id="`input${index}`"
        :ref="setInputRef"
        v-model="inputValue"
        class="!w-20"
        size="small"
        @blur="handleInputConfirm(index, item.id)"
        @keyup.enter="handleInputConfirm(index, item.id)"
      />
      <el-button
        v-show="!inputVisible(index)"
        class="button-new-tag ml-1"
        size="small"
        @click="showInput(index)"
      >
        + 添加
      </el-button>
    </div> -->
    <el-divider class="my-10px" />
  </el-col>
    <!-- 商品规格添加 Form 表单 -->
    <ProductPropertyAddForm ref="attributesAddFormRef" :propertyList="attributeList" :skuId="skuId" @success="successFc"/>
</template>

<script lang="ts" setup>
import { ElInput } from 'element-plus'
import * as PropertyApi from '@/api/mall/product/property'
import { PropertyVO } from '@/api/mall/product/property'
import { PropertyAndValues } from '@/views/mall/product/spu/components'
import { propTypes } from '@/utils/propTypes'
import { log } from 'console'
import ProductPropertyAddForm from './ProductPropertyAddForm.vue'

defineOptions({ name: 'ProductAttributes' })
const attributesAddFormRef = ref() // 添加商品规格表单

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗
const inputValue = ref('') // 输入框值
const attributeIndex = ref<number | null>(null) // 获取焦点时记录当前属性项的index
// 输入框显隐控制
const inputVisible = computed(() => (index: number) => {
  if (attributeIndex.value === null) return false
  if (attributeIndex.value === index) return true
})
const inputRef = ref([]) //标签输入框Ref
/** 解决 ref 在 v-for 中的获取问题*/
const setInputRef = (el) => {
  if (el === null || typeof el === 'undefined') return
  // 如果不存在 id 相同的元素才添加
  if (!inputRef.value.some((item) => item.input?.attributes.id === el.input?.attributes.id)) {
    inputRef.value.push(el)
  }
}
const attributeList = ref([]) // 商品属性列表
const props = defineProps({
  propertyList: {
    type: Array,
    default: () => {}
  },
  isDetail: propTypes.bool.def(false) // 是否作为详情组件
})

watch(
  () => props.propertyList,
  (data) => {
    if (!data) return
    attributeList.value = data
  },
  {
    deep: true,
    immediate: true
  }
)

/** 删除属性值*/
const handleCloseValue = (index: number, valueIndex: number) => {
  attributeList.value[index].values?.splice(valueIndex, 1)
  updateDate()
  
}

/** 删除属性*/
const handleCloseProperty = (index: number) => {
  attributeList.value?.splice(index, 1)
  updateDate()

}

/** 显示输入框并获取焦点 */
const showInput = async (index) => {
  attributeIndex.value = index
  inputRef.value[index].focus()
}

/** 输入框失去焦点或点击回车时触发 */
const emit = defineEmits(['success','update']) // 定义 success 事件，用于操作成功后的回调
const handleInputConfirm = async (index: number, propertyId: number) => {
  if (inputValue.value) {
    // 保存属性值
    try {
      const id = await PropertyApi.createPropertyValue({ propertyId, name: inputValue.value })
      attributeList.value[index].values.push({ id, name: inputValue.value })
      message.success(t('common.createSuccess'))
      emit('success', attributeList.value)
    } catch {
      message.error('添加失败，请重试')
    }
  }
  attributeIndex.value = null
  inputValue.value = ''
}
// 添加规格
const skuId = ref({})
const addSku=(index,id)=>{
  // skuId.value = {
  //   index,
  //   id,
  // }
  skuId.value.index = index
  skuId.value.id = id
  
  attributesAddFormRef.value.open()
  // console.log(attributeList.value[index]);
  // attributeList.value[index].values?.push({
  //   id:99,
  //   name:''
  // })
}
const successFc = ()=>{
  emit('success', attributeList.value)
}
const updateDate = ()=>{
  emit('update', attributeList.value)
}
</script>
