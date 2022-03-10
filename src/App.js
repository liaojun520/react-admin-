import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { ConfigProvider } from "antd";
import 'moment/locale/zh-cn';
import zhCN from "antd/es/locale/zh_CN";  //antd组件汉化
import {connect} from "react-redux"
import Loading from "@/components/loading"
import Layout from "@/views/layout"


const Login = lazy(() => import("@/views/login"))
const Error = lazy(() => import("@/components/error"))

function AppContent(props) {
  // BrowserRouter history模式  HashRouter //hash模式
  const {token} = props;
  return (
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/404" component={Error} />
          <Route
            path="/"
            render={() => {
              if (token) {
                return <Layout />
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
        </Switch>
      </ConfigProvider>
    </BrowserRouter>
  );
}

//react-redux把state属性转为props
function App(props) {
  const {token} = props
  return (
    <Suspense fallback={<Loading />}>
      <AppContent token={token} />
    </Suspense>
  )
}

export default connect(state =>state.user)(App);

/**
 * lazy懒加载必须跟 Suspense组件配套使用
 */


