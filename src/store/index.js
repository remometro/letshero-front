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
    baseUrl: process.env.VUE_APP_URL || 'https://letshero.com',
    paginatedAllHelpsData: [],
    currentListPage: 1,
    isEditing: false,
    editError: false,
    editErrorMessage: 'Something went wrong! Please try again later.',
    verifyError: false,
    verifySuccess: false,
    isAskingReset: false,
    askedReset: false,
    askingResetError: false
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
      if (payload && (payload.status === 400 || payload.status === 401)) {
        state.loginErrorMessage = "Invalid username or password"
      } else {
        payload.message ? state.loginErrorMessage = payload.message : state.loginErrorMessage = 'Something went wrong! Please try again later.'
      }
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
    isEditing(state) {
      state.isEditing = true
    },
    editError(state, payload) {
      state.isEditing = false
      state.editError = true
      payload.message ? state.editErrorMessage = payload.message : state.editErrorMessage = 'Something went wrong! Please try again later.'
    },
    hasEdited(state) {
      state.isEditing = false
      state.editError = false
    },
    performLogOut(state) {
      state.isLoggedIn = false
      state.userId = ''
      state.userData = {}
      state.allHelpsData = []
      state.paginatedAllHelpsData = []
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
    },
    paginatedAllHelpsData(state, payload) {
      state.paginatedAllHelpsData = state.paginatedAllHelpsData.concat(payload)
    },
    increaseListPage(state) {
      state.currentListPage++
    },
    verifySuccess(state) {
      state.verifyError = false
      state.verifySuccess = true
    },
    verifyError(state) {
      state.verifyError = true
      state.verifySuccess = false
    },
    askedReset(state) {
      state.isAskingReset = false
      state.askedReset = true
    },
    askingResetError(state) {
      state.isAskingReset = false
      state.askingResetError = true
    },
    isAskingReset(state) {
      state.isAskingReset = true
      state.askingResetError = false
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
        .catch(err => {
          this.commit('loginError', err.response)
          console.log("login error!", err.response)
        })
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
    editProfile(context, payload) {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/profile`
      console.log('editing profile...', payload)
      this.commit('isEditing')
      if (payload.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`
      }
      let data = { payload: { ...payload }, id: this.state.userId }
      axios.put(url, data, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('profile updated')
            this.commit("hasEdited")
            if (payload.token) {

            }
            this.dispatch('fetchUserData')
            this.dispatch('fetchAllHelpsData')
          } else {
            this.commit('editError', res)
            console.log('update profile request error!')
          }
        })
        .catch(err => {
          this.commit('editError', err)
          console.log(err)
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
    async fetchAllHelpData(context, payload) {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/all-helps/${(payload && payload.page) || 1}`

      let getPosition = function(options) {
        return new Promise(function(resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options)
        })
      }
      getPosition()
        .then((position) => {
          let coords = { lat: position.coords.latitude, lng: position.coords.longitude }
          console.log('fetching ALL helps data... page', (payload && payload.page) || 1, coords)
          this.commit('loadingList', true)
          axios.post(url, { location: coords }, { withCredentials: true })
            .then(res => {
              if (res.statusText === 'OK') {
                console.log('fetched  ALL helps data.')
                this.commit('loadingList', false)
                if (!payload || (payload && payload.page === 1)) {
                  this.commit('consolidateAllHelpsData', res.data.docs)
                } else {
                  if (res.data.docs.length > 0) {
                    this.commit('increaseListPage')
                    this.commit('paginatedAllHelpsData', res.data.docs)
                  }
                }
              } else {
                this.commit('loadingList', false)
                this.commit('listError', res)
              }
            })
            .catch((err) => this.commit('listError', err))
        })
        .catch((err) => {
          console.error(err.message)
        })
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
    },
    verifyEmail(context, payload) {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/verify`
      console.log('verifying email...')
      axios.defaults.headers.common['Authorization'] = `Bearer ${payload}`
      axios.get(url, { withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('verified')
            this.commit('verifySuccess')
            this.commit('performLogin', { _id: res.data._id, token: payload })
            this.dispatch('fetchUserData')
          } else {
            console.log('verification error')
            this.commit('verifyError')
          }
        })
        .catch(err => {
          console.log(err)
          console.log('verification error')
          this.commit('verifyError')
        })
    },
    askReset(context, payload) {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/reset`
      console.log('asking password reset...', payload)
      this.commit('isAskingReset')
      let data = { email: payload.email }
      axios.post(url, data, { headers: {
        'Content-Type': 'application/json'
      } })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('password reset sent!')
            this.commit("askedReset")
          } else {
            this.commit('askingResetError')
            console.log('asking reset error!')
          }
        })
        .catch(err => {
          this.commit('askingResetError')
          console.log('asking reset error!')
          console.log(err)
        })
    }
  },
  modules: {
  }
})
