<template>
  <div class="index">
    <div class="top-content">
      <div class="video-content" @click="videoClick">
        <iframe
          src="https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.live&autoplay=1&accessToken=ra.23xamzw35p27yshy6ea2hvud3riulmqo-173c7qgql3-0lxt9kc-jkzzoodlk"
          width="750"
          height="500"
          id="ysOpenDevice"
          allowfullscreen>
        </iframe>
      </div>
      <div class="map-content">
        <x-map :userInfo="this.$store.state.userInfo" :ohtersInfo="this.$store.state.othersInfo" v-if="this.$store.state.mapFlag"></x-map>
      </div>
    </div>
    <div class="bottom-content">
      <x-warning></x-warning>
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

    }
  },
  methods: {
    videoClick() {
      let video = document.querySelector('#ysOpenDevice');
      video.style.display = 'block';
    }
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
    background: url("../../assets/img/greenhouse_monitoring.jpg");
    background-size: 100% 100%;
    cursor: pointer;
    width: 750px;
    margin-right: 20px;
  }
  .map-content {
    flex: 1;
  }
</style>
