import React,{ lazy,Suspense} from 'react'
import { Button } from 'antd';
import {BrowserRouter,Route, Switch, Redirect} from "react-router-dom"

import Layout from './layout';
import Loading from './components/loading'
 


function AppContent() {
  // BrowserRouter history模式  HashRouter //hash模式
  return (
    <BrowserRouter>  
      <div className="App">
        <Switch>
           <Layout/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}


function App(){
  return( 
    <Suspense fallback={<Loading/>}>
        <AppContent/>
    </Suspense>
  )
}

export default App;
