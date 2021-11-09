import * as types from "../action-types"

//小于600 左侧菜单默认收缩
const clientWidth = document.documentElement.clientWidth


const initialState = {
  collapsed: clientWidth>600 ? false :true,
}

export default function settings(state = initialState,action){
   switch(action.type){
     case types.COLLAPSED_SETTINGS:
       return{
          ...state,
          collapsed:action.collapsed
       };
     default: return state;
   }
}