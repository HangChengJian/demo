import request from '@/config/axios'

// tb订单模板 VO
export interface OrderTemplateVO {
  id: number // id
  templateName: string // 模板名称
  templateValue: string // 模板值值
  isTop: number // 是否置顶（0正常 1置顶）
}

// tb订单模板 API
export const OrderTemplateApi = {
  // 查询tb订单模板分页
  getOrderTemplatePage: async (params: any) => {
    return await request.get({ url: `/trade/order-template/page`, params })
  },

  // 查询tb订单模板详情
  getOrderTemplate: async (id: number) => {
    return await request.get({ url: `/trade/order-template/get?id=` + id })
  },

  // 新增tb订单模板
  createOrderTemplate: async (data: OrderTemplateVO) => {
    return await request.post({ url: `/trade/order-template/create`, data })
  },

  // 修改tb订单模板
  updateOrderTemplate: async (data: OrderTemplateVO) => {
    return await request.put({ url: `/trade/order-template/update`, data })
  },

  // 删除tb订单模板
  deleteOrderTemplate: async (id: number) => {
    return await request.delete({ url: `/trade/order-template/delete?id=` + id })
  },

  // 导出tb订单模板 Excel
  exportOrderTemplate: async (params) => {
    return await request.download({ url: `/trade/order-template/export-excel`, params })
  }
}