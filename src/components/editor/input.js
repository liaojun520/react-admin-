import React, { PureComponent } from 'react'
import { Modal, Input } from 'antd';
import { addListeners } from "./common"

export default class Inputs extends PureComponent {
  state = {
    value:null,
    text:null
  }
  componentDidMount(){
    // console.log("执行了")
  }
  static getDerivedStateFromProps(nextProps, prevState) { //组件(包含父子组件，自身)每次re-rendering之前被调用
    //每次showInputs为false时,切state的参数不为null时重置state
    if(!nextProps.showInputs && ( prevState.value || prevState.text )){ 
      return ({...prevState,value:'',text:""})
    }
    return null   // 否则，对于state不进行任何操作
  }
  handleOk = () => {
    const { value,text } = this.state;
    const dom = `<a href="https://${value}" target="_blank">${text}</a>`
    this.props.setIsModalVisible({dom})
  }
  render() {
    const { showInputs, setIsModalVisible } = this.props
    const { value,text } = this.state;
    return (
      <div>
        <Modal title="请输入超链接" visible={showInputs} onOk={this.handleOk} onCancel={() => setIsModalVisible()}>
          <Input addonBefore="内容" onChange={(e) => this.setState({text:e.target.value})} value={text} />
          <br/>
          <br/>
          <Input addonBefore="https://" onChange={(e) => this.setState({value:e.target.value})} value={value} />
        </Modal>
      </div>
    )
  }
}

//自定义设置
export function setInputs(UE, _this) {
  if (UE) {
    UE.registerUI('drag', function (editor, uiName) {
      var btn = new UE.ui.Button({
        name: uiName,
        title: "超链接菜单测试",
        cssRules: 'background-position: -500px 0;',
        onclick: function () {
          _this.setState({ showInputs: true })
        }
      });
      addListeners(editor, uiName, btn)
      return btn;
    });
  }
}



