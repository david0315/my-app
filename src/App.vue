<template>
  <div id="app">
    <x-header></x-header>
    <x-sidebar></x-sidebar>
    <div class="content-box">
      <keep-alive>
        <router-view v-if="this.$store.state.readyFlag"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import XHeader from './components/Header.vue'
import XSidebar from './components/Sidebar.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    XHeader, XSidebar
  },
  methods: {
    // 获得id和坐标
    getId() {
      axios({
        url: 'http://60.190.23.22:8889/fertilizer_distributor/api/do.jhtml?router=appApiService.getCoordinate'
      }).then(res => {
        // console.log(res);
        // id和坐标存储在vuex中
        this.$store.commit('inputIdData', res.data.data);
        // 激活获得的第一个id
        this.$store.commit('clickMarker', this.$store.state.idData[0].fd_id);
        // 准备就绪
        this.$store.commit('ready');
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getId()
  }
}
</script>

<style>
  @import "./assets/css/base.css";

  .content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    background: #f0f0f0;
    padding: 10px;
    overflow-y: auto;
  }
  .crumbs {
    margin: 10px 0;
  }
  .container {
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
