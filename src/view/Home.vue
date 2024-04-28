<template>
  <el-row>
    <el-col :span="8">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user.png" alt="" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录的时间：<span>2021-7-19</span></p>
          <p>上次登录的地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card class="buyNum" style="margin-top: 20px">
        <el-table :data="tableData">
          <!-- <el-table-column prop="name" label="课程"></el-table-column>
          <el-table-column prop="todayBuy" label="今日购买"></el-table-column>
          <el-table-column prop="monthBuy" label="本月购买"> </el-table-column>
          <el-table-column prop="totalBuy" label="总购买"> </el-table-column> -->
          <el-table-column
            v-for="(val, key) in tableLable"
            :prop="key"
            :label="val"
            :key="key"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <!--由于elementUI封装必须要将样式写成标签属性，否则无效  -->
        <!-- 有些css样式只能放body-style里,这是由于 CSS 的特殊性和优先级规则导致的。 -->
        <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
          <div class="detail">
            <p class="price">￥{{item.value}}</p>
            <p class="desc">{{item.name}}</p>
          </div>
        </el-card>
      </div>
   </el-col>
  </el-row>
</template>

<script>
export default {
  //小姐姐你再掉一个引号试试呢。。
  name: "Home",
  data() {
    return {
      tableData: [
        {
          name: "oppo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "vivo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "苹果",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "小米",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "三星",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
      tableLable: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        { name: "今日收藏订单", value: 210, icon: "star-on", color: "#ffb980" },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        { name: "本月收藏订单", value: 210, icon: "star-on", color: "#ffb980" },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center; //交叉轴居中
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    width: 100px;
    height: 100px;
    margin-right: 40px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num{
  display: flex;
  // 自动换行
  flex-wrap: wrap;
  justify-content: space-between;
  .icon{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail{
    display: flex;
    margin-left: 15px;
    flex-direction: column;
    justify-content: center;
    .price{
      font-size: 30px;
      margin-bottom: 10px;
      height: 30px;
      line-height: 30px;
    }
    .desc{
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card{
    width: 32%;
    margin-bottom: 20px;
  }
}
</style>
