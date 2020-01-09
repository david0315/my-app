<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      default-active="1"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      router
      :collapse="!this.$store.state.userInfo.collapse">
      <el-menu-item index="index">
        <i class="el-icon-house"></i>
        <span slot="title">系统首页</span>
      </el-menu-item>
      <el-menu-item index="weatherstation">
        <i class="el-icon-tickets"></i>
        <span slot="title">气象站</span>
      </el-menu-item>
      <el-menu-item index="soil">
        <i class="el-icon-tickets"></i>
        <span slot="title">土壤指标</span>
      </el-menu-item>
      <el-menu-item index="greenhouse">
        <i class="el-icon-tickets"></i>
        <span slot="title">温室环境参数</span>
      </el-menu-item>
      <el-menu-item index="crops">
        <i class="el-icon-tickets"></i>
        <span slot="title">农作物生长参数</span>
      </el-menu-item>
      <el-menu-item index="video">
        <i class="el-icon-video-camera"></i>
        <span slot="title">现场监控</span>
      </el-menu-item>
      <el-menu-item index="remotecontrol">
        <i class="el-icon-setting"></i>
        <span slot="title">远程控制台</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }
  .sidebar::-webkit-scrollbar {
      width: 0;
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }
  .sidebar-el-menu {
    height: 100%;
  }
</style>