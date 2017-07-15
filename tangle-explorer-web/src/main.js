// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

const IOTAPlugin = require('@/utils/IOTAPlugin')
Vue.use(IOTAPlugin)

// Styles (global)
require('@/styles/layout.styl')
require("document-register-element")
window.customElements.define("ceri-icon", require("ceri-icon"))

require('@/lib/iota')
require("@/utils/iota-node")

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
