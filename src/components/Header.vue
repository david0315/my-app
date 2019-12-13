<template>
  <div class="header">
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!this.$store.state.userInfo.collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">智慧植物工厂云平台</div>
    <el-dropdown class="id" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{$store.state.activeId}}
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改名称</el-dropdown-item>
        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
    color: #fff;
    cursor: pointer;
  }
</style>