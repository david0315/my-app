<template>
  <div class="home">
    <x-header></x-header>
    <x-sidebar></x-sidebar>
    <div class="content-box" :class="{'content-collapse':!this.$store.state.userInfo.collapse}">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import XHeader from './Header.vue'
import XSidebar from './Sidebar.vue'

export default {
  components: {
    XHeader, XSidebar
  },
  methods: {
    // 获得id和坐标
    getId() {
      this.axios({
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
  .content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
    padding: 10px;
    overflow-y: auto;
  }
  .content-collapse {
    left: 65px;
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