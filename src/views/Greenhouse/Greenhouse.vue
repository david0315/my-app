<template>
  <div class="greenhouse">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-tickets"></i> 温室环境参数</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 温室环境参数是否准备就绪
      greenhouseFlag: false,
      // 用户所有的温室环境参数(实时数据)
      greenhouseState: [],
      // 定时器的名称
      update: null
    }
  },
  methods: {
    // 获得温室环境参数实时数据
    getGreenhouseState() {
      this.axios({
        url: 'http://60.190.23.22:8889/fertilizer_distributor/api/do.jhtml?router=appApiService.getrealtimedata',
        params: {
          token: localStorage.getItem('user_token')
        }
      }).then(res => {
        // console.log(res);
        this.greenhouseState = [];
        for (let i in res.data.data) {
          if (res.data.data[i].species == 'oil') {
            this.greenhouseState.push(res.data.data[i]);
          }
        }
        this.greenhouseFlag = true;
      }).catch(err => {
        console.log(err)
      })
    },
  },
  activated() {
    this.getGreenhouseState();
    // 每5秒更新一次数据
    this.update = setInterval(() => {
      console.log('更新数据！');
      this.getGreenhouseState();
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