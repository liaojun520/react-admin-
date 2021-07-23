import React,{lazy} from "react"
import {Route,Switch} from "react-router-dom"

const Test = lazy(() => import('@/views/test'))


const Contents = (props)=>{
  const {Content} = props
  return(
    <Content className="content">
      <div className="site-layout-background">
        <Switch>
          <Route path="/test1/index4"  component={Test} />
        </Switch>
      </div>
    </Content>
  )
}


export default Contents