import axios from 'axios' 
import { message } from 'antd';
import Store from "@/store"



const state = Store.getState()
const service = axios.create({
  baseURL:process.env.REACT_APP_BASE_API,
  timeout: 20000
})
service.interceptors.request.use(
  config => {
    const token = state.user.token;
    if(token){
      config.headers['token'] = token 
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.type === "multipart/form-data") { 
      return response
    }else if (res.code !== 0 && res.code !=='-1') {
      if (res.code === 1010) {  //登录失效特有的code
        message.error('登录失效');
        return false
      }
      message.error(res.message);
      console.error('异常接口详情=>',response);
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    message.error('This is an error message');
    return Promise.reject(error)
  }
)

export default service
