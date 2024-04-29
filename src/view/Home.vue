<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
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
      <el-card class="buyNum" style="margin-top: 20px; height: 460px">
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
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <!--由于elementUI封装必须要将样式写成标签属性，否则无效  -->
        <!-- 有些css样式只能放body-style里,这是由于 CSS 的特殊性和优先级规则导致的。 -->
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 260px">
        <!-- 折线图 -->
        <div ref="echarts1" style="height: 260px; width: 950px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 250px">
          <!-- 柱状图 -->
          <div ref="echarts2" style="height: 250px; width: 470px"></div>
        </el-card>
        <el-card style="height: 250px">
          <!-- 饼状图 -->
          <div ref="echarts3" style="height: 240px; width: 470px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  //小姐姐你再掉一个引号试试呢。。
  name: "Home",
  data() {
    return {
      tableData: [],
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
  mounted() {
    // 解构赋值注意层级
    getData().then(({ data }) => {
      const { tableData } = data.data;
      // console.log(tableData)
      this.tableData = tableData;
      //折线图
      //基于准备好的dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1);
      //指定图表配置项和数据
      var echarts1Option = {};
      // 处理数据xAxis X轴
      const { orderData, userData,videoData } = data.data;
      console.log(orderData)
      //X轴坐标
      echarts1Option.xAxis = {
        data:orderData.date
      };
      //Y轴
      echarts1Option.yAxis = {};
      //图例
      echarts1Option.legend = {
        data:Object.keys(orderData.data[0])
      };
      //数据
      echarts1Option.series = [];
      Object.keys(orderData.data[0]).forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      // console.log(xAxis)
      //传入折线图的配置项
      echarts1.setOption(echarts1Option);

      //柱状图
      //基于准备好的dom，初始化echarts实例
      const echarts2 = echarts.init(this.$refs.echarts2);
      const echarts2Options = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      echarts2.setOption(echarts2Options);

      //饼状图
      //基于准备好的dom，初始化echarts实例
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Options = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data:videoData,
            type:'pie'
          }
        ],
      };
      echarts3.setOption(echarts3Options);
    });
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
.num {
  display: flex;
  // 自动换行
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    display: flex;
    margin-left: 15px;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      height: 30px;
      line-height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
