import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  name: 'store',
  state: {
    authorized: localStorage.getItem("auth"),
    username: localStorage.getItem("user"),
    password: localStorage.getItem("pass"),
  },
  getters: {
    password: state => {
      return state.password
    },
    user: state => {
      return state.username
    },
    authorized: state => {
      return state.authorized
    }
  },
  mutations: {
    setPassword(state, password) {
      state.password = password
      localStorage.setItem("pass", password)
    },
    setUser(state, username) {
      state.username = username
      localStorage.setItem("user", username)
    },
    setAuthorized(state, auth) {
      state.authorized = auth
      localStorage.setItem("auth", auth)
    }
  },
  actions: {
  },
  modules: {
  }
})
