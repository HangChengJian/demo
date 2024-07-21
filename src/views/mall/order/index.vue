<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="108px"
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
      <el-form-item label="订单来源" prop="origion">
        <el-cascader
        v-model="queryParams.origion"
        :options="origionType"
        :props="userProps"
        class="w-1/1"
          clearable
          filterable
          placeholder="请选择订单来源"
      />
      
        
      </el-form-item>
      <!-- <el-form-item label="物流单号" prop="logisticsNo">
        <el-input
          v-model="queryParams.logisticsNo"
          placeholder="请输入物流单号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item> -->
      <el-form-item label="业务员" prop="salesman">
        <el-cascader
        v-model="queryParams.salesman"
        :options="userList"
        :props="userProps"
        class="w-1/1"
          clearable
          filterable
          placeholder="请选择业务员"
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
      <el-form-item label="SPU编号" prop="spuId">
        <el-input
          v-model="queryParams.spuId"
          placeholder="请输入商品SPU编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="SPU名称" prop="spuName">
        <el-input
          v-model="queryParams.spuName"
          placeholder="请输入商品SPU名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="SKU编号" prop="skuId">
        <el-input
          v-model="queryParams.skuId"
          placeholder="请输入商品SKU编号"
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
        <!-- <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['mall:order:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button> -->
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['mall:order:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
        <el-button
          type="primary"
          plain
          @click="handleImport"
          :loading="exportLoading"
          v-hasPermi="['mall:order:export']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 导入审单信息
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-tabs v-model="tabType" @tab-click="handleTabClick">
      <el-tab-pane
        v-for="item in tabsData"
        :key="item.type"
        :label="item.name"
        :name="item.type"
      />
    </el-tabs>

    <el-table v-loading="loading" :data="list" @selection-change="handleSelectionChange">
      <el-table-column type="expand">
        <template #default="{ row }">
          <el-form class="spu-table-expand" label-position="left">
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="4">
                    <el-form-item label="订单内部编号:" label-width="108px">
                      <div class="fx-ct pointer color-88 text-sl"  @click.stop="copy(row.no)" style="max-width: 500px;">
                       {{ row.no }}
                        <Icon icon="svg-icon:copy" class="ml-4px" :size="18" />
                        </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="下单链接:">
                      <div class="pointer color-88 text-sl"  @click="onWebURl(row.downUrl)" style="width: 100%;">
                        {{ row.downUrl}}
                        <span  style="position: relative;top: 2px">
                          <Icon icon="svg-icon:copy" class="ml-4px color-88" :size="18" @click.stop="copy(row.downUrl)"/>
                        </span>
                        </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="IP地址:">
                      <div class="pointer color-88" @click="copy(row.ipAddress)">
                        {{ row.ipAddress}}-{{ row.ipAddressDetail }}
                        <span  style="position: relative;top: 2px">
                          <Icon icon="svg-icon:copy" class="ml-4px color-88" :size="18" />
                        </span>
                        </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="审核建议:">
                      <div class="pointer color-88" style="width: 100%;line-height: 16px;margin-bottom: 6px;" @click="recommendation(item.suggestionOrderId)" v-for="(item, index) in row.suggestions" :key="index">
                        {{ item.suggestionValue }}
                        </div>
                     
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="更新时间:">
                      <span>{{ formatDate(row.updateTime) }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55" />

      <el-table-column label="订单号" min-width="140" prop="id" >
      <template #default="{ row }">
        <div class="flex ">
          <div class="flex pointer color-88" @click="copy(row.id)">
          {{ row.id }}
           <Icon icon="svg-icon:copy" class="ml-4px" :size="20" />
          </div>
        </div>
        </template>
      </el-table-column>
      <el-table-column label="地区/来源" min-width="100" prop="id" >
      <template #default="{ row }">
        <div class="flex ">
          <div class="flex">
          {{ row.region }}-{{row.origion || '其它'}}
          </div>
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
              <el-tag type="success">{{ row.items.length }}件</el-tag>
              <el-tooltip effect="dark" :content="row.spuName" placement="top">
                <div class='text-sl pointer' style="color:#409eff" @click="onWebURl(row.downUrl)">
                 {{ row.spuName }}
                </div>
              </el-tooltip>
              <div class='text-sl coloe-9' v-for="(item, index) in goodsSku(row.items)" :key="index">
                 {{ item.value }} * {{ item.count }}
              </div>
                
            </div>
          </div>
        </template>
      </el-table-column>
     
      <el-table-column align="center" label="订单总金额" min-width="100" prop="price">
        <template #default="{ row }">
          <span style="padding-right: 6px;display: inline-block">{{ dwName(row.region) }}</span>
          <span style="color: darkorange;">{{ row.productPrice }}</span>
          </template>
      </el-table-column>
      <el-table-column label="留言/备注" min-width="150" align="center">
        <template #default="{ row }">
              <el-tooltip effect="dark" :content="row.userRemark||'无'" placement="top">
                <div class='text-sl'>
                留言： {{ row.userRemark ||'无' }}
                </div>
              </el-tooltip>
              <el-tooltip effect="dark" :content="row.remark||'无'" placement="top">
                <div class='text-sl'>
                备注： {{ row.remark ||'无' }}
                </div>
              </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="审核建议" min-width="150" align="center">
        <template #default="{ row }">
              <el-tooltip effect="dark" :content="row.userRemark||'无'" placement="top">
                <div class='text-sl'>
                {{ row.suggestionName ||'无' }} {{ row.suggestionValue ||'' }}
                </div>
              </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" min-width="160" prop="price">
        <template #default="{ row }">{{formatDate(row.createTime)}}</template>
      </el-table-column>
      <el-table-column align="center" label="业务员" min-width="100" prop="price">
        <template #default="{ row }">{{ salesmanName(row.salesman)}}</template>
      </el-table-column>
      <el-table-column align="center" label="状态" min-width="100" prop="price">
        <template #default="{ row }">
          <el-tag type="primary" v-if='row.status == 1'>{{ statusName(row.status)}}</el-tag>
    <el-tag type="success" v-if='row.status == 2 || row.status == 3'>{{ statusName(row.status)}}</el-tag>
    <el-tag type="info" v-if='row.status == 5'>{{ statusName(row.status)}}</el-tag>
    <el-tag type="warning" v-if='row.status == 0'>{{ statusName(row.status)}}</el-tag>
    <!-- <el-tag type="danger" v-if='row.status == 5'>{{ statusName(row.status)}}</el-tag> -->
          
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" min-width="200">
        <template #default="scope">
          <el-button
            link
            type="success"
            @click="onSignFor(scope.row.id,3)"
            v-hasPermi="['mall:order:update']"
            v-if='scope.row.status == 2'
          >
            签收
          </el-button>
          <el-button
            link
            type="danger"
            @click="onSignFor(scope.row.id,4)"
            v-hasPermi="['mall:order:update']"
            v-if='scope.row.status == 2'
          >
            拒签
          </el-button>
          <el-button
            link
            color="#626aef"
            plain
            @click="getLogistics(scope.row.id)"
            v-hasPermi="['mall:order:update']"
            v-if='scope.row.status == 2 || scope.row.status == 3 || scope.row.status == 4'
          >
            查看物流
          </el-button>
          <el-button
            link
            type="success"
            @click="onPass(scope.row.id)"
            v-hasPermi="['mall:order:update']"
            v-if='scope.row.status == 0'
          >
            审核通过
          </el-button>
          <el-button
            link
            type="primary"
            @click="onSend(scope.row.id)"
            v-hasPermi="['mall:order:update']"
            v-if='scope.row.status == 1'
          >
            发货
          </el-button>
          <el-button
            link
            type="info"
            @click="onWait(scope.row.id)"
            v-hasPermi="['mall:order:update']"
            v-if='scope.row.status == 5'
          >
            设为待审核
          </el-button>
          <el-button
            link
            type="warning"
            @click="onInvalid(scope.row.id)"
            v-hasPermi="['mall:order:update']"
          >
            设为无效
          </el-button>
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
    <!-- <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="订单id" align="center" prop="id" />
      <el-table-column label="订单内部编号" align="center" prop="no" />
      <el-table-column label="下单链接" align="center" prop="downUrl" />
      <el-table-column label="购买链接" align="center" prop="productUrl" />
      <el-table-column label="订单来源终端" align="center" prop="origion" />
      <el-table-column label="订单状态" align="center" prop="status" />
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
    </el-table> -->
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
   <!-- 导出 -->
  <ExportOrder ref="exportOrderRef" @success="handleExportSend" :list='templateListRef'  />
  <!-- 导入 -->
  <ImportForm ref="importFormRef" @success="getList" />
  <!-- 物流 -->
  <Logistics ref="LogisticsRef" :list='logisticsListRef'  />

</template>

<script setup lang="ts">
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { OrderApi, OrderVO } from '@/api/mall/order'
import { OrderTemplateApi } from '@/api/trade/ordertemplate'

import OrderForm from './OrderForm.vue'
import ExportOrder from './ExportOrder.vue'
import { useClipboard } from '@vueuse/core'
import { createImageViewer } from '@/components/ImageViewer'
import * as ProductSpuApi from '@/api/mall/product/spu'
import { formatDate } from '@/utils/formatTime'
import ImportForm from './importForm.vue'
import Logistics from './logistics.vue'


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
  status:undefined,
  createTime: []
})
const userProps = {
  children: 'children',
  label: 'nickname',
  value: 'id',
  isLeaf: 'leaf',
  emitPath: false // 用于 cascader 组件：在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
}
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
  console.log( multipleSelection.value)
}
/** 商品图预览 */
const imagePreview = (imgUrl: string) => {
  createImageViewer({
    urlList: [imgUrl]
  })
}
const origionType = [
{
  nickname: 'SnapChat',
    id: 1,
  },
  {
    nickname: 'Facebook',
    id: 2,
  },
  {
    nickname: 'Tiktok',
    id: 3,
  },
]
const dw = [
  {
    name:'沙特阿拉伯',
    currency: "SAR",
  },
  {
    name:'阿联酋',
    currency: "AED",
  },
  {
    name:'沙特阿拉伯',
    currency: "AED",
  },
  {
    name:'卡塔尔',
    currency: "QAR",
  },
  {
    name:'巴林',
    currency: "BHD",
  },
  {
    name:'阿曼',
    currency: "OMR",
  },
]

