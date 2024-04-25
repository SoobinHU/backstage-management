<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>通用后台管理系统</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
                                                                    <!-- index为选项的索引标识 -->
        <!-- 图标 -->
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<style lang="less" scoped>
// 采用less语法
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
    // vh : 相对于视口的高度， 1vh 等于视口高度的1%（总视口高度为100vh）
    height: 100vh;
    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
    }
}
</style>

<script>
export default {
  data() {
    return {
      //控制导航栏是否展开
      isCollapse: false,
      menuData: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
        //解决重复跳转报错问题：在使用(编程式路由)跳转页面时候，参数不变，重复点击菜单引起路由报错
        // 原因：由于vue-router 最新版本引入Promise，而Promise的回调函数resolve和reject，必须传其中一个，否则会报错
        //解决方案：逻辑判断
        //只有当当前路径和跳转路径不同时，发生跳转，
        //在home下由于重定向设置也不跳转‘/’路径
        // console.log(item)
        if(this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path ==='/'))){
             this.$router.push(item.path)
        }
    }
  },
  computed:{
    //有下拉子菜单
    hasChildren(){
        return this.menuData.filter((item)=> item.children)
    },
    //没有下拉子菜单
    noChildren(){
        return this.menuData.filter((item)=> !item.children)
    }
  }
};
</script>