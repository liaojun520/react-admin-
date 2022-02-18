import React, { Component } from "react";
import Logo from "../logo";
import { staticRoute } from "@/router";
import { UserOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";

class SiderBar extends Component {
  state = {
    selectedKey: [], //选中菜单
    openKey: [], //张开菜单
    menuTreeNode: [], //路由菜单
  };
  render() {
    const { Sider, Menu, collapsed, onCollapse } = this.props;
    const { openKey, selectedKey, menuTreeNode } = this.state;
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => onCollapse(!collapsed)}
      >
        <Logo collapsed={collapsed} />
        {/*以路由地址为选中高亮 */}
        {menuTreeNode.map((item) =>(
          <Menu
          key={item.key}
          theme="dark"
          mode="inline"
          onSelect={(e) => this.handleMenuSelect(e)}
          // 默认张开菜单
          defaultOpenKeys={openKey}
          // 选中菜单
          selectedKeys={selectedKey}
        >
        {item}
        </Menu>
        ))}
      </Sider>
    );
  }
  componentDidMount() {
    this.init_menu();
  }
  // 组件(包含父子组件 自身)每次rendering之前被调用
  static getDerivedStateFromProps(nextProps, prevState) { 
    const { pathname } = nextProps.history.location;
    const { selectedKey } = prevState
    const isInclude = selectedKey.find((item)=> item === pathname)
    // 初始化选中菜单
    if(!isInclude){ 
      return ({...prevState,selectedKey:[...selectedKey,pathname]})
    }
    return null
  }
  // 路由菜单转为dom
  init_menu() {
    const menu = this.menuTabs(staticRoute);
    this.setState({ menuTreeNode: [...menu] });
  }
  // 递归遍历菜单生成对应的dom
  menuTabs(list = []) {
    const { Menu } = this.props;
    const { SubMenu } = Menu;
    const { pathname } = this.props.history.location;
    return list.reduce((pre, item) => {
      // 如果没有隐藏才需要渲染
      if (!item.hidden) {
        // 判断如果没有children，直接push
        if (!item.children) {
          const dom = (
            <Menu.Item
              key={item.path}
              icon={item.meta.icon && <UserOutlined />}
            >
              <Link className="tab_link" to={item.path}>
                {item.meta.title}
              </Link>
            </Menu.Item>
          );
          pre.push(dom);
        } else {
          // 如果有children 首先考虑该多级菜单组的每个菜单是否都隐藏 是的话不用处理
          let isAllHidden = this.isAllHidden(item.children, item);
          if (!isAllHidden) {
            // 再判断多级菜单初始化状态菜单是否需要张开
            const flag = item.children.find(
              (itm) => pathname.indexOf(itm.path) === 0
            );
            if (flag) {
              this.setState((state) => {
                return ({
                  openKey: [...state.openKey, item.path],
                })
              });
            }
            // 再处理多级菜单
            const dom = (
              <SubMenu
                key={item.path}
                icon={<UserOutlined />}
                title={item.meta.title}
              >
                {this.menuTabs(item.children)}
              </SubMenu>
            );
            pre.push(dom);
          }
        }
      }
      return pre;
    }, []);
  }
  // 判断多级菜单的子菜单是否都为隐藏，如果是，则不展示多级菜单
  isAllHidden(children = []) {
    let flag = true;
    children.forEach((item) => {
      if (!item.hidden) {
        flag = false;
      }
    });
    return flag;
  }
  // 选中菜单 也是一个数组集合
  handleMenuSelect(e) {
    const key = Array.of(e.key);
    this.setState({ selectedKey: [...key] });
  }
}

export default withRouter(SiderBar);
