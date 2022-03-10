import React, { Component } from "react";
import { Prompt } from "react-router-dom";
import { connect } from "react-redux";
import { Checkbox } from "antd";
import { setChange } from "@/store/actions";

class Confirm extends Component {
  checked = (ev) => {
    this.props.setChange(ev.target.checked);
  };
  render() {
    return (
      <div>
        <h1>
          修改是否保存：{this.props.isChange ? "未保存" : "已保存"}&nbsp;&nbsp;&nbsp;&nbsp;
          <Checkbox  onChange={this.checked} />
        </h1>
        <Prompt
          when={this.props.isChange}
          message={() => (!this.props.isChange ? true : "有修改尚未保存，确定要离开页面吗？")}
        />
      </div>
    );
  }
}

export default connect((state) => ({ isChange: state.settings.isChange }), {
  setChange: setChange,
})(Confirm);
