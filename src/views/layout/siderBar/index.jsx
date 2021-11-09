import React, { useState, useEffect } from "react"
import Logo from "../logo"
import { staticRoute } from "@/router"
import { UserOutlined } from '@ant-design/icons';
import { Link, withRouter } from "react-router-dom"

const SiderBar = (props) => {
  const { Sider, Menu, collapsed, onCollapse } = props
  const { SubMenu } = Menu;
  const { pathname } = props.history.location
  const [selectedKey, setSelectedKey] = useState(Array.of(pathname))  //初始选中菜单
  const [openKey, setOpenKey] = useState([])  //张开菜单
  const [menuTreeNode, setMenuTreeNode] = useState(() => [])
  useEffect(() => {
    const menu = menuTabs(staticRoute)
    setMenuTreeNode(menu)
  }, [])
  useEffect(() => {
    // console.error(openKey, "openKey")
  },[openKey])

  // 递归遍历菜单
  function menuTabs(list) {
    if (list.length > 0) {
      return list.map(item => {
        if (item.hidden) { //隐藏菜单
          return null
        } else if (item.children) {//多级菜单
          let isHidden = isAllHidden(item.children, item)
          if (isHidden) {
            return null
          }
          //如果路由存在path字段,说明是要张开的菜单
          if (pathname.indexOf(item.path) !== -1) {
            const flag = openKey.find(
              itm => itm === item.path
            );
            if (!flag && item.path) {
              setOpenKey(val => {
                val.push(item.path)
                return val
              })
            }
          }
          return (
            <SubMenu key={item.path} icon={<UserOutlined />} title={item.meta.title}>
              {
                menuTabs(item.children)
              }
            </SubMenu>
          )
        }
        //单级菜单 注意：必须 Menu.Item包裹Link标签，不然会报错
        return (
          <Menu.Item key={item.path} icon={item.meta.icon && <UserOutlined />}>
            <Link className="tab_link" to={item.path}>
              {item.meta.title}
            </Link>
          </Menu.Item>
        )
      })
    } else {
      return null
    }
  }




  return (
    <Sider collapsible collapsed={collapsed} onCollapse={() => onCollapse(!collapsed)}>
      <Logo collapsed={collapsed} />
      <Menu
        theme="dark"
        mode="inline"
        onSelect={(e) => handleMenuSelect(e)}
        defaultOpenKeys={openKey} //默认张开菜单
        selectedKeys={selectedKey} //选中菜单
      > {/*以路由地址为选中高亮 */}
        {
          menuTreeNode.map(item => item)
        }
      </Menu>
    </Sider>
  )

  //判断多级菜单的子菜单是否都为隐藏，如果是，则不展示多级菜单
  function isAllHidden(children = []) {
    let flag = true
    children.forEach(item => {
      if (!item.hidden) {
        flag = false
      }
    })
    return flag
  }

  //选中菜单 ==> 也是一个数组集合
  function handleMenuSelect(e) {
    const key = Array.of(e.key)
    setSelectedKey(key)
  }


}


export default withRouter(SiderBar)








