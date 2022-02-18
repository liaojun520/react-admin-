import React,{useEffect} from "react"
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { Spin } from "antd";

const Loading = ()=>{
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);
  return(
    <div>
      <Spin/>
    </div>
  )
}

export default Loading