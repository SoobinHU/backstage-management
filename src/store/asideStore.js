export default {
    state:{
        isCollapse:false //用于控制菜单是展开还是收起
    },
    mutations:{
        //修改isCollapse
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        }
    }
}