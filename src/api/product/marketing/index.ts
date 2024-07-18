import request from '@/config/axios'

// 营销图片管理 VO
export interface MarketingVO {
  id: number // Banner 编号
  title: string // Banner 标题
  picUrls: string // 图片地址数组，以逗号分隔
  beginTime: Date // 更新时间
  endTime: Date // 更新时间
}

// 营销图片管理 API
export const MarketingApi = {
  // 查询营销图片管理分页
  getMarketingPage: async (params: any) => {
    return await request.get({ url: `/product/marketing/page`, params })
  },

  // 查询营销图片管理详情
  getMarketing: async (id: number) => {
    return await request.get({ url: `/product/marketing/get?id=` + id })
  },

  // 新增营销图片管理
  createMarketing: async (data: MarketingVO) => {
    return await request.post({ url: `/product/marketing/create`, data })
  },

  // 修改营销图片管理
  updateMarketing: async (data: MarketingVO) => {
    return await request.put({ url: `/product/marketing/update`, data })
  },

  // 删除营销图片管理
  deleteMarketing: async (id: number) => {
    return await request.delete({ url: `/product/marketing/delete?id=` + id })
  },

  // 导出营销图片管理 Excel
  exportMarketing: async (params) => {
    return await request.download({ url: `/product/marketing/export-excel`, params })
  }
}