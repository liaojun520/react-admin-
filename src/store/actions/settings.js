import * as types from "../action-types"

export const setCollapsed = collapsed => ({
  collapsed,
  type:types.COLLAPSED_SETTINGS
})