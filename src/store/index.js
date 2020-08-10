import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
    }
  },
  mutations: {
    changeLogin(state, status) {
      state.userInfo = status;
    }
  },
  actions: {
    loginAction(context, user) {
      context.commit('changeLogin', user);
    }
  },
  getters: {
    isLogin(state){
      return !!Object.keys(state.userInfo).length
    }
  },
  modules: {}
})