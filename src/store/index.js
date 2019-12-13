import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: {
      // 用户身份的token
      token: '',
      // 左侧菜单是否折叠
      collapse: true
    },
    // 地图是否准备就绪
    readyFlag: false,
    // 激活的id
    activeId: '',
    // 所有的id和坐标
    idData: []
  },
  mutations: {
    // 存储用户信息
    getUserInfo(state, payload) {
      state.userInfo.token = payload
    },
    // 折叠/拉出左侧菜单
    collapseChage(state) {
      state.userInfo.collapse = !state.userInfo.collapse
    },
    // state中的状态必须由mutations中的对应函数来修改
    ready(state) {
      state.readyFlag = true;
    },
    clickMarker(state, payload) {
      state.activeId = payload;
      // console.log(state.activeId);
    },
    inputIdData(state, payload) {
      state.idData = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
