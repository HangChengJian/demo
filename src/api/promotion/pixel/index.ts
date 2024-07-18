import request from '@/config/axios'

// 广告像素 VO
export interface PixelVO {
  id: number // id
  pixelId: number // 像素id
  accessToken: string // 像素token
  type: number // 像素类型：1Facebook 2Snap 3Tiktok
  remark: string // 备注
}

// 广告像素 API
export const PixelApi = {
  // 查询广告像素分页
  getPixelPage: async (params: any) => {
    return await request.get({ url: `/promotion/pixel/page`, params })
  },

  // 查询广告像素详情
  getPixel: async (id: number) => {
    return await request.get({ url: `/promotion/pixel/get?id=` + id })
  },

  // 新增广告像素
  createPixel: async (data: PixelVO) => {
    return await request.post({ url: `/promotion/pixel/create`, data })
  },

  // 修改广告像素
  updatePixel: async (data: PixelVO) => {
    return await request.put({ url: `/promotion/pixel/update`, data })
  },

  // 删除广告像素
  deletePixel: async (id: number) => {
    return await request.delete({ url: `/promotion/pixel/delete?id=` + id })
  },

  // 导出广告像素 Excel
  exportPixel: async (params) => {
    return await request.download({ url: `/promotion/pixel/export-excel`, params })
  }
}