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
import XHeader from "./Header.vue";
import XSidebar from "./Sidebar.vue";

export default {
  components: {
    XHeader,
    XSidebar
  },
  methods: {
    // 获得信息(坐标、名称等)
    getInfo() {
      this.axios({
        url: 'http://60.190.23.22:8889/fertilizer_distributor/api/do.jhtml?router=appApiService.getaccountCoordinate',
        params: {
          token: localStorage.getItem('user_token')
        }
      }).then(res => {
        // console.log(res);
        this.getUserInfo(res.data.data1);
        this.getOthersInfo(res.data.data);
        this.$store.commit('ready');
      }).catch(err => {
        console.log(err)
      })
    },
    // 获得用户的所有硬件id
    getId() {
      this.axios({
        url: 'http://60.190.23.22:8889/fertilizer_distributor/api/do.jhtml?router=appApiService.getrealtimedata',
        params: {
          token: localStorage.getItem('user_token')
        }
      }).then(res => {
        // console.log(res);
        this.getUserId(res.data.data);
      }).catch(err => {
        console.log(err)
      })
    },
    // 获得用户信息
    getUserInfo(info) {
      this.$store.commit('getUserInfo', info[0]);
    },
    // 获得其他用户信息
    getOthersInfo(info) {
      this.$store.commit('getOthersInfo', info);
    },
    // 获得用户的所有硬件id
    getUserId(id) {
      this.$store.commit('getUserId', id);
    },
  },
  created() {
    this.getInfo();
    this.getId();
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
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
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