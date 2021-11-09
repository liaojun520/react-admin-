// import qs from 'qs' // npm install qs
import request from './request'

// //登录失效测试接口  /user/check_login
// export function check_login(data) {
//     return request({
//       url: '/user/check_login?'+qs.stringify(data),
//       method: 'get',
//     //   params: { data }  --get请求 携带参数方式二    post请求携带参数方式只有一种： data:{...}
//     })
//   }

//excel的增删改查
export function tableList(data) {
  return request({
    url: '/table/list',
    method: 'post',
    data
  })
}

export function deleteItem(data) {
  return request({
    url: '/table/delete',
    method: 'post',
    data
  })
}
export function editItem(data) {
  return request({
    url: '/table/edit',
    method: 'post',
    data
  })
}

//用户登录
export function userLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
