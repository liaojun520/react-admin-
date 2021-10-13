import React from "react"
import "./style.less"
import SiderBar from "./siderBar"
import Headers from "./header"
import Nav from "./nav"
import Contents from "./content"
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;




class LayoutDom extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ height: '100vh' }}>
        {/* 左侧菜单 */}
        <SiderBar Sider={Sider} Menu={Menu} collapsed={collapsed} onCollapse={this.onCollapse}/>
        <div className="main_right">
          {/* 头部 */}
          <Headers Header={Header}/>
          <div className="main_box">
            {/* 导航 */}
            <Nav Breadcrumb={Breadcrumb}/>
            {/* 主题内容 */}
            <Contents Content={Content}/>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </div>
        </div>
      </Layout>
    );
  }
}

export default LayoutDom



