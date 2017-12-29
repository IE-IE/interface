import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Loader from '@/components/Loader/Loader';
import Editor from '@/components/Editor/Editor';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loader',
      component: Loader
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    }
  ]
});
