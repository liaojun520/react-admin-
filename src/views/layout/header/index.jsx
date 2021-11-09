import React from "react"
import SvgIcon from "@/icons/svgIcon"
import {connect} from "react-redux"
import {setCollapsed} from "@/store/actions"

const Headers = (props)=>{
  const {Header,collapsed} = props
  return(
    <Header className="header">
      <div onClick={onCollapse}>
        <SvgIcon icon="navBtn" className="navBtn" />
      </div>
    </Header>
  )
  function onCollapse(){
    props.setCollapsed(!collapsed)
  }
}


export default connect(state=>state.settings,{setCollapsed})(Headers)