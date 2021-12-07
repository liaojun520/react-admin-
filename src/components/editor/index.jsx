import React from 'react';
import { test } from "./test"
import Inputs, { setInputs } from "./input"
export default class Editor extends React.Component {
  state = {
    ueEditor: null,
    a: 1,
    showInputs: false
  }
  componentDidMount() {
    this.initEditor()
  }
  componentDidUpdate() {
  }
  componentWillUnmount(){
    //销毁UE组件
    const UE = window.UE;
    const { id } = this.props;
    try { UE.delEditor(id); } catch (error) { }
  }
  //初始化
  initEditor() {
    const UE = window.UE;
    const { id } = this.props;
    if (id && UE) {
      //------自定义菜单必须在创建实例前挂载------
      test(UE,this)
      setInputs(UE,this)
      //------创建实例------
      const ueEditor = UE.getEditor(id, {
        //配置菜单列表
        toolbars: [
          ['fullscreen', 'source', 'undo', 'redo'],
          [
            'bold', 'italic', 'underline', 'strikethrough', 'horizontal', '|',
            'forecolor', 'backcolor', '|',
            'paragraph', 'fontfamily', 'fontsize', 'lineheight', '|',
            'insertorderedlist', 'insertunorderedlist', '|',
            'removeformat', 'blockquote', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
            'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', '|',
          ]
        ],
        //字体大小
        'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36, 48],
        // 上传图片时后端提供的接口
        serverUrl: '',
        //编辑器高度
        initialFrameHeight: this.props.height ? this.props.height : 400,
        //编辑器宽度
        initialFrameWidth: '100%',
      });
      this.setState({ ueEditor })
      //判断有没有默认值
      ueEditor.ready((ueditr) => {
        const value = this.props.content || "";
        ueEditor.setContent(value);
      });
      //将文本回调回去
      ueEditor.addListener('selectionchange', (type) => {
        const value = ueEditor.getContent()
        this.props.callback(value);
      });
      //清空富文本内容
      //this.refs.ueditor.changeContent("");
    }
  }
  //超链接回显
  setIsModalVisible = (val) => {
     this.setState({showInputs:false})
     if(val && val.dom){
       this.state.ueEditor.execCommand('inserthtml',val.dom, true)
     }
  }
  render() {
    const { id } = this.props;
    const { showInputs } = this.state
    const styles = {
      width: "100%"
    }
    return (
      <div>
        <script type="text/plain" id={id} name={id} style={styles} />
        {/* 自定义弹窗组件 */}
        <Inputs showInputs={showInputs} setIsModalVisible={this.setIsModalVisible}/>
      </div>
    )
  }
}