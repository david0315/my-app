<template>
  <div class="weather-station">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-tickets"></i> 气象站</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <x-inside></x-inside>
      </el-col>
      <el-col :span="12">
        <x-outside :info="outsideInfo"></x-outside>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import XOutside from './Outside.vue'
import XInside from './Inside.vue'

export default {
  components: {
    XOutside, XInside
  },
  data() {
    return {
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
    this.getState(this.$store.state.activeId);
    // 每5秒更新一次数据
    this.update = setInterval(() => {
      this.getState(this.$store.state.activeId)
    }, 5000);
  },
  deactivated() {
    clearInterval(this.update);
  }
}
</script>

<style scoped>

</style>