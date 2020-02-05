<template>
  <div class="index">
    <div class="top-content">
      <div class="video-content" @click="videoClick">
        <iframe :src="src" width="750" height="500" allowfullscreen v-if="this.$store.state.videoFlag && this.videoFlag"></iframe>
      </div>
      <div class="map-content">
        <x-map :userInfo="this.$store.state.userInfo" :ohtersInfo="this.$store.state.othersInfo" v-if="this.$store.state.mapFlag"></x-map>
      </div>
    </div>
    <div class="bottom-content">
      <!-- <div class="brain-content" @click="brainClick"></div> -->
      <div class="container button">
        <el-row :gutter="20" style="margin-bottom: 30px;">
          <el-col :span="8">
            <el-button @click="buttonClick('weatherstation')">气象站</el-button>
          </el-col>
          <el-col :span="8">
            <el-button @click="buttonClick('soil')">土壤指标</el-button>
          </el-col>
          <el-col :span="8">
            <el-button @click="buttonClick('greenhouse')">温室参数</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-button @click="buttonClick('crops')">农作物参数</el-button>
          </el-col>
          <el-col :span="8">
            <el-button @click="buttonClick('video')">现场监控</el-button>
          </el-col>
          <el-col :span="8">
            <el-button @click="buttonClick('brain')">智慧大脑</el-button>
          </el-col>
        </el-row>
      </div>
      
      <x-warning class="warning-content"></x-warning>
    </div>  
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
      videoFlag: false
    }
  },
  computed: {
    src() {
      return "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/" + this.$store.state.userInfo.cameraList[0].deviceSerial + "/" + this.$store.state.userInfo.cameraList[0].channelNo + ".live&autoplay=1&accessToken=" + this.$store.state.userInfo.accessToken
    }
  },
  methods: {
    videoClick() {
      this.videoFlag = true;
    },
    brainClick() {
      this.$router.push('/brain');
    },
    buttonClick(index) {
      this.$router.push('/'+index);
    }
  },
  deactivated() {
    this.videoFlag = false;
  }
}
</script>

<style scoped>
  .row {
    margin-bottom: 20px;
  }
  .top-content {
    display: flex;
    height: 500px;
    margin-bottom: 20px;
  }
  .video-content {
    background: url("../../assets/img/index-video.jpg");
    background-size: 100% 100%;
    cursor: pointer;
    width: 750px;
    margin-right: 20px;
  }
  .map-content {
    flex: 1;
  }
  .bottom-content {
    display: flex;
  }
  .button {
    width: 690px;
    height: 240px;
    margin-right: 20px;
  }
  .el-button {
    width: 210px;
    height: 100px;
    font-size: 24px;
  }
  .brain-content {
    background: url("../../assets/img/index-intellectual_brain.jpg");
    background-size: 100% 100%;
    cursor: pointer;
    width: 750px;
    height: 300px;
    margin-right: 20px;
  }
  .warning-content {
    flex: 1
  }
</style>