const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中
const tabType = 99
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
const recommendation= (ids)=>{
  if(!ids) return
  queryFormRef.value.resetFields()
  queryParams.pageNo = 1
  queryParams.id = JSON.parse(ids).join(',')
  getList()
}
const userList = ref([])
// 获取业务员
ProductSpuApi.getSimple().then(res=>{
  userList.value = res
})
const statusName = (status)=>{
  let name = tabsData.value.filter(e => e.type == status )[0].name
  return name
}
const salesmanName = (id)=>{
  if(!id) return '未知'
  let name = userList.value.filter(e => e.id == id )[0].nickname
  return name
}

const dwName = (gj)=>{
  let currency = ''
  dw.forEach(e=>{
			if(e.name === gj){
				currency = e.currency
			}
		})
		
		return currency ;
}
const goodsSku =(sku)=>{
  let arr = []
  sku.forEach(element => {
    let name =''
    element.properties.forEach(e => {
      name+=e.valueName
    });
    arr.push(name)
  });
  return arr.reduce((acc, value) => {
    const existing = acc.find(item => item.value === value);
    if (existing) {
      existing.count++; // 已存在，增加计数
    } else {
      acc.push({ value, count: 1 }); // 添加新元素，计数为1
    }
    return acc;
  }, []);
  return arr
}
/** 切换 Tab */
const handleTabClick = (tab) => {
  queryParams.status = tab.paneName===99?'':tab.paneName
  console.log(tab)
  handleQuery()
}
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
const onWebURl = (url)=>{
  window.open(url,'_blank')
}
// tabs 数据
// <!-- (0待审核 1待发货 2已发货 3已签收 4未签收 5无效订单) -->

