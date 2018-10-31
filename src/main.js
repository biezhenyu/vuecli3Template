import Vue from 'vue';
import App from './App.vue';
import router from './router/router';

// import store from './store'     // vuex

import filters from './filters'; // 全局过滤器
Vue.prototype.$filters = filters;

// 引入api配置，组件中可通过(this.#api)调用
import api from './api';
Vue.prototype.$api = api;

// 引入工具类，组件中可通过(this.#util)调用
import util from './util';
Vue.prototype.$util = util;

// momnent
Vue.prototype.$moment = require('moment');

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
