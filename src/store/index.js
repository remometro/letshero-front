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
      state.userId = payload.user._id
      localStorage.setItem('tkn', payload.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`
      console.log('before dispatch fetch', localStorage.getItem('tkn'), axios.defaults.headers.common['Authorization'], payload.token)
      this.dispatch('fetchUserData')
    },
    performLogOut (state) {
      state.isLoggedIn = false
      state.userId = ''
      state.userData = ''
      localStorage.removeItem('tkn')
      axios.defaults.headers.common['Authorization'] = ''
    },
    consolidateUserData (state, payload) {
      state.userId = payload._id
      state.isLoggedIn = true
      state.userData = payload
    }
  },
  actions: {
    checkLogin (context) {
      let token = localStorage.getItem('tkn')
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        this.dispatch('fetchUserData')
      } else {
        axios.defaults.headers.common['Authorization'] = ''
      }
    },
    logIn (context, payload) {
      let url = `${window.serverURL}/api-v1/login`
      console.log('logging in..')
      axios.post(url, payload, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('logged', res)
            this.commit('performLogin', res.data)
          }
        })
    },
    logOut () {
      let url = `${window.serverURL}/api-v1/logout`
      axios.get(url, { withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('logged out')
            this.commit('performLogOut')
          }
        })
    },
    addBooking (context, payload) {
      let url = `${window.serverURL}/api-v1/bookings`
      console.log('adding booking...', payload)
      let data = { payload: { ...payload }, id: this.state.userId }
      axios.post(url, data, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('booking added')
            this.dispatch('fetchUserData')
          }
        })
    },
    deleteBooking (context, payload) {
      let url = `${window.serverURL}/api-v1/bookings`
      console.log('removing booking...', payload)
      let data = { id: payload }
      axios.delete(url, {
        data: data,
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('booking deleted')
            this.dispatch('fetchUserData')
          }
        })
    },
    fetchUserData () {
      console.log('axios ', axios.defaults.headers.common['Authorization'])
      let url = `${window.serverURL}/api-v1/userdata`
      let data = { id: this.state.userId }
      axios.post(url, data, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
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
