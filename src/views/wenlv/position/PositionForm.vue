<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="点位名称" prop="title">
        <el-input v-model="formData.title" placeholder="请输入点位名称" />
      </el-form-item>
      <el-form-item label="是否推荐 0不推荐 1推荐" prop="isTop">
        <el-radio-group v-model="formData.isTop">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="1是正常,0是下架" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="宽度" prop="width">
        <el-input v-model="formData.width" placeholder="请输入宽度" />
      </el-form-item>
      <el-form-item label="高度" prop="height">
        <el-input v-model="formData.height" placeholder="请输入高度" />
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input v-model="formData.latitude" placeholder="请输入纬度" />
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input v-model="formData.longitude" placeholder="请输入经度" />
      </el-form-item>
      <el-form-item label="从属机构的id" prop="agencyId">
        <el-input v-model="formData.agencyId" placeholder="请输入从属机构的id" />
      </el-form-item>
      <el-form-item label="点位的类型id" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio
            v-for="dict in getIntDictOptions(DICT_TYPE.POSITION_TYPE)"
            :key="dict.value"
            :label="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图标对应的附件id" prop="icon">
        <el-input v-model="formData.icon" placeholder="请输入图标对应的附件id" />
      </el-form-item>
      <el-form-item label="封面对应的附件id" prop="cover">
        <el-input v-model="formData.cover" placeholder="请输入封面对应的附件id" />
      </el-form-item>
      <el-form-item label="文字描述" prop="description">
        <Editor v-model="formData.description" height="150px" />
      </el-form-item>
      <el-form-item label="子菜单名称" prop="menuName">
        <el-input v-model="formData.menuName" placeholder="请输入子菜单名称" />
      </el-form-item>
      <el-form-item label="是否打卡点位0否， 1是" prop="signIn">
        <el-input v-model="formData.signIn" placeholder="请输入是否打卡点位0否， 1是" />
      </el-form-item>
      <el-form-item label="打卡赠送的积分" prop="getPoints">
        <el-input v-model="formData.getPoints" type="textarea" placeholder="请输入打卡赠送的积分" />
      </el-form-item>
      <el-form-item label="身高限制" prop="sHeight">
        <el-input v-model="formData.sHeight" placeholder="请输入身高限制" />
      </el-form-item>
      <el-form-item label="年龄限制" prop="sAge">
        <el-input v-model="formData.sAge" placeholder="请输入年龄限制" />
      </el-form-item>
      <el-form-item label="演出类别" prop="sPerformanceCategory">
        <el-input v-model="formData.sPerformanceCategory" placeholder="请输入演出类别" />
      </el-form-item>
      <el-form-item label="价格区间" prop="sPrice">
        <el-input v-model="formData.sPrice" placeholder="请输入价格区间" />
      </el-form-item>
      <el-form-item label="菜系" prop="sCuisineKind">
        <el-input v-model="formData.sCuisineKind" placeholder="请输入菜系" />
      </el-form-item>
      <el-form-item label="惊险种类" prop="sThrillLevel">
        <el-input v-model="formData.sThrillLevel" placeholder="请输入惊险种类" />
      </el-form-item>
      <el-form-item label="等待时间" prop="sWaitTime">
        <el-date-picker
          v-model="formData.sWaitTime"
          type="date"
          value-format="x"
          placeholder="选择等待时间"
        />
      </el-form-item>
      <el-form-item label="开放时间" prop="sOpenTime">
        <el-date-picker
          v-model="formData.sOpenTime"
          type="date"
          value-format="x"
          placeholder="选择开放时间"
        />
      </el-form-item>
      <el-form-item label="街道或区域" prop="sLocation">
        <el-input v-model="formData.sLocation" placeholder="请输入街道或区域" />
      </el-form-item>
      <el-form-item label="注意事项" prop="sMatters">
        <el-input v-model="formData.sMatters" placeholder="请输入注意事项" />
      </el-form-item>
      <el-form-item label="招牌菜" prop="signboardCuisine">
        <el-input v-model="formData.signboardCuisine" placeholder="请输入招牌菜" />
      </el-form-item>
      <el-form-item label="出售商品" prop="saleGoods">
        <el-input v-model="formData.saleGoods" placeholder="请输入出售商品" />
      </el-form-item>
      <el-form-item label="游玩时间" prop="playTime">
        <el-date-picker
          v-model="formData.playTime"
          type="date"
          value-format="x"
          placeholder="选择游玩时间"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import { PositionApi, PositionVO } from '@/api/wenlv/position'

/** 点位 表单 */
defineOptions({ name: 'PositionForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  title: undefined,
  isTop: undefined,
  status: undefined,
  width: undefined,
  height: undefined,
  latitude: undefined,
  longitude: undefined,
  agencyId: undefined,
  type: undefined,
  icon: undefined,
  cover: undefined,
  description: undefined,
  menuName: undefined,
  signIn: undefined,
  getPoints: undefined,
  sHeight: undefined,
  sAge: undefined,
  sPerformanceCategory: undefined,
  sPrice: undefined,
  sCuisineKind: undefined,
  sThrillLevel: undefined,
  sWaitTime: undefined,
  sOpenTime: undefined,
  sLocation: undefined,
  sMatters: undefined,
  signboardCuisine: undefined,
  saleGoods: undefined,
  playTime: undefined
})
const formRules = reactive({
  title: [{ required: true, message: '点位名称不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '1是正常,0是下架不能为空', trigger: 'blur' }],
  width: [{ required: true, message: '宽度不能为空', trigger: 'blur' }],
  height: [{ required: true, message: '高度不能为空', trigger: 'blur' }],
  latitude: [{ required: true, message: '纬度不能为空', trigger: 'blur' }],
  longitude: [{ required: true, message: '经度不能为空', trigger: 'blur' }],
  agencyId: [{ required: true, message: '从属机构的id不能为空', trigger: 'blur' }],
  type: [{ required: true, message: '点位的类型id不能为空', trigger: 'blur' }]
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
      formData.value = await PositionApi.getPosition(id)
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
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as PositionVO
    if (formType.value === 'create') {
      await PositionApi.createPosition(data)
      message.success(t('common.createSuccess'))
    } else {
      await PositionApi.updatePosition(data)
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
    id: undefined,
    title: undefined,
    isTop: undefined,
    status: undefined,
    width: undefined,
    height: undefined,
    latitude: undefined,
    longitude: undefined,
    agencyId: undefined,
    type: undefined,
    icon: undefined,
    cover: undefined,
    description: undefined,
    menuName: undefined,
    signIn: undefined,
    getPoints: undefined,
    sHeight: undefined,
    sAge: undefined,
    sPerformanceCategory: undefined,
    sPrice: undefined,
    sCuisineKind: undefined,
    sThrillLevel: undefined,
    sWaitTime: undefined,
    sOpenTime: undefined,
    sLocation: undefined,
    sMatters: undefined,
    signboardCuisine: undefined,
    saleGoods: undefined,
    playTime: undefined
  }
  formRef.value?.resetFields()
}
</script>
