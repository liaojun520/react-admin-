import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./style/index.less"
import "./mock";
import store from "./store" //给全局提供Store
import {Provider} from 'react-redux'
import './icons'  //引入icons
import 'default-passive-events'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


