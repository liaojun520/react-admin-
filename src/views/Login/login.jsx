import React from "react"
import "./index.less"
import { Form, Input, Button, message, Spin } from "antd";
import { LockOutlined, UserOutlined} from '@ant-design/icons';
import {userLogin} from "@/ajax/api"
import {connect} from "react-redux"
import {setUserToken} from "@/store/actions"
class Login extends React.Component{
  state = {
    loading:false,
  }
  formRef = React.createRef()
  userRef = React.createRef()
  passRef = React.createRef()
  render(){
    const { loading } = this.state;
    return(
      <div className="login">
        <Form 
          ref={this.formRef}
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 6 }}
          initialValues={{ username:"admin",password:"123456" }}  //表单默认值
          className="form"
        >
          <div className="title">
            <h2 style={{fontSize:"18px",marginBottom:"10px"}}>用户登录</h2>
          </div>
          <Spin spinning={loading} tip="登录中...">
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                ref={this.userRef}
                size="large"
                prefix={
                  <UserOutlined className="site-form-item-icon" />
                }
                placeholder="请输入用户名"
                onPressEnter={this.onPressUser}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { 
                  required: true, 
                  message: '请输入密码' 
                },
                {
                  max: 16,
                  message: '密码至多16位',
                },
               {
                  min: 6,
                  message: '密码至少6位',
               },                                
               {
                  pattern: /^[A-Za-z\d_]+$/,
                  message: '密码只能包含大小写字母,数字,下划线',
               }
            ]}
            >
              <Input
                ref={this.passRef}
                size="large"
                prefix={
                  <LockOutlined className="site-form-item-icon" />
                }
                type="password"
                placeholder="请输入密码"
                onPressEnter={this.onPressPass}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 0, span: 6 }}>
              <Button className="button" type="primary" htmlType="submit" size="large" onClick={this.handleSubmit}>
                登录
              </Button>
            </Form.Item>
          </Spin>
        </Form>
      </div>
    )
  }
  componentWillUnmount(){
    clearTimeout(this.timer)
  }
  //用户名回车键回调
  onPressUser = () => {  
    this.userRef.current.blur()
    this.passRef.current.focus()
  }
  //密码回车键回调
  onPressPass = (event) => {
    this.passRef.current.blur()
    this.handleSubmit(event)
  }
  handleSubmit = (event) => {
    const _this = this;
    // 阻止事件的默认行为
    event.preventDefault();
    // 对所有表单字段进行检验
    this.formRef.current.validateFields()
     .then(res=>{
      _this.setState({loading:true})
      const data = this.formRef.current.getFieldValue()
      userLogin(data).then(r=>{
        if(r.code===0){
           _this.timer = setTimeout(()=>{
             if(r.data.token){
              const {token} = _this.props.setUserToken(r.data.token)
              _this.setState({loading:false},()=>{
                _this.props.history.push('/home')
              })
             }
           },1000)
        }
      })
     })
     .catch(_=>{
       message.error("请输入正确格式的账号或密码")
     })
  }

}


export default connect(state => state.user,{setUserToken})(Login)

/**
 * connect作用：把state,dispatch函数转为 当前组件的props上 
 * dispatch 分同步和异步
 */