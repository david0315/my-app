import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否准备就绪
    readyFlag: false,
    // 激活的id
    activeId: '',
    // 所有的id和坐标
    idData: []
  },
  mutations: {
    // state中的状态必须由mutations中的对应函数来修改
    ready(state) {
      state.readyFlag = true;
    },
    clickMarker(state, payload) {
      state.activeId = payload;
      console.log(state.activeId);
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
