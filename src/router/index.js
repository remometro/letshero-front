import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import FindAHero from '../views/FindAHero.vue'
import Map from "../views/Map.vue"
import List from "../views/List.vue"
import Profile from "../views/Profile.vue"
import Help from "../views/Help.vue"
import WhoImHelping from "../views/WhoImHelping.vue"
import WhoIsHelpingMe from "../views/WhoIsHelpingMe.vue"
import Manifesto from "../views/Manifesto.vue"
import Settings from "../views/Settings.vue"
import Verify from "../views/Verify.vue"
import Forgot from "../views/Forgot.vue"
import Reset from "../views/Reset.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
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
    component: () => import(/* webpackChunkName: "about" */ '../views/Logout.vue')
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
    path: '/help/:id',
    name: 'Help',
    component: Help
  },
  {
    path: '/who-im-helping',
    name: 'WhoImHelping',
    component: WhoImHelping
  },
  {
    path: '/who-is-helping-me',
    name: 'WhoIsHelpingMe',
    component: WhoIsHelpingMe
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/manifesto',
    name: 'Manifesto',
    component: Manifesto
  },
  {
    path: '/verify/:token',
    name: 'Verify',
    component: Verify
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot
  },
  {
    path: '/reset/:token',
    name: 'Reset',
    component: Reset
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)
  // const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '')

    return tag
  })
  // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag))

  next()
})

export default router
