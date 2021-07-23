import React, { lazy } from 'react'

/**
 * lazy声明必须写在全部import声明方式的下方
 */

//独立页
const Longin = lazy(() => import('@/views/Login'))

//公共页面
const Layout = lazy(() => import('@/layout'))
const Test = lazy(() => import('@/views/test'))

//路由格式自己怎么方便怎么来...
//本项目采用类似vue-router路由格式配置

export const staticRoute = [
  {
    path:"/login",
    component:Longin,
    hidden:true,
    meta:{
      title:"登录"
    }
  },
  {
    path: "/test1",
    component: Layout,
    meta: {
      title: '测试1'
    },
    children: [
      {
        path: "index1",
        component: Test,
        meta: {
          title: "测试2"
        },
        children:[
          {
            path: "index3",
            component: Test,
            meta: {
              title: "三级路由"
            },
            // hidden:true
          }
        ]
      },
      {
        path: "index4",
        component: Test,
        meta: {
          title: "测试4"
        },
      }
    ]
  },
  {
    path: "/test2",
    component: Layout,
    meta: {
      title: '测试2'
    },
    children: [
      {
        path: "index2",
        component: Test,
        meta: {
          title: "测试2"
        }
      }
    ]
  }
]

