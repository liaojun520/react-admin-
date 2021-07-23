import React from "react"
import Logo from "../logo"
import { staticRoute } from "@/router"
import { UserOutlined } from '@ant-design/icons';
import path from 'path'
import {Link} from "react-router-dom"

const SiderBar = (props) => {
  const { Sider, Menu, collapsed, onCollapse } = props
  const { SubMenu } = Menu;
  // 递归遍历
  const menuTabs = (list,basePath) => {
    if(list.length>0){
      return list.map((item, index) => {
        if(item.hidden){ //隐藏菜单
            return null
        }else if (item.children) {//多级菜单
          let isHidden = isAllHidden(item.children,item)
          if(isHidden){
             return null
          }
          return <SubMenu key={resolvePath(basePath,item.path)} icon={!basePath && <UserOutlined />} title={item.meta.title}>
            {
              menuTabs(item.children,resolvePath(basePath,item.path))
            }
          </SubMenu>
        } 
        //单级菜单 注意：必须 Menu.Item包裹Link标签，不然会报错
        return <Menu.Item key={resolvePath(basePath,item.path)}>
          <Link className="tab_link" to={resolvePath(basePath,item.path)}>
            {item.meta.title}
          </Link>
        </Menu.Item>
      })
    }else{
      return null
    }
  }
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={() => onCollapse(!collapsed)}>  {/* 针对不用处理的数据，直接返回给父组件即可 */}
      <Logo collapsed={collapsed}/>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["/test"]}>
        {
          menuTabs(staticRoute)
        }
      </Menu>
    </Sider>
  )

  //判断多级菜单的子菜单是否都为隐藏，如果是，则不展示多级菜单
  function isAllHidden(children=[]){
    let flag = true
    children.forEach(item=>{
      if(!item.hidden){
        flag = false
      }
    })
    return flag
  } 
  //path转化
  function resolvePath(basePath,routePath="") {
    if(basePath){
      if (isExternal(basePath)) {
          return basePath
      }
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(basePath, routePath)
    }
    return routePath     //如果没有basePath 说明首节path 直接返回
  }
  //判断path是否为 https http开头
  function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }

}


export default SiderBar








