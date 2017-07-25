import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Transaction from '@/pages/Transaction'
import Address from '@/pages/Address'
import Search from '@/pages/Search'
import Bundle from '@/pages/Bundle'
import Settings from '@/pages/Settings'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/bundle/:hash',
      name: 'Bundle',
      component: Bundle
    },
    {
      path: '/tx/:hash',
      name: 'Transaction',
      component: Transaction
    },
    {
      path: '/addr/:hash',
      name: 'Address',
      component: Address
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
    {
      path: '/search/:query',
      name: 'Search',
      component: Search
    }
  ],
});
