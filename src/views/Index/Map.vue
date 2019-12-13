<template>
  <baidu-map class="map" ak="Ps7d8xotpfXbGNyjljFhqoPH52dCGHjv" :center="center" :zoom="zoom"
  :scroll-wheel-zoom="true" :map-click="false" @ready="handler">
    <bm-marker v-for="(x, i) in idData" :position="{lng: x.lon, lat: x.lat}" :key="i" @click="clickMarker(x.fd_id)">
      <bm-label :content="x.fd_id" :labelStyle="{color: 'red', fontSize : '12px'}" :offset="{width: -23, height: 35}"/>
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
    idData: {
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
      this.center.lng = this.idData[0].lon;
      this.center.lat = this.idData[0].lat;
      this.zoom = 15;
    },
    // 坐标点击事件
    clickMarker(id) {
      // console.log(id);
      this.$store.commit('clickMarker', id);
    }
  }
}
</script>

<style scoped>
  /* 隐藏百度logo */
  /deep/.BMap_cpyCtrl {
      display: none!important;
  }
  /deep/.anchorBL {
      display: none!important;
  }
</style>