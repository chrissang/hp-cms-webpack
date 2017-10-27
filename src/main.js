import Vue from 'vue'
import App from './App.vue'
// import Sortable from 'vue-sortable';
//
// Vue.use(Sortable);

var foundation = require('../node_modules/foundation/foundation.min');

new Vue({
  el: '#app',
  render: h => h(App)
})
