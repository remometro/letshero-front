import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isLogging: false,
    loginError: false,
    loginErrorMessage: 'Something went wrong! Please try again later.',
    signupErrorMessage: 'Something went wrong! Please try again later.',
    signupError: false,
    isSigningUp: false,
    hasSignedUp: false,
    isFindingAHero: false,
    foundAHero: false,
    errorFindingAHero: false,
    errorFindingAHeroMessage: 'Something went wrong! Please try again later.',
    fetchingHelp: false,
    loadingList: false,
    assumingHelp: false,
    userId: '',
    userData: {},
    helpData: {},
    allHelpsData: [],
    liveStreaming: {},
    instagram: [],
    sessionToken: '',
    baseUrl: process.env.VUE_APP_URL || 'https://letshero.com'
  },
  mutations: {
    performLogin(state, payload) {
      state.loginError = false
      state.userId = payload._id
      // Vue.$cookies.set('Bearer', payload.token)
      localStorage.setItem('letshero-tkn', payload.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`
      // console.log('before dispatch fetch', localStorage.getItem('tkn'), axios.defaults.headers.common['Authorization'], payload.token)
      this.dispatch('fetchUserData')
      state.isLogging = false
      state.isLoggedIn = true
    },
    assumingHelp(state, payload) {
      state.assumingHelp = payload
    },
    isLogging(state) {
      state.isLogging = true
    },
    isFindingAHero(state) {
      state.isFindingAHero = true
    },
    foundAHero(state) {
      state.foundAHero = true
      state.isFindingAHero = false
    },
    resetFoundAHero(state) {
      state.foundAHero = false
      state.isFindingAHero = false
    },
    errorFindingAHero(state, payload) {
      state.isFindingAHero = false
      state.errorFindingAHero = true
      state.errorFindingAHeroMessage = payload.message ? state.errorFindingAHeroMessage = payload.message : state.errorFindingAHeroMessage = 'Something went wrong! Please try again later.'
    },
    loginError(state, payload) {
      state.isLogging = false
      state.loginError = true
      payload.message ? state.loginErrorMessage = payload.message : state.loginErrorMessage = 'Something went wrong! Please try again later.'
    },
    isSigningUp(state) {
      state.isSigningUp = true
    },
    hasSignedUp(state) {
      state.isSigningUp = false
      state.hasSignedUp = true
    },
    signupError(state, payload) {
      state.isSigningUp = false
      state.signupError = true
      payload.message ? state.signupErrorMessage = payload.message : state.signupErrorMessage = 'Something went wrong! Please try again later.'
    },
    performLogOut(state) {
      state.isLoggedIn = false
      state.userId = ''
      state.userData = ''
      axios.defaults.headers.common['Authorization'] = ''
      localStorage.setItem('letshero-tkn', '')
      // Vue.$cookies.remove("connect.sid")
      // Vue.$cookies.remove("Bearer")
      // Vue.$cookies.remove()
      // document.cookie = 'Bearer' + '=' + ';expires=Thu, 01-Jan-1970 00:00:01 GMT'
      // document.cookie = 'Bearer' + '=' + ';path=' + '/' + ';domain=' + window.location.hostname + ';expires=Thu, 01-Jan-1970 00:00:01 GMT'
    },
    fetchingHelp(state) {
      state.fetchingHelp = true
    },
    fetchedHelp(state) {
      state.fetchingHelp = false
    },
    loadingList(state, payload) {
      state.loadingList = payload
    },
    listError(state, payload) {
      state.listError = true
      state.listErrorMessage = payload.message
    },
    consolidateUserData(state, payload) {
      state.userId = payload._id
      state.isLoggedIn = true
      state.userData = payload
    },
    consolidateHelpData(state, payload) {
      state.fetchingHelp = false
      state.helpData = payload
    },
    consolidateAllHelpsData(state, payload) {
      state.allHelpsData = payload
    },
    consolidateLiveStreamingData(state, payload) {
      state.liveStreaming = payload
    },
    consolidateInstagramData(state, payload) {
      state.instagram = payload
    }
  },
  actions: {
    checkLogin(context) {
      let token = localStorage.getItem('letshero-tkn')
      this.dispatch('fetchUserData')
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        this.dispatch('fetchUserData')
      } else {
        axios.defaults.headers.common['Authorization'] = ''
      }
    },
    signUp(context, payload) {
      this.commit("isSigningUp")
      let url = `${process.env.VUE_APP_SERVER}/api-v1/register`
      console.log('signing up..')

      axios.post(url, payload, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('signed up!', res)
            this.dispatch('hasSignedUp')
            this.dispatch('logIn', { username: res.data.username, password: payload.password })
          } else {
            console.log('signup error!')
            this.commit('signupError', res)
          }
        })
        .catch(err => {
          console.log("signup error!")
          this.commit('signupError', err)
        })
    },
    logIn(context, payload) {
      this.commit("isLogging")
      let url = `${process.env.VUE_APP_SERVER}/api-v1/login`
      console.log('logging in..')
      axios.post(url, payload, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('logged', res)
            this.commit('performLogin', res.data)
          } else {
            console.log('login error!')
            this.commit('loginError', res)
          }
        })
        .catch(err => this.commit('loginError', err))
    },
    logOut() {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/logout`
      // this.commit('performLogOut')
      axios.get(url, { withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('logged out')
            this.commit('performLogOut')
          }
        })
    },
    addHelp(context, payload) {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/help`
      this.commit('isFindingAHero')
      console.log('adding help...', payload)
      let data = { payload: { ...payload }, id: this.state.userId }
      if (!this.state.userId) { return }
      axios.post(url, data, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('help added')
            this.commit('foundAHero')
            this.dispatch('fetchUserData')
            this.dispatch('fetchAllHelpData')
          } else {
            console.log('adding a help request error!')
            this.commit('errorFindingAHero', res)
          }
        })
        .catch(err => {
          this.commit('errorFindingAHero', err)
        })
    },
    fetchHelp(context, payload) {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/help/${payload}`
      this.commit('fetchingHelp')
      console.log('fetching help data...')
      axios.get(url, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('user data fetched', res)
            this.commit('consolidateHelpData', res.data)
            this.commit('fetchedHelp')
            this.dispatch('fetchAllHelpData')
          }
        })
    },
    helpSomeone(context, payload) {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/assume-help`
      this.commit('assumingHelp', true)
      console.log('assuming help...', payload)
      let data = { payload: { ...payload }, uid: this.state.userId }
      if (!this.state.userId) { return }
      axios.post(url, data, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('help assumed')
            this.commit('assumingHelp', false)
            this.dispatch('fetchUserData')
            this.dispatch('fetchAllHelpData')
            this.dispatch("fetchHelp", payload.help_id)
          } else {
            this.commit('assumingHelp', false)
            console.log('adding a help request error!')
          }
        })
        .catch(err => {
          this.commit('assumingHelp', false)
          console.log(err)
        })
    },
    completeHelp(context, payload) {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/complete-help`
      console.log('completing help...', payload)
      axios.post(url, payload, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('help completed')
            this.dispatch('fetchUserData')
            this.dispatch('fetchAllHelpData')
          } else {
            console.log('completed help request error!')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    editBooking(context, payload) {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/bookings`
      console.log('editing booking...', payload)
      let { id, ...newload } = payload
      let data = { payload: newload, id: payload.id }
      axios.put(url, data, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('booking updated')
            this.dispatch('fetchUserData')
            this.dispatch('fetchAllBookingsData')
          }
        })
    },
    deleteBooking(context, payload) {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/bookings`
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
            this.dispatch('fetchAllBookingsData')
          }
        })
    },
    fetchUserData() {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/userdata`
      let data = { id: this.state.userId }
      console.log('fetching user data...')
      axios.post(url, data, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('user data fetched', res)
            this.commit('consolidateUserData', res.data)
            this.dispatch('fetchAllHelpData')
          }
        })
    },
    fetchAllHelpData() {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/all-helps`
      console.log('fetching ALL helps data...')
      this.commit('loadingList', true)
      axios.get(url, { withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('fetched  ALL helps data.')
            this.commit('loadingList', false)
            this.commit('consolidateAllHelpsData', res.data)
          } else {
            this.commit('loadingList', false)
            this.commit('listError', res)
          }
        })
        .catch((err) => this.commit('listError', err))
    },
    evaluateHelp(context, payload) {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/evaluate-help`
      console.log('evaluating help...', payload)
      axios.post(url, payload, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('help evaluated!')
            this.dispatch('fetchUserData')
            this.dispatch('fetchAllHelpData')
          } else {
            console.log('evaluating a help request error!')
            this.commit('errorEvaluatingHelp', res)
          }
        })
        .catch(err => {
          this.commit('errorEvaluatingHelp', err)
        })
    }
  },
  modules: {
  }
})
