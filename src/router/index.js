
import { lazy} from "react"


//静态路由菜单
export const staticRoute = [
  {
    path: "/home",
    component: "home/index.jsx",
    meta: {
      title: '首页',
      icon:true
    },
  },
  {
    path: "/test1",
    meta: {
      title: '多级菜单'
    },
    children: [
      {
        path: "/test1/index1",
        component: "test1",
        meta: {
          title: "测试2"
        },
        children:[
          {
            path: "/test1/index1/index3",
            component: "test",
            meta: {
              title: "三级路由"
            },
            // hidden:true
          }
        ]
      },
      {
        path: "/test1/index4",
        component: "test",
        meta: {
          title: "测试4"
        },
      }
    ]
  },
  {
    path: "/test2",
    meta: {
      title: '测试2'
    },
    children: [
      {
        path: "/test2/index2",
        component: "test",
        meta: {
          title: "测试2"
        }
      }
    ]
  },
  {
    path: "/test3",
    component: "confirm",
    meta: {
      title: '路由跳转二次确认',
      icon:true
    },
  },
  {
    path:'/excel',
    component:"excel",
    meta:{
      title:"excel",
      icon:true
    }
  }
]

//菜单降维
function getRouter(staticRoute = [],ary = []){
  staticRoute.forEach((item) => {
    let obj = JSON.parse(JSON.stringify(item)) 
    delete obj["children"]
    if(obj.component){
      ary.push(obj)
    }
    if(item.children){
      getRouter(item.children,ary)
    }
  })
  return ary
}

//菜单component处理
function setRoute(router=[]){
  router.forEach(item=>{
    let filename = item.component
    if(filename){
      item.component = lazy(() => import(`@/views/${filename}`));
    }
  })
  return router
}
let router = getRouter(staticRoute) 
router = setRoute(router)

export default router

