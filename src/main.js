import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'

Vue.config.productionTip = false

let serverURL = ''

function setServerURL () {
  if (process.env.NODE_ENV === 'development') {
    serverURL = 'http://localhost:3000'
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
