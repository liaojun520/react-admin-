import React from "react"
import { Route, Switch, withRouter, Redirect } from "react-router-dom"
import router from "@/router"

const Contents = (props) => {
  const { Content } = props

  return (
    <Content className="content">
      <div className="site-layout-background">
        {/* layout组件的路由列表 */}
        <Switch>
          <Redirect exact from="/" to="/home" />
          {
            router.map(item => <Route key={item.path} path={item.path} component={item.component} />)
          }
          <Redirect to="/404" />
        </Switch>
      </div>
    </Content>
  )
}


export default Contents