const tabsData = ref([
  {
    name: '全部',
    type: 99,
    count: 0
  },
  {
    name: '待审核',
    type: 0,
    count: 0
  },
  {
    name: '待发货',
    type: 1,
    count: 0
  },
  {
    name: '已发货',
    type: 2,
    count: 0
  },
  {
    name: '已签收',
    type: 3,
    count: 0
  },
  {
    name: '未签收',
    type: 4,
    count: 0
  },
  {
    name: '无效订单',
    type: 5,
    count: 0
  },
])
// 查看物流
const LogisticsRef = ref(null)
const logisticsListRef = ref({
  trackingList: []
})
const getLogistics = async(id)=>{
  const data = await OrderApi.getLogistics(id)
  console.log(data)
  if(!data){
    message.warning('暂无物流信息')
  }else{
    logisticsListRef.value = data
    LogisticsRef.value?.open()
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

const onInvalid = async(id)=>{
  try {
    // (0待审核、1待发货、2已发货、3已签收、4未签收、5无效订单),示例值(1)
    await message.confirm('是否修改为无效订单？','提示')
    await OrderApi.setUnSend({id:[id],status:5})
    message.success('修改成功')
    // // 刷新列表
    await getList()
  } catch {}
}
const onSend = async(id)=>{
  console.log(id)
  try {
    // (0待审核、1待发货、2已发货、3已签收、4未签收、5无效订单),示例值(1)
    await message.confirm('是否确认发货？','提示')
    await OrderApi.sendOrder(id)
    message.success('发货成功')
    // // 刷新列表
    await getList()
  } catch {
    console.log('erere')
  }
}

const onWait = async(id)=>{
  try {
    // (0待审核、1待发货、2已发货、3已签收、4未签收、5无效订单),示例值(1)
    await message.confirm('是否修改为待审核？','提示')
    await OrderApi.setUnSend({id:[id],status:0})
    message.success('修改成功')
    // // 刷新列表
    await getList()
  } catch {}
}
const onSignFor = async(id,type)=>{
  try {
    // (0待审核、1待发货、2已发货、3已签收、4未签收、5无效订单),示例值(1)
    await message.confirm(`是否确认${id===3?'签收':'拒签'}`,'提示')
    await OrderApi.setUnSend({id:[id],status:type})
    message.success('操作成功')
    // // 刷新列表
    await getList()
  } catch {}
}
const onPass = async(id)=>{
  try {
    // (0待审核、1待发货、2已发货、3已签收、4未签收、5无效订单),示例值(1)
    await message.confirm('是否确认通过审核？','提示')
    await OrderApi.setUnSend({id:[id],status:1})
    message.success('审核成功')
    // // 刷新列表
    await getList()
  } catch {}
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

/** 导入按钮操作 */
const importFormRef = ref(null)
const handleImport = () => {
  importFormRef.value?.open()
}
const exportOrderRef = ref()
const handleExport = () => {
  if(multipleSelection.value.length == 0){
    message.warning('请选择导出订单')
    return
  }
  exportOrderRef.value.open()
}
/** 导出按钮操作 */
const handleExportSend = async (templateId) => {
  let obj = {
    ids:multipleSelection.value.map(e=>e.id).join(','),
    templateId
  }
  try {
    // 导出的二次确认
    // await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await OrderApi.exportOrder(obj)
    download.excel(data, '跨国订单.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}
const templateListRef = ref([])
/** 初始化 **/
onMounted(() => {
    OrderTemplateApi.getOrderTemplatePage({pageNo:1,pageSize:99}).then(e=>{
      templateListRef.value = e.list
    })
  getList()
})
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
.coloe-9{
  color:#999;
  font-size: 12px
}
</style>