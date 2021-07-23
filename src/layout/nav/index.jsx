import React from "react"

const Nav = (props) => {
  const {Breadcrumb} = props
  return (
    <Breadcrumb style={{ margin: '12px 16px' }}>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item>
    </Breadcrumb>
  )
}


export default Nav