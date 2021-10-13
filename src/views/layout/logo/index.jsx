import React from "react"

const Logo = (props)=>{
  let {collapsed} = props
  const img = "/images/logo.svg"
  return(
    <div className="logo">
        <img src={img} alt=""/>
        {!collapsed && <span>React-admin</span>}
    </div>
  )
}


export default Logo