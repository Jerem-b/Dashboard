import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    timer: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setTimer(state, timer) {
      if (!state.timer.find(t => t.id === timer.id)) {
        state.timer.push(timer)
      }
    },
    updateTimer(state, timer) {
      clearInterval(state.timer.find(t => t.id === timer.id).timer)
      state.timer.find(t => t.id === timer.id).timer = timer.timer
    },
    deleteTimer(state, id) {
      clearInterval(state.timer.find(t => t.id === id).timer)
      state.timer = state.timer.filter(t => t.id !== id)
    }
  },
  actions: {
  },
  modules: {
  }
})
