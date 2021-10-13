import React from "react"
import Login from "./login"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"


//登录了，登录页重定向到首页
const LoginDom = (props) => {
  const {token} = props
  if(token){
    return <Redirect to="/" />
  }
  return <Login/>
}


export default connect(state=>state.user)(LoginDom)