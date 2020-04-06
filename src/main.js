import Vue from 'vue'
import './assets/scss/main.scss'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'

Vue.config.productionTip = false

let serverURL = ''

function setServerURL() {
  if (process.env.NODE_ENV === 'development') {
    serverURL = 'http://localhost:3000'
  } else {
    serverURL = 'https://dhruid.com'
  }

  window.serverURL = serverURL
}

setServerURL()

// axios.defaults.withCredentials = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.directive('click-outside', {
  bind() {
    this.event = event => this.vm.$emit(this.expression, event)
    this.el.addEventListener('click', this.stopProp)
    document.body.addEventListener('click', this.event)
  },
  unbind() {
    this.el.removeEventListener('click', this.stopProp)
    document.body.removeEventListener('click', this.event)
  },

  stopProp(event) { event.stopPropagation() }
})
