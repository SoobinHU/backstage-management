<template>
  <div class="header-container">
    <!-- 左侧 -->
    <div class="l-content">
      <!-- 图标 -->
      <!-- size设置图标大小 -->
      <el-button
        style="margin-right: 20px"
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item  v-for="item in this.$store.state.tab.tabsList" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
       
      </el-breadcrumb>
    </div>
    <!-- 右侧 -->
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/user.png" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonHeader",
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
  },
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  // 两端对齐
  justify-content: space-between;
  // 垂直居中
  align-items: center;
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-content{
    display: flex;
    align-items: center;
    //样式穿透
    /deep/.el-breadcrumb__item{
      .el-breadcrumb__inner{
        font-weight: normal;
        &.is-link{
          color: #666;
        }
      }
      //最后一个
      &:last-child{
        .el-breadcrumb__inner{
          color: #fff;
        }
      }
    }
  }
}
</style>