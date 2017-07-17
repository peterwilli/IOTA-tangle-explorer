const moment = require('moment')

module.exports = {
  install(Vue, options) {
    Vue.prototype.$relativeTimestamp = function (timestamp) {
      return moment(timestamp * 1000).fromNow()
    }

    Vue.prototype.$localeTimestamp = function (timestamp) {
      return moment(timestamp * 1000).format()
    }

    Vue.prototype.$getStyleIO = function(h1, h2) {
      if(h1 === h2) {
        return 'font-weight: bold'
      }
    }
  }
}
