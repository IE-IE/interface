import Vue from 'vue';
import Vuex from 'vuex';

import chitin from './chitin';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    chitin
  },
  strict: debug
});
