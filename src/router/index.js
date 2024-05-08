import Vue from "vue"
//引入VueRouter
import VueRouter from "vue-router"
import Main from '../view/Main'
import Home from '../view/Home'
import User from '../view/User'
import Mall from '../view/Mall'
import PageOne from '../view/PageOne'
import PageTwo from '../view/PageTwo'

//应用VueRouter
Vue.use(VueRouter)

//创建路由
 const router = new VueRouter({
    routes:[
        {
            path:'/',
            component:Main,
            // 重定向
            redirect:'/home',
            children:[
                {//首页
                    path:'home',
                    name:'home',
                    component:Home
                },
                {//用户管理
                    path:'user',
                    name:'user',
                    component:User
                },
                {//商品管理
                    path:'mall',
                    name:'mall',
                    component:Mall
                },
                {//页面一
                    path:'page1',
                    name:'page1',
                    component:PageOne
                },
                {//页面二
                    path:'page2',
                    name:'page2',
                    component:PageTwo
                },
            ]
        },    
    ]
 })
// 解决 Vue 路由传递参数时，出现 Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation 问题 .
//添加以下代码
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
 //暴露路由
 export default router

