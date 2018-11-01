import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import common from "./common/index";

const state = {};

// getters
const getters = {};

const actions = {};

const mutations = {};

export default new Vuex.Store({
  modules: {
    common
  },
  state,
  getters,
  actions,
  mutations,
});
