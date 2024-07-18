import request from '@/config/axios'

// 国家配置 VO
export interface CountryConfigVO {
  id: number // 自增主键
  countryCode: string // 国家二字代码
  countryEn: string // 国家英文名称
  countryZh: string // 国家中文名称
  phoneCode: string // 电话代码
  phonePre: string // 电话前缀
  phoneMin: string // 电话最小长度
  phoneMax: string // 电话最大长度
  currency: string // 货币
}

// 国家配置 API
export const CountryConfigApi = {
  // 查询国家配置分页
  getCountryConfigPage: async (params: any) => {
    return await request.get({ url: `/trade/country-config/page`, params })
  },

  // 查询国家配置详情
  getCountryConfig: async (id: number) => {
    return await request.get({ url: `/trade/country-config/get?id=` + id })
  },

  // 新增国家配置
  createCountryConfig: async (data: CountryConfigVO) => {
    return await request.post({ url: `/trade/country-config/create`, data })
  },

  // 修改国家配置
  updateCountryConfig: async (data: CountryConfigVO) => {
    return await request.put({ url: `/trade/country-config/update`, data })
  },

  // 删除国家配置
  deleteCountryConfig: async (id: number) => {
    return await request.delete({ url: `/trade/country-config/delete?id=` + id })
  },

  // 导出国家配置 Excel
  exportCountryConfig: async (params) => {
    return await request.download({ url: `/trade/country-config/export-excel`, params })
  }
}