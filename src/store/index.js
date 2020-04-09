import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
    userId: '',
    userData: {},
    bookingsData: [],
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
      localStorage.setItem('tkn', payload.token)
      axios.defaults.headers.common['Authorization'] = `JWT ${payload.token}`
      console.log('before dispatch fetch', localStorage.getItem('tkn'), axios.defaults.headers.common['Authorization'], payload.token)
      this.dispatch('fetchUserData')
      state.isLogging = false
      state.isLoggedIn = true
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
      localStorage.removeItem('tkn')
      axios.defaults.headers.common['Authorization'] = ''
    },
    consolidateUserData(state, payload) {
      state.userId = payload._id
      state.isLoggedIn = true
      state.userData = payload
    },
    consolidateBookingsData(state, payload) {
      state.bookingsData = payload
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
      let token = localStorage.getItem('tkn')
      if (token) {
        axios.defaults.headers.common['Authorization'] = `JWT ${token}`
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
    fetchHelpData() {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/bookings`
      console.log('fetching bookings data...')
      axios.get(url, { withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('fetched bookings data.')
            this.commit('consolidateBookingsData', res.data)
          }
        })
    },
    fetchAllHelpData() {
      let url = `${process.env.VUE_APP_SERVER}/api-v1/all-helps`
      console.log('fetching ALL helps data...')
      axios.get(url, { withCredentials: true })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('fetched  ALL helps data.')
            this.commit('consolidateAllHelpsData', res.data)
          }
        })
    },
    fetchLiveStreamingData() {
      // let ytId = `UCyhZSljGzQ5da_u-n2uR--Q`
      // let apiKey = `AIzaSyAXGRFq8s2EKP4g_LFIk7zuZf9MHivJ9DI`
      // let url = `https://www.googleapis.com/youtube/v3/search?eventType=live&part=snippet&channelId=${ytId}&type=video&key=${apiKey}`
      // console.log('fetching live streaming data...')
      // axios.get(url)
      //   .then(res => {
      //     if (res.status === 200) {
      //       console.log('fetched  live streams data', res.data)
      //       if (res.data !== this.state.liveStreaming) {
      //         this.commit('consolidateLiveStreamingData', res.data)
      //       }
      //     }
      //   })
      // let twitchID = `86av2s62mqsu19zptacf7ly00t4l0f`
      // let url = `https://api.twitch.tv/helix/streams?user_login=dhruid`
      // console.log('fetching live streaming data...')
      // axios.get(url, { headers: { 'Client-ID': twitchID } })
      //   .then(res => {
      //     if (res.status === 200) {
      //       console.log('fetched  live streams data', res.data)
      //       if (res.data !== this.state.liveStreaming) {
      //         this.commit('consolidateLiveStreamingData', res.data)
      //       }
      //     }
      //   })
    },
    fetchInstagramData() {
      // let url = `https://www.instagram.com/dhruidmusic/?__a=1`
      // console.log('fetching instagram data...')
      // axios.get(url)
      //   .then(res => {
      //     if (res.status === 200) {
      //       let images = res.data.graphql.user.edge_owner_to_timeline_media.edges.slice(0, 9).map(el => {
      //         let url = `https://instagram.com/dhruidmusic/p/${el.node.shortcode}`
      //         let image = el.node.thumbnail_src
      //         let text = el.node.edge_media_to_caption.edges[0].node.text
      //         return { 'image': image, 'text': text.length > 160 ? text.substring(0, 160) + '...' : text, 'link': url }
      //       })
      //       console.log('fetched  instagram data', images)
      //       this.commit('consolidateInstagramData', images)
      //     }
      //   })
    }
  },
  modules: {
  }
})
