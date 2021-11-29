import React from 'react';
 
export default class Editor extends React.Component {
    state = {
        ueEditor: null
    }
    componentDidMount() {
        this.initEditor()
    }
    initEditor(){
        const UE = window.UE;
        const {id} = this.props;
        if(id){
            try {
                UE.delEditor(id);
            } catch (error) { 

            }
            const ueEditor = UE.getEditor(id, {
                autoHeightEnabled: true,
                autoFloatEnabled: true,
                //配置菜单列表
                toolbars: [
                    ['fullscreen', 'source', 'undo', 'redo', 'bold']
                ],
                //字体大小
                'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36, 48],
                // 上传图片时后端提供的接口
                serverUrl: '',
                enableAutoSave: false,
                autoHeightEnabled: false,
                initialFrameHeight: this.props.height ? this.props.height : "400px",
                initialFrameWidth: '100%',
            }); 
            this.setState({ueEditor})
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
            //拓展功能
            UE.registerUI('button', function(editor, uiName) {    
                console.warn(editor, uiName)
                //注册按钮执行时的command命令，使用命令默认就会带有回退操作
                editor.registerCommand(uiName, {
                    execCommand: function() {
                        alert('execCommand:' + uiName)
                    }
                });
                //创建一个button
                var btn = new UE.ui.Button({
                    //按钮的名字
                    name: uiName,
                    //提示
                    title: uiName,
                    //添加额外样式，指定icon图标，这里默认使用一个重复的icon
                    cssRules: 'background-position: -500px 0;',
                    //点击时执行的命令
                    onclick: function() {
                        //这里可以不用执行命令,做你自己的操作也可
                        editor.execCommand(uiName);
                    }
                });
                //当点到编辑内容上时，按钮要做的状态反射
                editor.addListener('selectionchange', function() {
                    var state = editor.queryCommandState(uiName);
                    if (state == -1) {
                        btn.setDisabled(true);
                        btn.setChecked(false);
                    } else {
                        btn.setDisabled(false);
                        btn.setChecked(state);
                    }
                });
                //因为你是添加button,所以需要返回这个button
                return btn;
            });
        }
        
    }
 
    render() {
        const { id } = this.props;
        const styles = {
            width:"100%",
            height: this.props.height ? this.props.height : "400px" 
        }
        return (
        <div>
            <script type="text/plain" id={id} style={styles}></script>
            {/* <textarea id={id} style={styles}></textarea> */}
        </div>
        )
    }
}