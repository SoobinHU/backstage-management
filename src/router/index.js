import Vue from "vue"
//引入VueRouter
import VueRouter from "vue-router"
import Main from '../view/Main'
import Home from '../view/Home'
import User from '../view/User'

//应用VueRouter
Vue.use(VueRouter)

//创建路由
 const router = new VueRouter({
    routes:[
        {
            path:'/',
            component:Main,
            children:[
                {
                    path:'home',
                    component:Home
                },
                {
                    path:'user',
                    component:User
                }
            ]
        },    
    ]
 })

 //暴露路由
 export default router

