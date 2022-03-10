import * as types from "../action-types"

// 设置菜单栏的张合
export const setCollapsed = collapsed => ({
  collapsed,
  type:types.COLLAPSED_SETTINGS
})

// 设置全局修改状态
export const setChange = isChange => ({
  isChange,
  type:types.CHANGE_SETTINGS
})

