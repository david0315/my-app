<template>
  <el-card shadow="hover">
    <div slot="header">
      <span>气象站棚外参数</span>
    </div>
    <el-table
      :data="info"
      :header-cell-style="{background:'#f5f7fa'}"
      border>
      <el-table-column
        label="参数"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="nameClick(scope)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="value"
        label="数值"
        align="center">
      </el-table-column>
    </el-table>
    <el-date-picker
      v-model="activeDate"
      value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择日期"
      size="small"
      class="date-picker"
      :picker-options="pickerOptions">
    </el-date-picker>
    <div class="chart" id="chart"></div>
  </el-card>
</template>

<script>
import axios from 'axios'
// vue文件中引入echarts工具
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
// 以下的组件按需引入
require('echarts/lib/component/tooltip')   // tooltip组件

export default {
  props: {
    info: {
      type: Array
    }
  },
  data() {
    return {
      // 激活的日期
      activeDate: '',
      // 日历的设置
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      // 激活的参数
      activeKey: 'temperature',
      // 折线图的基础设置
      option: {
        tooltip: {
          trigger: 'axis'
        },
        grid:{
          y: '15%'
        },
        xAxis: {
          name: '时间',
          type: 'category',
          boundaryGap: false,
          // 假数据
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          name: '温度',
          type: 'value',
        },
        series: [{
          // 假数据
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      },
      // 定时器的名称
      update: null
    }
  },
  methods: {
    // 获得当前时间
    getNowDate() {
      let date = new Date();
      let seperator1 = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    // 参数点击事件
    nameClick(scope) {
      // 修改title
      this.option.yAxis.name = scope.row.name;
      // 重新绘制折线图
      this.draw();
    },
    // 获得折线图的数据
    getChartData(id, key) {
      axios({
        url: 'http://60.190.23.22:8889/fertilizer_distributor/api/do.jhtml?router=appApiService.getData',
        params: {
          fd_id: id
        }
      }).then(res => {
        // console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    // 绘制折线图
    draw() {
      const myChart = echarts.init(document.getElementById('chart'));
      myChart.setOption(this.option);
    }
  },
  activated() {
    this.activeDate = this.getNowDate();
    this.getChartData(this.$store.state.activeId, this.activeKey);
    this.draw();
    // 每5秒更新一次数据
    this.update = setInterval(() => {
      this.getChartData(this.$store.state.activeId, this.activeKey);
      this.draw();
    }, 5000);
  },
  deactivated() {
    clearInterval(this.update);
  }
}
</script>

<style scoped>
  /* 必须在组件内部就给高度，因为先渲染组件 */
  .chart {
    height: 300px;
  }
  .date-picker {
    margin-top: 10px;
  }
</style>