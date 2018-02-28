// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Toast from 'vue-easy-toast'

const IOTAPlugin = require('@/utils/IOTAPlugin').default
Vue.use(IOTAPlugin)
Vue.use(Toast)

// Directives (global)
require('@/directives/click-outside.js')
require('@/directives/toast.js')

// Styles (global)
require('@/styles/font-awesome.scss')
require('@/styles/layout.styl')

require('@/lib/identi-qrcode')
require('@/lib/iota')
require("@/utils/iota-node")

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
