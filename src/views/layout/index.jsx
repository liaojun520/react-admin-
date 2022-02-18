import React from "react"
import "./style.less"
import SiderBar from "./siderBar"
import Headers from "./header"
// import Nav from "./nav"
import Contents from "./content"
import { Layout, Menu} from 'antd';
import {connect} from "react-redux"

class LayoutDom extends React.Component {
  render() {
    console.log('render...')
    const { collapsed } = this.props;
    const { Header, Content, Sider } = Layout;
    return (
      <Layout style={{ height: '100vh' }}>
        {/* 左侧菜单 */}
        <SiderBar Sider={Sider} Menu={Menu} collapsed={collapsed}/>
        <div className="main_right">
          {/* 头部 */}
          <Headers Header={Header}/>
          <div className="main_box">
            {/* 导航 */}
            {/* <Nav Breadcrumb={Breadcrumb}/> */}
            {/* 主题内容 */}
            <Contents Content={Content}/>
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect(state=>state.settings)(LayoutDom) 



