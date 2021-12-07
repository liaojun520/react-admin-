
//编辑器编辑时，按钮反射状态
/**
 * @param {Object} editor 
 * @param {String} uiName 
 * @param {Object} btn 
 */
export function addListeners(editor,uiName,btn){
  editor.addListener('selectionchange', function () {
    var state = editor.queryCommandState(uiName);
    if (state-0 === -1) {
      btn.setDisabled(true);
      btn.setChecked(false);
    } else {
      btn.setDisabled(false);
      btn.setChecked(state);
    }
  });
}