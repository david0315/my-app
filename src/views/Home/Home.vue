<template>
  <div class="home">
    <el-row :gutter="20" class="row">
      <el-col :span="14">
        <div class="top-content">监控</div>
      </el-col>
      <el-col :span="10">
        <x-map class="top-content" :idData="this.$store.state.idData"></x-map>
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
