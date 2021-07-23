import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./style/index.less"

ReactDOM.render(
  // <React.StrictMode模式使用antd会异常报错
  // <React.StrictMode>     
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);
