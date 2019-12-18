<template>
  <div class="index">
    <el-row :gutter="20" class="row">
      <el-col :span="14">
        <div class="top-content">监控</div>
      </el-col>
      <el-col :span="10">
        <x-map class="top-content" :idData="this.$store.state.idData" v-if="this.$store.state.readyFlag"></x-map>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <x-warning></x-warning>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import XMap from './Map.vue'
import XWarning from './Warning.vue'

export default {
  components: {
    XMap, XWarning
  },
  data() {
    return {

    }
  },
  methods: {
    // 获得id和坐标
    getId() {
      this.axios({
        url:
          "http://60.190.23.22:8889/fertilizer_distributor/api/do.jhtml?router=appApiService.getCoordinate"
      })
        .then(res => {
          // console.log(res);
          // id和坐标存储在vuex中
          this.$store.commit("inputIdData", res.data.data);
          // 激活获得的第一个id
          this.$store.commit("clickMarker", this.$store.state.idData[0].fd_id);
          // 准备就绪
          this.$store.commit("ready");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  activated() {
    this.getId();
  }
}
</script>

<style scoped>
  .row {
    margin-bottom: 20px;
  }
  .top-content {
    height: 400px;
    background-color: #fff;
  }
</style>
