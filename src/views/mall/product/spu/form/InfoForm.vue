<!-- 商品发布 - 基础设置 -->
<template>
  <el-form ref="formRef" :disabled="isDetail" :model="formData" :rules="rules" label-width="140px">
    <el-form-item label="业务员" prop="salesman">
      <el-cascader
        v-model="formData.salesman"
        :options="userList"
        :props="userProps"
        class="w-80"
        clearable
        filterable
        placeholder="请选择业务员"
      />
    </el-form-item>
    <el-form-item label="商品名称(中文)" prop="name">
      <el-input
        v-model="formData.name"
        :autosize="{ minRows: 2, maxRows: 2 }"
        :clearable="true"
        :show-word-limit="true"
        class="w-80!"
        maxlength="64"
        placeholder="请输入商品中文名称"
        type="textarea"
      />
    </el-form-item>
    <el-form-item label="商品名称(英文)" prop="nameUs">
      <el-input
        v-model="formData.nameUs"
        :autosize="{ minRows: 2, maxRows: 2 }"
        :clearable="true"
        :show-word-limit="true"
        class="w-80!"
        maxlength="64"
        placeholder="请输入商品英文名称"
        type="textarea"
      />
    </el-form-item>
    <el-form-item label="商品名称(阿语)" prop="nameArab">
      <el-input
        v-model="formData.nameArab"
        :autosize="{ minRows: 2, maxRows: 2 }"
        :clearable="true"
        :show-word-limit="true"
        class="w-80!"
        maxlength="64"
        placeholder="请输入商品阿语名称"
        type="textarea"
      />
    </el-form-item>
    <el-form-item label="商品副标题(中文)" prop="introduction">
      <el-input
        v-model="formData.introduction"
        :autosize="{ minRows: 2, maxRows: 2 }"
        :clearable="true"
        :show-word-limit="true"
        class="w-80!"
        maxlength="64"
        placeholder="请输入商品中文副标题"
        type="textarea"
      />
    </el-form-item>
    <el-form-item label="商品副标题(英文)" prop="introductionUs">
      <el-input
        v-model="formData.introductionUs"
        :autosize="{ minRows: 2, maxRows: 2 }"
        :clearable="true"
        :show-word-limit="true"
        class="w-80!"
        maxlength="64"
        placeholder="请输入商品英文副标题"
        type="textarea"
      />
    </el-form-item>
    <el-form-item label="商品副标题(阿语)" prop="introductionArab">
      <el-input
        v-model="formData.introductionArab"
        :autosize="{ minRows: 2, maxRows: 2 }"
        :clearable="true"
        :show-word-limit="true"
        class="w-80!"
        maxlength="64"
        placeholder="请输入商品阿语副标题"
        type="textarea"
      />
    </el-form-item>
    <el-form-item label="商品分类" prop="categoryId">
      <el-cascader
        v-model="formData.categoryId"
        :options="categoryList"
        :props="defaultProps"
        class="w-80"
        clearable
        filterable
        placeholder="请选择商品分类"
      />
    </el-form-item>
    <el-form-item label="采购链接" prop="procureUrls">
      <el-tag
    v-for="tag in formData.procureUrls"
    :key="tag"
    class="mx-1"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)"
  >
    {{ tag }}
  </el-tag>
  <el-input
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    class="ml-1 w-20"
    size="small"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  />
  <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput"  type="success">
    + 添加链接
  </el-button>
    </el-form-item>
    <el-form-item label="投放渠道" prop="keyword">
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
    <el-form-item label="销量设置" prop="virtualSalesCount">
      <el-input-number v-model="formData.virtualSalesCount" :min="0" :max="99999"  />
    </el-form-item>
    <el-form-item label="重量(g)" prop="">
      <el-input-number v-model="formData.weight" :min="0" :max="99999"  />
    </el-form-item>
    <el-form-item label="采购价" prop="">
      <el-input-number v-model="formData.procurePrice" :min="0" :max="99999"  />
    </el-form-item>
    <el-form-item label="whatsapp" prop="whatsapp">
      <el-input
        v-model="formData.whatsapp"
        :autosize="{ minRows: 2, maxRows: 2 }"
        :clearable="true"
        :show-word-limit="true"
        class="w-80!"
        maxlength="64"
        placeholder="请输入whatsapp"
        type="textarea"
      />
    </el-form-item>
    <el-form-item label="商品封面图" prop="picUrl">
      <UploadImg v-model="formData.picUrl" :disabled="isDetail" height="80px" />
    </el-form-item>
    <el-form-item label="商品轮播图" prop="sliderPicUrls">
      <UploadImgs v-model="formData.sliderPicUrls" :disabled="isDetail" />
    </el-form-item>
    <el-form-item label="商品活动图" prop="marketingUrl">
      <UploadImg v-model="formData.marketingUrl" :disabled="isDetail" height="80px" />
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { PropType,nextTick, ref  } from 'vue'
import { copyValueToTarget } from '@/utils'
import { propTypes } from '@/utils/propTypes'
import { defaultProps, handleTree } from '@/utils/tree'
import type { Spu } from '@/api/mall/product/spu'
import * as ProductCategoryApi from '@/api/mall/product/category'
import { CategoryVO } from '@/api/mall/product/category'
import * as ProductBrandApi from '@/api/mall/product/brand'
import * as ProductSpuApi from '@/api/mall/product/spu'
import { DICT_TYPE,getIntDictOptions } from '@/utils/dict'

