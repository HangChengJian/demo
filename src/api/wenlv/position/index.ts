import request from '@/config/axios'

// 点位 VO
export interface PositionVO {
  id: number // id
  title: string // 点位名称
  isTop: number // 是否推荐 0不推荐 1推荐
  status: number // 1是正常,0是下架
  width: number // 宽度
  height: number // 高度
  latitude: number // 纬度
  longitude: number // 经度
  agencyId: number // 从属机构的id
  type: number // 点位的类型id
  icon: string // 图标对应的附件id
  cover: string // 封面对应的附件id
  description: string // 文字描述
  menuName: string // 子菜单名称
  signIn: string // 是否打卡点位0否， 1是
  getPoints: number // 打卡赠送的积分
  sHeight: string // 身高限制
  sAge: string // 年龄限制
  sPerformanceCategory: string // 演出类别
  sPrice: string // 价格区间
  sCuisineKind: string // 菜系
  sThrillLevel: string // 惊险种类
  sWaitTime: string // 等待时间
  sOpenTime: string // 开放时间
  sLocation: string // 街道或区域
  sMatters: string // 注意事项
  signboardCuisine: string // 招牌菜
  saleGoods: string // 出售商品
  playTime: string // 游玩时间
}

// 点位 API
export const PositionApi = {
  // 查询点位分页
  getPositionPage: async (params: any) => {
    return await request.get({ url: `/wenlv/position/page`, params })
  },

  // 查询点位详情
  getPosition: async (id: number) => {
    return await request.get({ url: `/wenlv/position/get?id=` + id })
  },

  // 新增点位
  createPosition: async (data: PositionVO) => {
    return await request.post({ url: `/wenlv/position/create`, data })
  },

  // 修改点位
  updatePosition: async (data: PositionVO) => {
    return await request.put({ url: `/wenlv/position/update`, data })
  },

  // 删除点位
  deletePosition: async (id: number) => {
    return await request.delete({ url: `/wenlv/position/delete?id=` + id })
  },

  // 导出点位 Excel
  exportPosition: async (params) => {
    return await request.download({ url: `/wenlv/position/export-excel`, params })
  }
}
