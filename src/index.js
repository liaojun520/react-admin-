import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./style/index.less"
import "./mock";
import store from "./store" //给全局提供Store
import {Provider} from 'react-redux'

ReactDOM.render(
  // <React.StrictMode模式使用antd会异常报错
  // <React.StrictMode> 
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
