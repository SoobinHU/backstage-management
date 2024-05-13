import Cookie from "js-cookie"
export default {
    state:{
        isCollapse:false ,//用于控制菜单是展开还是收起
        tabsList:[
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
              }
        ],//面包屑数据
        menu:[]
    },
    actions:{
        selectMenu(context,val){
            // console.log(111111)
            //判断是否为首页 若为首页无需做操作
            if(val.name !== 'home'){
                const index = context.state.tabsList.findIndex(item =>item.name === val.name)
                //如果不存在 index 返回-1
                if(index === -1){
                    context.commit('SELECTMENU',val)
                }
            }
        }
    },
    mutations:{
        //修改isCollapse
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据
        SELECTMENU(state,val){
            // console.log(222222)
            state.tabsList.push(val)
        },
        //删除tag数据
        closeTag(state,item){
            // console.log(item)
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index,1)
            
        },
        setMenu(state,val){
            state.menu = val
            //存入cookie 避免因为页面刷新丢失数据
            Cookie.set('menu',JSON.stringify(val))
        },
        //动态注册路由
        addMenu(state,router){
            //判断缓存中是否有数据
            if(!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            //组装动态路由的数据
            const menuArray = []
            menu.forEach(item =>{
                //是否有子路由
                if(item.children){
                    item.children = item.children.map(item =>{
                        //添加component属性 引入组件
                        item.component = () => import(`../view/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }
                //没有子路由
                else{
                    item.component = () => import(`../view/${item.url}`)
                    menuArray.push(item)
                }
            })
            console.log(menuArray,'menuArray')
            //动态添加路由
            menuArray.forEach(item =>{
                router.addRoute('Main',item)
            })
        }
    }
}

//用VUEX的state要注意层级