<template>
  <div id="app">
    <!-- <el-row>
      <el-button>默认按钮</el-button>
      <el-button el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less" >
html,
body,
p {
  margin: 0;
  padding: 0;
}
// 定义浏览器默认67%的比例缩放
body {
  zoom: 0.67;
}
//由于zoom缩放会导致echarts图表焦点错位，所以需要在canvas中进行调整
canvas {
  //zoom: 1/缩放比例
  zoom: 1.49;
  transform: scale(0.67);
  transform-origin: 0px 0px;
}
</style>

