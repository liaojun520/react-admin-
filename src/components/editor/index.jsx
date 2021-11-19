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
                //字体大小
                'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36, 48],
                // 上传图片时后端提供的接口
                serverUrl: '',
                enableAutoSave: false,
                // eslint-disable-next-line no-dupe-keys
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