// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import colors from 'vuetify/es5/util/colors'
import { store } from './store'
import DateFilter from './filters/date'
import axios from 'axios'

Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.darken1,
    secondary: colors.green.darken2,
    accent: colors.pink.lighten1,
    neutral: colors.white,
    grey: colors.grey.lighten1,
    error: colors.red.darken1
  }
})

// Moment.js
window.moment = require('moment')
window.moment.locale('pt-br')

// Axios
window.axios = require('axios')
window.axios.defaults.headers.common['Accept'] = 'application/json'

Vue.config.productionTip = false

Vue.filter('dateFilter', DateFilter)

// Route Guards
// router.beforeEach(
//   (to, from, next) => {
//     document.title = to.meta.title
//     if (to.matched.some(record => record.meta.forVisitors)) {
//       if (store.getters.token) {
//         next({
//           path: '/home'
//         })
//       } else next()
//     } else if (to.matched.some(record => record.meta.forAuth)) {
//       if (!store.getters.token) {
//         next({
//           path: '/login'
//         })
//       } else next()
//     } else next()
//   }
// )

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
