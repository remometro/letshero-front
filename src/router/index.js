import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import FindAHero from '../views/FindAHero.vue'
import Map from "../views/Map.vue"
import List from "../views/List.vue"
import Profile from "../views/Profile.vue"
import ComingSoon from "../views/ComingSoon.vue"
import Manifesto from "../views/Manifesto.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ComingSoon
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/find-a-hero',
    name: 'findAHero',
    component: FindAHero
  },
  {
    path: '/map',
    name: 'Map',
    component: Map
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/manifesto',
    name: 'Manifesto',
    component: Manifesto
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
