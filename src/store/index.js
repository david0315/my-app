import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: {
      // 左侧菜单是否折叠
      collapse: true,
      // 用户名称
      name: '',
      // 经纬度
      lon: '',
      lat: '',
      // 设备id
      id: [],
    },
    // 其他用户信息
    othersInfo: [],
    // 地图是否准备就绪
    mapFlag: false,
  },
  mutations: {
    // 修改用户名称
    changeUserName(state, payload) {
      state.userInfo.name = payload
    },
    // 获得用户信息
    getUserInfo(state, payload) {
      state.userInfo.name = payload.name;
      state.userInfo.lon = payload.lon;
      state.userInfo.lat = payload.lat;
      // console.log(state.userInfo);
    },
    // 获得其他用户信息
    getOthersInfo(state, payload) {
      state.othersInfo = payload;
      // console.log(state.otherUserInfo);
    },
    // 获得用户的所有硬件id
    getUserId(state, payload) {
      state.userInfo.id = payload;
    },
    // 折叠/拉出左侧菜单
    collapseChage(state) {
      state.userInfo.collapse = !state.userInfo.collapse
    },
    // state中的状态必须由mutations中的对应函数来修改
    ready(state) {
      state.mapFlag = true;
    }
  },
  actions: {
  },
  modules: {
  }
})
