<!-- 商品发布 - 库存价格 - 属性列表 -->
<template>
  <!-- attributeList -->
  <el-col v-for="(item, index) in formData.thalis" :key="index">
    <!-- ref="formRef"
      v-loading="formLoading"
      :model="formData"
      :rules="formRules"
      label-width="110px" -->
    <el-form
      ref="formRef"
      label-width="140px"
    >
   <el-row>
      <el-col :span="6">
          <el-form-item label="套餐名称" prop="title" >
            <el-input v-model="item.name" placeholder="请输入套餐名称" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="套餐商品数量" prop="categoryId"  >
            <el-input-number v-model="item.num" :min="1" :max="99999"  />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="是否独立SKU" prop="categoryId"  >
            <el-switch
            v-model="item.isAlone"
            :active-value="1"
            :inactive-value="0"
            @change="handleSkuChange(item)"
          />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="是否为主套餐" prop="categoryId"  >
            <el-switch
            v-model="item.isMaster"
            :active-value="1"
            :inactive-value="0"
            @change="handleStatusChange(item,index)"
          />
          </el-form-item>
        </el-col>
        <el-button color="red" class="ml-10"  plain  @click="handleCloseProperty(index)">删除</el-button>
    </el-row>
    <!-- 国家套餐 -->
    <el-row class="mt-8" v-for="(items,indexs) in item.properties" :key="indexs">
      <el-col :span="2">
          <el-form-item :label="items.name" prop="title" style="font-weight: 600;"/>
        </el-col>
        <el-col :span="6">
          <el-form-item label="套餐名称(英文)" prop="categoryId">
            <el-input v-model="items.nameUs" placeholder="请输入规格名称" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="套餐名称(阿语)" prop="categoryId">
            <el-input v-model="items.nameArab" placeholder="请输入规格名称" />
          </el-form-item>
        </el-col>
        <el-col :span="3" >
          <el-form-item label="套餐原价" prop="categoryId">
            <el-input-number v-model="items.price" :min="1" :max="99999"  />
          </el-form-item>
        </el-col>
        <el-col :span="4" >
          <el-form-item label="套餐折扣价" prop="categoryId">
            <el-input-number v-model="items.discountPrice" :min="1" :max="99999"  />
          </el-form-item>
        </el-col>
    </el-row>

    <!-- <el-button type="success" class="ml-14 mt-4"  plain  @click="addSku(index)">添加规格</el-button> -->
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
</template>

<script lang="ts" setup>
import { ElInput } from 'element-plus'
import * as PropertyApi from '@/api/mall/product/property'
import { PropertyVO } from '@/api/mall/product/property'
import { PropertyAndValues } from '@/views/mall/product/spu/components'
import { propTypes } from '@/utils/propTypes'
import { log } from 'console'
import { title } from 'process'

defineOptions({ name: 'ProductAttributes' })
const formData = ref({}) // 表单数据

const test = [{
  name:'中国',
  num:99,
  isSku:0,
  status:0,
  gj:[{
    type:'沙特阿拉伯语',
    name:'',
    num:99,
  }]
}]
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
const attributeList = ref<PropertyAndValues[]>([]) // 商品属性列表
const props = defineProps({
  propFormData: {
    type: Object ,
    default: () => {}
  },
  isDetail: propTypes.bool.def(false) // 是否作为详情组件
})

watch(
  () => props.propFormData,
  (data) => {
    if (!data) return
    formData.value = data
  },
  {
    deep: true,
    immediate: true
  }
)

/** 删除属性值*/
const handleCloseValue = (index: number, valueIndex: number) => {
  attributeList.value[index].values?.splice(valueIndex, 1)
}

/** 删除属性*/
const handleCloseProperty = (index: number) => {
  formData.value.thalis?.splice(index, 1)
  console.log(attributeList.value);
  
}

/** 显示输入框并获取焦点 */
const showInput = async (index) => {
  attributeIndex.value = index
  inputRef.value[index].focus()
}

/** 输入框失去焦点或点击回车时触发 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
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
const addSku=(index)=>{
  console.log(attributeList.value[index]);
  attributeList.value[index].values?.push({
    id:99,
    name:''
  })
}
/** 主套餐修改 */
const handleStatusChange = async (row: any,index:number) => {
  console.log(row.isMaster);
  if(row.isMaster){
    formData.value.thalis.forEach((item,i)=>{
      if(i !== index){
        item.isMaster = 0
      }
    })
  }
  // let newRow = row.isMaster===0?1:0
  // console.log(newRow);
  // row.isMaster = newRow
 
}
/** sku修改 */
const handleSkuChange = async (row: any) => {
  row = 0?1:0

  // 此时，row 已经变成目标状态了，所以可以直接提交请求和提示
  // let text = row.status === CommonStatusEnum.ENABLE ? '启用' : '停用'

  // try {
  //   await message.confirm('确认要"' + text + '""' + row.name + '"优惠劵吗?')
  //   await CouponTemplateApi.updateCouponTemplateStatus(row.id, row.status)
  //   message.success(text + '成功')
  // } catch {
  //   // 异常时，需要将 row.status 状态重置回之前的
  //   row.status =
  //     row.status === CommonStatusEnum.ENABLE ? CommonStatusEnum.DISABLE : CommonStatusEnum.ENABLE
  // }
}

</script>
