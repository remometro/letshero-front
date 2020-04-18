import Vue from 'vue'
import './assets/scss/main.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueTheMask from 'vue-the-mask'
import * as VeeValidate from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import VueTelInput from 'vue-tel-input'

Vue.use(VueTelInput)

Vue.use(VueTheMask)
Vue.use(VeeValidate)

Object.keys(rules).forEach(rule => {
  VeeValidate.extend(rule, rules[rule])
})

VeeValidate.extend('required', {
  message: (field) => "Please fill " + field + " ."
})

VeeValidate.extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Passwords don\'t match'
})

VeeValidate.extend('isvideo', {
  params: ['target'],
  validate(value) {
    if (value !== undefined || value !== '') {
      var regExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm
      var match = value.match(regExp)
      if (match) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },
  message: 'This is not a valid youtube link.'
})

const isUniqueUser = (value) => {
  return axios.post(`${process.env.VUE_APP_SERVER}/api-v1/check-user`, { candidate: value }).then((response) => {
    // Notice that we return an object containing both a valid property and a data property.
    return {
      valid: (response.data.valid || store.state.userData.username === value),
      data: {
        message: "User not availableS"
      }
    }
  })
}

VeeValidate.extend('checkusername', {
  validate: isUniqueUser,
  getMessage: (field, params, data) => {
    return `User not available`
  },
  message: 'Heroname is not available'
})

let gMapsAPIKEY = process.env.NODE_ENV === "development" ? 'AIzaSyClxqoc_vuBbW4BcgARukp-t86uTVvSz0U' : 'AIzaSyDi_EQFS5kLRRj08KLH0w844aehqKNXOyw'

Vue.use(VueGoogleMaps, {
  load: {
    key: gMapsAPIKEY,
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    /// / If you want to set the version, you can do so:
    // v: '3.26',
  }

  /// / If you intend to programmatically custom event listener code
  /// / (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  /// / instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  /// / you might need to turn this on.
  // autobindAllEvents: false,

  /// / If you want to manually install components, e.g.
  /// / import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  /// / Vue.component('GmapMarker', GmapMarker)
  /// / then disable the following:
  // installComponents: true,
})

Vue.config.productionTip = false

// axios.defaults.withCredentials = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
