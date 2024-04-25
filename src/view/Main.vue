<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <CommonAside/>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <!-- 路由出口 -->
          <!-- 路由匹配的组件渲染到这里 -->
          <router-view ></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'

export default {
    name:'Main',
    data() {
        return {
            
        }
    },
    components:{
      CommonAside
    }
}
</script>

<style>
.el-aside {
  /* 消除滚动条 */
  overflow: hidden;
}
</style>