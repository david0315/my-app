<template>
  <div class="video">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-video-camera"></i> 现场监控</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container" v-if="$store.state.videoFlag">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-menu
          default-active="0"
          @select="changeVideo"
          class="videoList">
            <el-menu-item :index="String(i)" v-for="(x,i) in $store.state.userInfo.cameraList" :key="i">
              <span slot="title">{{x.deviceSerial}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20" class="video-content">
          <iframe :src="src" width="100%" height="720" allowfullscreen id="ysopen"></iframe>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
    }
  },
  computed: {
    src() {
      return "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/" + this.$store.state.userInfo.cameraList[Number(this.activeIndex)].deviceSerial + "/" + this.$store.state.userInfo.cameraList[Number(this.activeIndex)].channelNo + ".live&autoplay=1&accessToken=" + this.$store.state.userInfo.accessToken
    }
  },
  methods: {
    changeVideo(index) {
      this.activeIndex = index;
    }
  }
}
</script>

<style scoped>
  .videoList {
    overflow-y: scroll;
    height: 720px;
  }
  .videoList::-webkit-scrollbar {
      width: 0;
  }
</style>