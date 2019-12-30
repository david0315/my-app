<template>
  <div class="weather-station">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-tickets"></i> 气象站</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- <el-row :gutter="20">
      <el-col :span="12">
        <x-outside :info="outsideInfo"></x-outside>
      </el-col>
    </el-row> -->
    <div v-if="weatherStationFlag" class="content">
      <el-row :gutter="20" v-for="(x, i) in weatherStationState" :key="i" class="row">
        <el-col :span="24">
          <x-weather-station></x-weather-station>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import XOutside from './Outside.vue'
import XWeatherStation from './WeatherStationComponent.vue'

export default {
  components: {
    XOutside, XWeatherStation
  },
  data() {
    return {
      // 气象站是否准备就绪
      weatherStationFlag: false,
      // 用户所有的气象站参数(实时数据)
      weatherStationState: [],
      // 棚外参数
      outsideInfo: [{
        name: '降雨量',
        key: 'rainfall',
        value: ''
      },{
        name: '光照度',
        key: 'illuminance',
        value: ''
      },{
        name: '温度',
        key: 'temperature',
        value: ''
      },{
        name: '风速',
        key: 'windspeed',
        value: ''
      },{
        name: '湿度',
        key: 'humidity',
        value: ''
      },{
        name: '气压',
        key: 'pressure',
        value: ''
      },{
        name: '风向',
        key: 'winddirection',
        value: ''
      }],
      // 棚内参数
      insideInfo: [],
      // 定时器的名称
      update: null
    }
  },
  methods: {
    // 获得气象站实时数据
    getWeatherStationState() {
      this.axios({
        url: 'http://60.190.23.22:8889/fertilizer_distributor/api/do.jhtml?router=appApiService.getrealtimedata',
        params: {
          token: localStorage.getItem('user_token')
        }
      }).then(res => {
        console.log(res);
        for (let i in res.data.data) {
          this.weatherStationState[i] = res.data.data[i]
        }
        this.weatherStationFlag = true;
      }).catch(err => {
        console.log(err)
      })
    },
    // 获得棚外参数
    getState(id) {
      this.axios({
        url: 'http://60.190.23.22:8889/fertilizer_distributor/api/do.jhtml?router=appApiService.getRealTimeData',
        params: {
          fd_id: id
        }
      }).then(res => {
        // console.log(res);
        for (let i in this.outsideInfo) {
          if (this.outsideInfo[i].key == 'humidity') {
            this.outsideInfo[i].value = res.data.data[this.outsideInfo[i].key].substr(0, res.data.data[this.outsideInfo[i].key].length - 1);
          } else {
            this.outsideInfo[i].value = res.data.data[this.outsideInfo[i].key];
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
  },
  activated() {
    this.getWeatherStationState();
    // 每5秒更新一次数据
    this.update = setInterval(() => {
      this.getWeatherStationState();
    }, 5000);
  },
  deactivated() {
    clearInterval(this.update);
  }
}
</script>

<style scoped>
  .row {
    margin-bottom: 10px;
  }
</style>