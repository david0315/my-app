<template>
  <div class="crops">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-tickets"></i> 农作物生长参数</el-breadcrumb-item>
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
      // 农作物生长参数是否准备就绪
      cropsFlag: false,
      // 用户所有的农作物生长参数(实时数据)
      cropsState: [],
      // 定时器的名称
      update: null
    }
  },
  methods: {
    // 获得农作物生长参数实时数据
    getCropsState() {
      this.axios({
        url: 'http://60.190.23.22:8889/fertilizer_distributor/api/do.jhtml?router=appApiService.getrealtimedata',
        params: {
          token: localStorage.getItem('user_token')
        }
      }).then(res => {
        // console.log(res);
        this.cropsState = [];
        for (let i in res.data.data) {
          if (res.data.data[i].species == 'oil') {
            this.cropsState.push(res.data.data[i]);
          }
        }
        this.cropsFlag = true;
      }).catch(err => {
        console.log(err)
      })
    },
  },
  activated() {
    this.getCropsState();
    // 每5秒更新一次数据
    this.update = setInterval(() => {
      console.log('更新数据！');
      this.getCropsState();
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