import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history'
})

var foundation = require('../node_modules/foundation/foundation.min');

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
