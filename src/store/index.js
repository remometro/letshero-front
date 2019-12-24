import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false
  },
  mutations: {
    performLogin (state) {
      state.isLoggedIn = true
    },
    performLogOut (state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    logIn (context, payload) {
      let url = `${window.serverURL}/api-v1/login`
      console.log('fetching..', url, ' with ', payload.uname, payload.pwd)
      let data = new FormData()
      data.append('username', payload.uname)
      data.append('password', payload.pwd)
      axios.post(url, { username: payload.uname, password: payload.pwd }, { headers: {
        'Content-Type': 'application/json'
      } })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('logged')
            this.commit('performLogin')
          }
        })
    },
    logOut () {
      let url = `${window.serverURL}/api-v1/logout`
      axios.get(url)
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('logged out')
            this.commit('performLogOut')
          }
        })
    }
  },
  modules: {
  }
})
