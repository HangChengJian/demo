<!-- 商品中心 - 商品列表  -->
<template>
  <doc-alert title="【商品】商品 SPU 与 SKU" url="https://doc.iocoder.cn/mall/product-spu-sku/" />

  <!-- 搜索工作栏 -->
  <ContentWrap>
    <el-form
      ref="queryFormRef"
      :inline="true"
      :model="queryParams"
      class="-mb-15px"
      label-width="98px"
    >
      <el-form-item label="商品名称" prop="name">
        <el-input
          v-model="queryParams.name"
          class="!w-240px"
          clearable
          placeholder="请输入商品名称"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品ID" prop="pageId">
        <el-input
          v-model="queryParams.pageId"
          class="!w-240px"
          clearable
          placeholder="请输入商品ID"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建者" prop="salesman">
        <el-cascader
        v-model="queryParams.salesman"
        :options="userList"
        :props="userProps"
        class="!w-240px"
          clearable
          filterable
          placeholder="请选择创建者"
      />
      </el-form-item>
      <!-- <el-form-item label="地区" prop="categoryId">
        <el-cascader
          v-model="queryParams.categoryId"
          :options="categoryList"
          :props="defaultProps"
          class="w-1/1"
          clearable
          filterable
          placeholder="请选择地区"
        />
      </el-form-item> -->
      <el-form-item label="推广链接" prop="promotionUrl">
        <el-input
          v-model="queryParams.promotionUrl"
          class="!w-240px"
          clearable
          placeholder="请输入推广链接"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品分类" prop="categoryId">
        <el-cascader
          v-model="queryParams.categoryId"
          :options="categoryList"
          :props="defaultProps"
          class="!w-240px"
          clearable
          filterable
          placeholder="请选择商品分类"
        />
      </el-form-item>
      <el-form-item label="内部编码" prop="id">
        <el-input
          v-model="queryParams.id"
          class="!w-240px"
          clearable
          placeholder="请输入内部编码"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="queryParams.createTime"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-240px"
          end-placeholder="结束日期"
          start-placeholder="开始日期"
          type="daterange"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button @click="handleQuery">
          <Icon class="mr-5px" icon="ep:search" />
          搜索
        </el-button>
        <el-button @click="resetQuery">
          <Icon class="mr-5px" icon="ep:refresh" />
          重置
        </el-button>
        <el-button
          v-hasPermi="['product:spu:create']"
          plain
          type="primary"
          @click="openForm(undefined)"
        >
          <Icon class="mr-5px" icon="ep:plus" />
          新增
        </el-button>
        <!-- <el-button
          v-hasPermi="['product:spu:export']"
          :loading="exportLoading"
          plain
          type="success"
          @click="handleExport"
        >
          <Icon class="mr-5px" icon="ep:download" />
          导出
        </el-button> -->
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-tabs v-model="queryParams.tabType" @tab-click="handleTabClick">
      <el-tab-pane
        v-for="item in tabsData"
        :key="item.type"
        :label="item.name + '(' + item.count + ')'"
        :name="item.type"
      />
    </el-tabs>
    <el-table v-loading="loading" :data="list">
      <el-table-column type="expand">
        <template #default="{ row }">
          <el-form class="spu-table-expand" label-position="left">
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="3">
                    <el-form-item label="内部编码:">
                      <div class="fx-ct pointer color-88" @click="copy(row.id)" v-if="row.id">
                        {{ row.id }}
                        <Icon icon="svg-icon:copy" class="ml-4px" :size="18" />
                        </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="推广链接:">
                      <!-- <div class="pointer color-88 text-sl" @click="copy(row.promotionUrl)"  style="width: 100%;" v-for="(item, index) in row.procureUrls" :key="index">
                        {{ item || '无'}}
                        </div> -->
                        <div class="pointer color-88 text-sl"   style="width: 90%;"  @click="onWebURl(row.downUrl)">
                        {{ row.promotionUrl || '无'}}
                        </div>
                        <Icon icon="svg-icon:copy" class="ml-4px" :size="18" @click.stop="copy(row.promotionUrl)"/>

                    </el-form-item>
                  </el-col>
                  
                  <el-col :span="4">
                    <el-form-item label="whatsapp:">
                      <div class="pointer color-88" @click="copy(row.whatsapp)" >
                        {{ row.whatsapp || '无'}}
                        <span  style="position: relative;top: 2px">
                          <Icon icon="svg-icon:copy" class="ml-4px color-88" :size="18" />
                        </span>
                        </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="创建时间:">
                      <span>{{ formatDate(row.createTime) }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="修改时间:">
                      <span>{{ formatDate(row.updateTime) }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="浏览量:">
                      <span>{{ row.browseCount }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="虚拟销量:">
                      <span>{{ row.virtualSalesCount }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row> -->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品ID" min-width="140" prop="id" >
      <template #default="{ row }">
          <div class="flex pointer color-88" @click="copy(row.pageId)">
           {{ row.pageId }}
           <Icon icon="svg-icon:copy" class="ml-4px" :size="20" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" min-width="300">
        <template #default="{ row }">
          <div class="flex">
            <el-image
              fit="cover"
              :src="row.picUrl"
              class="flex-none w-50px h-50px pointer"
              @click="imagePreview(row.picUrl)"
            />
            <div class="ml-4 overflow-hidden">
              <el-tooltip effect="dark" :content="row.name" placement="top">
                <div>
                  {{ row.name }}
                </div>
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="活动封面" min-width="100">
        <template #default="{ row }">
            <el-image
              fit="cover"
              :src="row.marketingUrl"
              class="flex-none w-50px h-50px pointer"
              @click="imagePreview(row.marketingUrl)"
              v-if='row.marketingUrl'
            />
            <span v-else>无</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="商品分类" min-width="160" prop="price">
        <template #default="{ row }">{{ formatCategoryName(row.categoryId) }}</template>
      </el-table-column>
      <el-table-column align="center" label="价格" min-width="160" prop="price">
        <template #default="{ row }">
          <div>原价 {{ row.priceAs }}</div>
          <div>折扣价 {{ row.discountPriceAs }}</div>
          </template>
      </el-table-column>
      <el-table-column align="center" label="采购价" min-width="90" prop="salesman" >
        <template #default="{ row }">
          {{ row.procurePrice }}
          </template>
      </el-table-column>
      <el-table-column align="center" label="重量" min-width="90" prop="salesman" >
        <template #default="{ row }">
          {{ row.weight }}g
          </template>
      </el-table-column>
      <el-table-column align="center" label="创建者" min-width="90" prop="salesman" >
        <template #default="{ row }">
          {{ salesmanName(row.salesman) }}
          </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="库存" min-width="90" prop="stock" />
      <el-table-column align="center" label="排序" min-width="70" prop="sort" /> -->
      <!-- <el-table-column align="center" label="销售状态" min-width="80">
        <template #default="{ row }">
          <template v-if="row.status >= 0">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              active-text="上架"
              inactive-text="下架"
              inline-prompt
              @change="handleStatusChange(row)"
            />
          </template>
          <template v-else>
            <el-tag type="info">回收站</el-tag>
          </template>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        :formatter="dateFormatter"
        align="center"
        label="创建时间"
        prop="createTime"
        width="180"
      /> -->
      <el-table-column align="center" fixed="right" label="操作" min-width="200">
        <template #default="{ row }">
          <!-- <el-button link type="primary" @click="openDetail(row.id)"> 详情 </el-button> -->
          <el-button link type="primary" @click="handleClone(row.id)"> 复制 </el-button>
          <el-button
            v-hasPermi="['product:spu:update']"
            link
            type="primary"
            @click="openForm(row.id)"
          >
            修改
          </el-button>
          <template v-if="queryParams.tabType === 4">
            <el-button
              v-hasPermi="['product:spu:delete']"
              link
              type="danger"
              @click="handleDelete(row.id)"
            >
              删除
            </el-button>
            <el-button
              v-hasPermi="['product:spu:update']"
              link
              type="primary"
              @click="handleStatus02Change(row, ProductSpuStatusEnum.DISABLE.status)"
            >
              恢复
            </el-button>
          </template>
          <template v-else>
            <el-button
              v-hasPermi="['product:spu:update']"
              link
              type="danger"
              @click="handleStatus02Change(row, ProductSpuStatusEnum.RECYCLE.status)"
            >
              回收
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      v-model:limit="queryParams.pageSize"
      v-model:page="queryParams.pageNo"
      :total="total"
      @pagination="getList"
    />
  </ContentWrap>
    <!-- 复制弹窗 -->
  <CloneForm ref="cloneFormRef" @success="getList" :list='userList'/>
</template>
<script lang="ts" setup>
import { TabsPaneContext } from 'element-plus'
import { createImageViewer } from '@/components/ImageViewer'
import { defaultProps, handleTree, treeToString } from '@/utils/tree'
import { ProductSpuStatusEnum } from '@/utils/constants'
import { fenToYuan } from '@/utils'
import { DICT_TYPE,getIntDictOptions, getStrDictOptions } from '@/utils/dict'
import download from '@/utils/download'
import { useClipboard } from '@vueuse/core'
import { formatDate } from '@/utils/formatTime'
import CloneForm from './components/CloneForm.vue'

import * as ProductSpuApi from '@/api/mall/product/spu'
import * as ProductCategoryApi from '@/api/mall/product/category'

defineOptions({ name: 'ProductSpu' })
const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化
const { push } = useRouter() // 路由跳转

const loading = ref(false) // 列表的加载中
const exportLoading = ref(false) // 导出的加载中
const total = ref(0) // 列表的总页数
const list = ref<ProductSpuApi.Spu[]>([]) // 列表的数据
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
const salesmanName = (id)=>{
  let name = userList.value.filter(e => e.id == id )[0]
  if(name?.nickname){
    return name.nickname
  }else{
    return ''
  }
}
const onWebURl = (url)=>{
  window.open(url,'_blank')
}
// tabs 数据
const tabsData = ref([
  {
    name: '出售中',
    type: 0,
    count: 0
  },
  {
    name: '回收站',
    type: 4,
    count: 0
  }
])

const queryParams = ref({
  pageNo: 1,
  pageSize: 10,
  tabType: 0,
  name: '',
  pageId:'',
  categoryId: undefined,
  salesman:'',
  promotionUrl:'',
  id:'',
}) // 查询参数
const queryFormRef = ref() // 搜索的表单Ref

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await ProductSpuApi.getSpuPage(queryParams.value)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}
/** 复制按钮操作 **/
const cloneFormRef = ref()
const handleClone = (id: number) => {
  cloneFormRef.value.open(id)
}
/** 切换 Tab */
const handleTabClick = (tab: TabsPaneContext) => {
  queryParams.value.tabType = tab.paneName as number
  getList()
}

/** 获得每个 Tab 的数量 */
const getTabsCount = async () => {
  const res = await ProductSpuApi.getTabsCount()
  tabsData.value[0].count = res[0]
  tabsData.value[1].count = res[4]

  // for (let objName in res) {
  //   tabsData.value[Number(objName)].count = res[objName]
  // }
}

/** 添加到仓库 / 回收站的状态 */
const handleStatus02Change = async (row: any, newStatus: number) => {
  try {
    // 二次确认
    const text = newStatus === ProductSpuStatusEnum.RECYCLE.status ? '加入到回收站' : '恢复到仓库'
    await message.confirm(`确认要"${row.name}"${text}吗？`)
    // 发起修改
    await ProductSpuApi.updateStatus({ id: row.id, status: newStatus })
    message.success(text + '成功')
    // 刷新 tabs 数据
    await getTabsCount()
    // 刷新列表
    await getList()
  } catch {}
}

/** 更新上架/下架状态 */
const handleStatusChange = async (row: any) => {
  try {
    // 二次确认
    const text = row.status ? '上架' : '下架'
    await message.confirm(`确认要${text}"${row.name}"吗？`)
    // 发起修改
    await ProductSpuApi.updateStatus({ id: row.id, status: row.status })
    message.success(text + '成功')
    // 刷新 tabs 数据
    await getTabsCount()
    // 刷新列表
    await getList()
  } catch {
    // 异常时，需要重置回之前的值
    row.status =
      row.status === ProductSpuStatusEnum.DISABLE.status
        ? ProductSpuStatusEnum.ENABLE.status
        : ProductSpuStatusEnum.DISABLE.status
  }
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await ProductSpuApi.deleteSpu(id)
    message.success(t('common.delSuccess'))
    // 刷新tabs数据
    await getTabsCount()
    // 刷新列表
    await getList()
  } catch {}
}

/** 商品图预览 */
const imagePreview = (imgUrl: string) => {
  createImageViewer({
    urlList: [imgUrl]
  })
}

/** 搜索按钮操作 */
const handleQuery = () => {
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 新增或修改 */
const openForm = (id?: number) => {
  // 修改
  if (typeof id === 'number') {
    push({ name: 'ProductSpuEdit', params: { id } })
    return
  }
  // 新增
  push({ name: 'ProductSpuAdd' })
}

/** 查看商品详情 */
const openDetail = (id: number) => {
  push({ name: 'ProductSpuDetail', params: { id } })
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await ProductSpuApi.exportSpu(queryParams)
    download.excel(data, '商品列表.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 获取分类的节点的完整结构 */
const categoryList = ref() // 分类树
const formatCategoryName = (categoryId: number) => {
  return treeToString(categoryList.value, categoryId)
}

/** 激活时 */
onActivated(() => {
  // getList()
})

/** 初始化 **/
onMounted(async () => {
  await getTabsCount()
  await getList()
  // 获得分类树
  const data = await ProductCategoryApi.getCategoryList({})
  categoryList.value = handleTree(data, 'id', 'parentId')

})

/** 复制 **/
const copy = async (text: string) => {
  const { copy, copied, isSupported } = useClipboard({ source: text })
  if (!isSupported) {
    message.error(t('common.copyError'))
    return
  }
  console.log(copy);
  
  await copy()
  if (unref(copied)) {
    message.success(t('common.copySuccess'))
  }
}
</script>
<style lang="scss" scoped>
.spu-table-expand {
  padding-left: 42px;

  :deep(.el-form-item__label) {
    width: 82px;
    font-weight: bold;
    color: #99a9bf;
  }
}
.text-sl{
  overflow: hidden; /* 确保内容超出容器时会被隐藏 */
  white-space: nowrap; /* 确保文本在一行内显示，避免换行 */
  text-overflow: ellipsis; /* 用省略号表示被截断的文本 */
}
</style>
