import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'

import { APIgetUser } from '@/API'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/sign',
    name: 'Sign',
    component: () => import('../views/Sign.vue'),
    meta: {
      layout: 'no-navbar'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.fullPath === "/?logged=true") {
    APIgetUser()
    .then(user => store.commit("setUser", user))
    next("/")
  } else {
    next()
  }
})

export default router
