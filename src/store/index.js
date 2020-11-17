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
    hasEdited: false,
    verifySuccess: false,
    isAskingReset: false,
    askedReset: false,
    askingResetError: false,
    coords: null,
    language: { iso: 'en', title: 'English' },
    availableLangs: [
      { iso: 'en', title: 'English' },
      { iso: 'pt', title: 'Português' },
      { iso: 'es', title: 'Español' }],
    localeStrings: require('../../data/strings-en.json')
  },
  mutations: {
    performLogin(state, payload) {
      state.loginError = false
      state.userId = payload._id
      // Vue.$cookies.set('Bearer', payload.token)
      localStorage.setItem('letshero-tkn', payload.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`
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
      state.hasEdited = true
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
    },
    setLanguage(state, payload) {
      this.state.language = payload
      this.state.localeStrings = require(`../../data/strings-${payload.iso}.json`)
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

      axios.post(url, payload, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.status === 200) {
            this.dispatch('hasSignedUp')
            this.dispatch('logIn', { username: res.data.username, password: payload.password })
          } else {
            console.log('signup error!')
            this.commit('signupError', res)
          }
        })
        .catch(err => {
          console.log('signup error!')
          this.commit('signupError', err)
        })
    },
    logIn(context, payload) {
      this.commit("isLogging")
      let url = `${process.env.VUE_APP_SERVER}/api-v1/login`
      axios.post(url, payload, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.status === 200) {
            this.commit('performLogin', res.data)
          } else {
            console.log('login error!')
            this.commit('loginError', res)
          }
        })
        .catch(err => {
          console.log('login error!')
          this.commit('loginError', err.response)
        })
    },
    logOut() {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/logout`
      // this.commit('performLogOut')
      axios.get(url, { withCredentials: true })
        .then(res => {
          if (res.status === 200) {
            this.commit('performLogOut')
          }
        })
    },
    addHelp(context, payload) {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/help`
      this.commit('isFindingAHero')
      let data = { payload: { ...payload }, id: this.state.userId }
      if (!this.state.userId) { return }
      axios.post(url, data, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.status === 200) {
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
      axios.get(url, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.status === 200) {
            this.commit('consolidateHelpData', res.data)
            this.commit('fetchedHelp')
            this.dispatch('fetchAllHelpData')
          }
        })
    },
    helpSomeone(context, payload) {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/assume-help`
      this.commit('assumingHelp', true)
      let data = { payload: { ...payload }, uid: this.state.userId }
      if (!this.state.userId) { return }
      axios.post(url, data, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.status === 200) {
            this.commit('assumingHelp', false)
            this.dispatch('fetchUserData')
            this.dispatch('fetchAllHelpData')
            this.dispatch("fetchHelp", payload.help_id)
          } else {
            console.log('assuming a help request error!')
            this.commit('assumingHelp', false)
          }
        })
        .catch(err => {
          this.commit('assumingHelp', false)
          console.log(err)
        })
    },
    completeHelp(context, payload) {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/complete-help`
      axios.post(url, payload, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.status === 200) {
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
          if (res.status === 200) {
            this.commit("hasEdited")
            if (payload.token) {
              this.commit('performLogin', { _id: res.data._id, token: payload.token })
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
    fetchUserData() {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/userdata`
      let data = { id: this.state.userId }
      axios.post(url, data, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.status === 200) {
            this.commit('consolidateUserData', res.data)
            this.dispatch('fetchAllHelpData')
          }
        })
    },
    async fetchAllHelpData(context, payload) {
      let self = this
      let url = `${process.env.VUE_APP_SERVER}/api-v1/all-helps/${(payload && payload.page) || 1}`

      let getPosition = function(options) {
        if (!self.state.coords) {
          return new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options)
          })
        }
      }
      try {
        var position = await getPosition()
      } catch (err) {
        console.log(err)
        self.state.coords = { lat: 0, lng: 0 }
      }

      if (position) { self.state.coords = { lat: position.coords.latitude, lng: position.coords.longitude } }
      self.commit('loadingList', true)
      axios.post(url, { location: self.state.coords }, { withCredentials: true })
        .then(res => {
          if (res.status === 200) {
            self.commit('loadingList', false)
            if (!payload || (payload && payload.page === 1)) {
              self.commit('consolidateAllHelpsData', res.data.docs)
            } else {
              if (res.data.docs.length > 0) {
                self.commit('increaseListPage')
                self.commit('paginatedAllHelpsData', res.data.docs)
              }
            }
          } else {
            self.commit('loadingList', false)
            self.commit('listError', res)
          }
        })
        .catch((err) => self.commit('listError', err))
    },
    evaluateHelp(context, payload) {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/evaluate-help`
      axios.post(url, payload, { headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true })
        .then(res => {
          if (res.status === 200) {
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
      axios.defaults.headers.common['Authorization'] = `Bearer ${payload}`
      axios.get(url, { withCredentials: true })
        .then(res => {
          if (res.status === 200) {
            this.commit('verifySuccess')
            this.commit('performLogin', { _id: res.data._id, token: payload })
            this.dispatch('fetchUserData')
          } else {
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
      this.commit('isAskingReset')
      let data = { email: payload.email }
      axios.post(url, data, { headers: {
        'Content-Type': 'application/json'
      } })
        .then(res => {
          if (res.status === 200) {
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
    },
    checkBrowserLanguage(context) {
      switch (navigator.language) {
      case 'pt':
        this.commit('setLanguage', { iso: 'pt', title: 'Português' })
        break
      case 'pt-BR':
        this.commit('setLanguage', { iso: 'pt', title: 'Português' })
        break
      case 'es':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-AR':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-BO':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-CL':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-CO':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-CR':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-DO':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-EC':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-SV':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-GT':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-HN':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-MX':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-NI':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-PA':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-PY':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-PE':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-PR':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-ES':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-UY':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      case 'es-VE':
        this.commit('setLanguage', { iso: 'es', title: 'Español' })
        break
      default:
        this.commit('setLanguage', { iso: 'en', title: 'English' })
        break
      }
    },
    setLanguage(context, payload) {
      this.commit('setLanguage', payload)
    }
  },
  modules: {
  }
})
