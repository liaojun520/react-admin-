import * as types from "../action-types"


const clientWidth = document.documentElement.clientWidth
const initialState = {
  collapsed: clientWidth>600 ? false :true,
  isChange:false
}

const {COLLAPSED_SETTINGS,CHANGE_SETTINGS} = types

export default function settings(state = initialState,action){
  const {collapsed,isChange} = action
   switch(action.type){
      // 菜单张合
      case COLLAPSED_SETTINGS:
        return{
            ...state,
            collapsed
        };
      // 是否修改
      case CHANGE_SETTINGS:
        return {
          ...state,
          isChange
        }
      default: return state;
   }
}

