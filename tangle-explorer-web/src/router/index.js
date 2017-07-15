import Vue from 'vue';
import Router from 'vue-router';
import NodeInfo from '@/pages/NodeInfo';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NodeInfo',
      component: NodeInfo,
    },
  ],
});
