<template>
  <div class="index">
    <el-row :gutter="20" class="row">
      <el-col :span="14">
        <div class="top-content video"></div>
      </el-col>
      <el-col :span="10">
        <x-map class="top-content" :userInfo="this.$store.state.userInfo" :ohtersInfo="this.$store.state.othersInfo" v-if="this.$store.state.mapFlag"></x-map>
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
    
  }
}
</script>

<style scoped>
  .row {
    margin-bottom: 20px;
  }
  .top-content {
    height: 500px;
    background-color: #fff;
  }
  .video {
    background: url("../../assets/img/greenhouse_monitoring.jpg");
    background-size: 100% 100%;
    cursor: pointer;
  }
</style>
