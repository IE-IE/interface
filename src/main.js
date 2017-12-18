// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueConfig from 'vue-configuration';
import router from './router';
import store from './store';

import App from './App';
import config from './config';

Vue.use(VueResource);
Vue.use(VueConfig, { config });

Vue.config.productionTip = false;
Vue.http.options.root = config.httpRoot;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