import { BrandVO } from '@/api/mall/product/brand'
import { } from 'vue'
import { ElInput } from 'element-plus'

defineOptions({ name: 'ProductSpuInfoForm' })
const props = defineProps({
  propFormData: {
    type: Object as PropType<Spu>,
    default: () => {}
  },
  isDetail: propTypes.bool.def(false) // 是否作为详情组件
})

const message = useMessage() // 消息弹窗

const formRef = ref() // 表单 Ref
const formData = reactive({
  salesman:'',//业务员
  name: '', // 商品名称中文
  nameUs:'',//商品名称英文
  nameArab:'',//商品名称阿语
  introduction:'',//副标题中文
  introductionUs:'',//副标题英文
  introductionArab:'',//副标题阿语
  virtualSalesCount:0,//虚拟销量
  whatsapp:'',
  categoryId: undefined, // 商品分类
  procureUrls:[],//采购链接
  weight:'',//重量
  procurePrice:0,//采购价
  // keyword: '', // 关键字
  picUrl: '', // 商品封面图
  sliderPicUrls: [], // 商品轮播图
  marketingUrl:'',//活动图
  sort:1,//投放渠道
})
const rules = reactive({
  salesman: [required],
  name: [required],
  nameUs: [required],
  nameArab: [required],
  introduction: [required],
  introductionUs: [required],
  introductionArab: [required],
  categoryId: [required],
  // keyword: [required],
  picUrl: [required],
  whatsapp: [required],
  sliderPicUrls: [required],
})

/** 将传进来的值赋值给 formData */
watch(
  () => props.propFormData,
  (data) => {
    if (!data) {
      return
    }
    copyValueToTarget(formData, data)
  },
  {
    immediate: true
  }
)

/** 表单校验 */
const emit = defineEmits(['update:activeName'])
const validate = async () => {
  if (!formRef.value) return
  try {
    await unref(formRef)?.validate()
    // 校验通过更新数据
    Object.assign(props.propFormData, formData)
  } catch (e) {
    message.error('【基础设置】不完善，请填写相关信息')
    emit('update:activeName', 'info')
    throw e // 目的截断之后的校验
  }
}
defineExpose({ validate })

/** 初始化 */
const brandList = ref<BrandVO[]>([]) // 商品品牌列表
const categoryList = ref<CategoryVO[]>([]) // 商品分类树

const inputValue = ref('')
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (tag: string) => {
  formData.procureUrls.splice(formData.procureUrls.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    formData.procureUrls.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
const userList = ref([])
const userProps = {
  children: 'children',
  label: 'nickname',
  value: 'id',
  isLeaf: 'leaf',
  emitPath: false // 用于 cascader 组件：在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
}
// 获取业务员
ProductSpuApi.getSimple().then(res=>{
  userList.value = res
})
onMounted(async () => {
  // 获得分类树
  const data = await ProductCategoryApi.getCategoryList({})
  categoryList.value = handleTree(data, 'id')
  // 获取商品品牌列表
  brandList.value = await ProductBrandApi.getSimpleBrandList()
})
</script>
