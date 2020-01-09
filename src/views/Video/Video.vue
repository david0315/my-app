<template>
  <div class="video">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-video-camera"></i> 现场监控</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container clear">
      <el-row :gutter="20">
        <el-col :span="6">  
          <el-menu
          :default-active="activeIndex">
            <el-menu-item index="1">
              <span slot="title">导航一</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18" class="video-content">
          <iframe :src="src" width="100%" :height="height" allowfullscreen v-if="$store.state.videoFlag"></iframe>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import XVideo from './VideoComponent.vue'

export default {
  components: {
    XVideo
  },
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    src() {
      return "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/" + this.$store.state.userInfo.cameraList[0].deviceSerial + "/" + this.$store.state.userInfo.cameraList[0].channelNo + ".live&autoplay=1&accessToken=" + this.$store.state.userInfo.accessToken
    },
    height() {
      return document.querySelector('.video-content').offsetWidth*3/5
    }
  },
}
</script>

<style scoped>

</style>