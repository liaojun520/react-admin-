import {addListeners} from "./common"

/**
 * @param {object} UE ueEditor实例
 * @param {object} _this 父组件实例
 */
 export function test(UE,_this) {
  if (UE) {
    UE.registerUI('button', function (editor, uiName) {      //uiName ==>>> 'button'
      //注册按钮执行时的command命令，使用命令默认就会带有回退操作
      editor.registerCommand(uiName, {
        execCommand: function () {
          editor.execCommand('inserthtml', "测试", true)
        }
      });
      //创建一个button
      var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "扩展菜单测试",
        //自定义菜单图标设置，根据background-position位置设置UE的默认图标，不同的x轴跟y轴的背景图不一样
        cssRules: 'background-position: -726px -77px;',
        //也可以自己选择菜单样式
        // cssRules: 'background: url(' + 图片路径 + ') !important; background-size: 20px 20px !important;',
        //点击时执行的命令
        onclick: function () {
          //这里可以不用执行命令,做你自己的操作也可
          //执行command命令
          // editor.execCommand(uiName);
          editor.execCommand('inserthtml', "[标识符]", true)
          //自定义命令
          _this.setState({a:2})
        }
      });
      //当点到编辑内容上时，按钮要做的状态反射
      addListeners(editor,uiName,btn)
      //因为你是添加button,所以需要返回这个button
      return btn;
    });
  }
}


