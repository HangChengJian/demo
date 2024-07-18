import request from '@/config/axios'

// 跨国订单 VO
export interface OrderVO {
  id: number // 订单id
  no: string // 订单内部编号
  downUrl: string // 下单链接
  productUrl: string // 购买链接
  type: number // 订单类型
  origion: string // 订单来源终端
  status: number // 订单状态(0待审核 1待发货 2已发货 3已签收 4未签收 5无效订单)
  cancelTime: Date // 订单审核时间
  deliveryTime: Date // 订单发货时间
  finishTime: Date // 订单签收时间
  logisticsNo: string // 物流公司单号
  logisticsStatus: string // 物流状态
  logisticsWaybillUrl: string // 物流公司面单下载地址
  salesman: string // 业务员
  productPrice: number // 商品金额
  remark: string // 商家备注
  thaliId: string // 商品套餐编号
  spuId: number // 商品 SPU 编号
  spuName: string // 商品 SPU 名称
  skuId: number // 商品 SKU 编号
  regionId: string // 地区编号
  receiverName: string // 收件人名称
  receiverMobile: string // 收件人手机
  receiverEmali: string // 收件人邮箱
  receiverAddress: string // 收件人地址
  receiverLatitude: string // 收件人经度
  receiverLongitude: string // 收件人维度
  receiverCity: string // 收件人城市
  receiverProvince: string // 收件人省份
  ipAddress: string // ip地址
  ipAddressDetail: string // ip地址详细信息
  userRemark: string // 用户备注
}

// 跨国订单 API
export const OrderApi = {
  // 查询跨国订单分页
  getOrderPage: async (params: any) => {
    return await request.get({ url: `/mall/order/page`, params })
  },

  // 查询跨国订单详情
  getOrder: async (id: number) => {
    return await request.get({ url: `/mall/order/get?id=` + id })
  },

  // 新增跨国订单
  createOrder: async (data: OrderVO) => {
    return await request.post({ url: `/mall/order/create`, data })
  },

  // 修改跨国订单
  updateOrder: async (data: OrderVO) => {
    return await request.put({ url: `/mall/order/update`, data })
  },

  // 删除跨国订单
  deleteOrder: async (id: number) => {
    return await request.delete({ url: `/mall/order/delete?id=` + id })
  },

  // 导出跨国订单 Excel
  exportOrder: async (params) => {
    return await request.download({ url: `/mall/order/export-excel`, params })
  }
}