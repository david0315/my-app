<template>
  <baidu-map class="map" ak="Ps7d8xotpfXbGNyjljFhqoPH52dCGHjv" :center="center" :zoom="zoom"
  :scroll-wheel-zoom="true" :map-click="false" @ready="handler">
    <bm-marker v-for="(x, i) in ohtersInfo" :position="{lng: x.lon, lat: x.lat}" :key="i">
      <bm-label :content="x.name" :labelStyle="{color: 'red', fontSize : '12px'}" :offset="{width: -(x.name.length-1)/2*12, height: 35}"/>
    </bm-marker>
    <bm-marker :position="{lng: userInfo.lon, lat: userInfo.lat}">
      <bm-label :content="userInfo.name" :labelStyle="{color: 'blue',border: '1px solid blue', fontSize : '12px'}" :offset="{width: -(userInfo.name.length-1)/2*12, height: 35}"/>
    </bm-marker>
  </baidu-map>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmLabel from 'vue-baidu-map/components/overlays/Label'

export default {
  components: {
    BaiduMap, BmMarker, BmLabel
  },
  props: {
    userInfo: {
      type: Object
    },
    ohtersInfo: {
      type: Array
    }
  },
  data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 3
    }
  },
  methods: {
    handler() {
      this.center.lng = this.userInfo.lon;
      this.center.lat = this.userInfo.lat;
      this.zoom = 7;
    },
  }
}
</script>

<style scoped>
  .map {
    width: 100%;
    height: 100%;
  }
  /* 隐藏百度logo */
  /deep/.BMap_cpyCtrl {
      display: none!important;
  }
  /deep/.anchorBL {
      display: none!important;
  }
</style>