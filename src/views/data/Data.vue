<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="数据统计" level2="数据报表"></my-breadcrumb>
     <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main" style="width: 600px;height:400px;"></div>
  </el-card>
</template>

<script>
// 引入echarts
import echarts from 'echarts';
// 绘制图表
export default {
  data() {
    return {
      pieChart: null
    };
  },
  mounted() {
    this.pieChart = echarts.init(document.getElementById('main'));
    // 显示标题
    // 绘制图表
    this.pieChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    });
  }
};
</script>

<style>

</style>
