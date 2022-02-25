import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import Default from "./layouts/Default"
import NoNavBar from './layouts/NoNavBar.vue'


Vue.config.productionTip = false

Vue.component('default-layout', Default)
Vue.component('no-navbar-layout', NoNavBar)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
