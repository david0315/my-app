<template>
  <el-card shadow="hover">
    <div slot="header">
      <span>{{this.info.jiqiname}}</span>
    </div>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-table :data="soilState" :header-cell-style="{background:'#f5f7fa'}" border class="soil-table">
          <el-table-column label="参数" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="stateClick(scope)"
                v-if="scope.row.value !== ''">
                {{scope.row.name}}
              </el-button>
              <span v-else>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="数值" align="center"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="14">
        <el-date-picker
        v-model="activeDate"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="选择日期"
        size="small"
        class="date-picker"
        @change="dateClick"></el-date-picker>
        <div class="chart" :id="info.fd_id+info.species"></div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
// vue文件中引入echarts工具
const echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
// 以下的组件按需引入
require("echarts/lib/component/tooltip"); // tooltip组件

export default {
  props: {
    info: {
      type: Object
    }
  },
  data() {
    return {
      // 激活的日期
      activeDate: "",
      // 激活的参数
      activeKey: "air_temperature",
      // 折线图的基础设置
      option: {
        tooltip: {
          trigger: "axis"
        },
        grid: {
          x: 40,
          y: 40,
          x2: 40,
          y2: 40
        },
        xAxis: {
          name: "时间",
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          name: "空气温度",
          type: "value",
          // y轴单位
          // axisLabel:{formatter:'{value} %'}
        },
        series: [
          {
            data: [],
            type: "line"
          }
        ]
      }
    }
  },
  computed: {
    // 温室环境参数
    soilState() {
      return [{
        name: '空气温度',
        key: 'air_temperature',
        value: this.info.airTemperature
      },{
        name: '空气湿度',
        key: 'air_humidity',
        value: this.info.airHumidity
      },{
        name: '土壤温度',
        key: 'soil_temperature',
        value: this.info.soilTemperature
      },{
        name: '土壤湿度',
        key: 'soil_humidity',
        value: this.info.soilHumidity
      },{
        name: '光照度',
        key: 'illuminance',
        value: this.info.illuminance
      },{
        name: 'CO2浓度',
        key: 'co2',
        value: this.info.co2
      },{
        name: '土壤肥沃度',
        key: 'soil_fertility',
        value: this.info.soilFertility
      }]
    }
  },
  methods: {
    // 获得折线图的数据
    getChartData(id, key, date) {
      // 先清空原有数据
      this.option.xAxis.data = [];
      this.option.series[0].data = [];
      this.axios({
        // 这里填温室参数查询折线图的api
        url: "",
        params: {
          token: localStorage.getItem('user_token'),
          fd_id: id,
          date: date
        }
      }).then(res => {
        console.log(res);
        for (let i in res.data.data) {
          this.option.xAxis.data[i] = res.data.data[i].date.substr(11, 8);
          this.option.series[0].data[i] = res.data.data[i][key];
        }
        this.draw();
      }).catch(err => {
        console.log(err);
      });
    },
    // 绘制折线图
    draw() {
      const myChart = echarts.init(document.getElementById(this.info.fd_id + this.info.species));
      myChart.setOption(this.option);
    },
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
    stateClick(scope) {
      this.activeKey = scope.row.key;
      this.option.yAxis.name = scope.row.name;
      // console.log(this.activeKey);
      this.getChartData(this.info.fd_id, this.activeKey, this.activeDate);
    },
    // 日期点击事件
    dateClick() {
      // console.log(this.activeDate);
      this.getChartData(this.info.fd_id, this.activeKey, this.activeDate);
    },
  },
  mounted() {
    this.activeDate = this.getNowDate();
    this.getChartData(this.info.fd_id, this.activeKey, this.activeDate);
  }
}
</script>

<style scoped>
  /* 必须在组件内部就给高度，因为先渲染组件 */
  .chart {
    height: 300px;
  }
</style>