<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="订单id" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入订单id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="订单内部编号" prop="no">
        <el-input
          v-model="queryParams.no"
          placeholder="请输入订单内部编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="下单链接" prop="downUrl">
        <el-input
          v-model="queryParams.downUrl"
          placeholder="请输入下单链接"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="订单来源终端" prop="origion">
        <el-input
          v-model="queryParams.origion"
          placeholder="请输入订单来源终端"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="物流公司单号" prop="logisticsNo">
        <el-input
          v-model="queryParams.logisticsNo"
          placeholder="请输入物流公司单号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="业务员" prop="salesman">
        <el-input
          v-model="queryParams.salesman"
          placeholder="请输入业务员"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="商家备注" prop="remark">
        <el-input
          v-model="queryParams.remark"
          placeholder="请输入商家备注"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="商品 SPU 编号" prop="spuId">
        <el-input
          v-model="queryParams.spuId"
          placeholder="请输入商品 SPU 编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="商品 SPU 名称" prop="spuName">
        <el-input
          v-model="queryParams.spuName"
          placeholder="请输入商品 SPU 名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="商品 SKU 编号" prop="skuId">
        <el-input
          v-model="queryParams.skuId"
          placeholder="请输入商品 SKU 编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="收件人名称" prop="receiverName">
        <el-input
          v-model="queryParams.receiverName"
          placeholder="请输入收件人名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="收件人手机" prop="receiverMobile">
        <el-input
          v-model="queryParams.receiverMobile"
          placeholder="请输入收件人手机"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="queryParams.createTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['mall:order:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['mall:order:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="订单id" align="center" prop="id" />
      <el-table-column label="订单内部编号" align="center" prop="no" />
      <el-table-column label="下单链接" align="center" prop="downUrl" />
      <el-table-column label="购买链接" align="center" prop="productUrl" />
      <el-table-column label="订单来源终端" align="center" prop="origion" />
      <el-table-column label="订单状态(0待审核 1待发货 2已发货 3已签收 4未签收 5无效订单)" align="center" prop="status" />
      <el-table-column label="商家备注" align="center" prop="remark" />
      <el-table-column label="地区编号" align="center" prop="regionId" />
      <el-table-column label="收件人名称" align="center" prop="receiverName" />
      <el-table-column label="收件人手机" align="center" prop="receiverMobile" />
      <el-table-column label="收件人地址" align="center" prop="receiverAddress" />
      <el-table-column label="ip地址" align="center" prop="ipAddress" />
      <el-table-column label="ip地址详细信息" align="center" prop="ipAddressDetail" />
      <el-table-column label="用户备注" align="center" prop="userRemark" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['mall:order:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['mall:order:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <OrderForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { OrderApi, OrderVO } from '@/api/mall/order'
import OrderForm from './OrderForm.vue'

/** 跨国订单 列表 */
defineOptions({ name: 'Order' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<OrderVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  id: undefined,
  no: undefined,
  downUrl: undefined,
  origion: undefined,
  logisticsNo: undefined,
  salesman: undefined,
  remark: undefined,
  spuId: undefined,
  spuName: undefined,
  skuId: undefined,
  receiverName: undefined,
  receiverMobile: undefined,
  createTime: []
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await OrderApi.getOrderPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await OrderApi.deleteOrder(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await OrderApi.exportOrder(queryParams)
    download.excel(data, '跨国订单.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>