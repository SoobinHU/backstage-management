<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <CommonAside/>
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader/>
        </el-header>
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
import CommonHeader from '@/components/CommonHeader.vue'
export default {
    name:'Main',
    data() {
        return {
            
        }
    },
    components:{
      CommonAside,
      CommonHeader
    }
}
</script>

<style>
.el-aside {
  /* 消除滚动条 */
  overflow: hidden;
}
.el-header {
  padding: 0;
}
</style>