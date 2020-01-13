<template>
  <div class="soil">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-tickets"></i> 土壤指标</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-if="soilFlag" class="content">
      <el-row :gutter="20" v-for="(x, i) in soilState" :key="i" class="row">
        <el-col :span="24">
          <x-soil :info="x"></x-soil>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import XSoil from './SoilComponent.vue'

export default {
  components: {
    XSoil
  },
  data() {
    return {
      // 土壤指标是否准备就绪
      soilFlag: false,
      // 用户所有的土壤指标(实时数据)
      soilState: [],
      // 定时器的名称
      update: null
    }
  },
  methods: {
    // 获得土壤指标实时数据
    getSoilState() {
      this.axios({
        url: 'http://60.190.23.22:8889/fertilizer_distributor/api/do.jhtml?router=appApiService.getrealtimedata',
        params: {
          token: localStorage.getItem('user_token')
        }
      }).then(res => {
        // console.log(res);
        this.soilState = [];
        for (let i in res.data.data) {
          if (res.data.data[i].species == 'oil') {
            this.soilState.push(res.data.data[i]);
          }
        }
        // console.log(this.soilState);
        this.soilFlag = true;
      }).catch(err => {
        console.log(err)
      })
    },
  },
  activated() {
    this.getSoilState();
    // 每10秒更新一次数据
    this.update = setInterval(() => {
      console.log('更新数据！');
      this.getSoilState();
    }, 10000);
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