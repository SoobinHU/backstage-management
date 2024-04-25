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
                    component:Home
                },
                {//用户管理
                    path:'user',
                    component:User
                },
                {//商品管理
                    path:'mall',
                    component:Mall
                },
                {//页面一
                    path:'page1',
                    component:PageOne
                },
                {//页面二
                    path:'page2',
                    component:PageTwo
                },
            ]
        },    
    ]
 })

 //暴露路由
 export default router

