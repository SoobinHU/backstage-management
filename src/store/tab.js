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
        ]//面包屑数据
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
            
        }
    }
}

//用VUEX的state要注意层级