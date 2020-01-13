<template>
  <div class="crops">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-tickets"></i> 农作物生长参数</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-if="cropsFlag" class="content">
      <el-row :gutter="20" v-for="(x, i) in cropsState" :key="i" class="row">
        <el-col :span="24">
          <x-crops :info="x"></x-crops>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import XCrops from './CropsComponent.vue'

export default {
  components: {
    XCrops
  },
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
          if (res.data.data[i].species == 'crops') {
            this.cropsState.push(res.data.data[i]);
          }
        }
        console.log(this.cropsState);
        this.cropsFlag = true;
      }).catch(err => {
        console.log(err)
      })
    },
  },
  activated() {
    this.getCropsState();
    // 每10秒更新一次数据
    this.update = setInterval(() => {
      console.log('更新数据！');
      this.getCropsState();
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