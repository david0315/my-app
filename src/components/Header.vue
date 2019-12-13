<template>
  <div class="header">
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!this.$store.state.userInfo.collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">智慧植物工厂云平台</div>
    <div class="id">{{$store.state.activeId}}</div>
  </div>
</template>

<script>
export default {
  methods: {
    // 侧边栏折叠
    collapseChage() {
      this.$store.commit('collapseChage')
    },
  }
}
</script>

<style scoped>
  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    background-color: #242f42;
  }
  .logo {
    float: left;
    line-height: 70px;
  }
  .id {
    float: right;
    margin-right: 20px;
    line-height: 70px;
    font-size: 20px;
  }
</style>