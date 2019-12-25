import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    userId: '',
    userData: {}
  },
  mutations: {
    performLogin (state, payload) {
      state.isLoggedIn = true
      state.userId = payload.user._id
      localStorage.setItem('tkn', payload.token)
      this.dispatch('fetchUserData')
    },
    performLogOut (state) {
      state.isLoggedIn = false
      state.userId = ''
      state.userData = ''
      localStorage.removeItem('tkn')
    },
    consolidateUserData (state, payload) {
      state.userData = payload
    }
  },
  actions: {
    checkLogin (state) {
      let token = localStorage.getItem('tkn')
      if (token) {
        axios.defaults.headers.common['Authorization'] = token
        this.commit('performLogin')
      }
    },
    logIn (context, payload) {
      let url = `${window.serverURL}/api-v1/login`
      console.log('logging in..')
      axios.post(url, payload, { headers: {
        'Content-Type': 'application/json'
      } })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('logged', res)
            this.commit('performLogin', res.data)
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
    },
    addBooking (context, payload) {
      let url = `${window.serverURL}/api-v1/bookings`
      console.log('adding booking...')
      let data = { payload: { ...payload }, id: this.state.userId }
      axios.post(url, data, { headers: {
        'Content-Type': 'application/json'
      } })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('booking added')
            this.dispatch('fetchUserData')
          }
        })
    },
    fetchUserData () {
      let url = `${window.serverURL}/api-v1/userdata`
      let data = { id: this.state.userId }
      axios.post(url, data, { headers: {
        'Content-Type': 'application/json'
      } })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('user data fetched', res)
            this.commit('consolidateUserData', res.data)
          }
        })
    }
  },
  modules: {
  }
})
