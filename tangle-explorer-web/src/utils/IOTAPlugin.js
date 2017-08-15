const moment = require('moment')
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")

export default {
  install(Vue, options) {
    Vue.prototype.$localeTimestamp = function (timestamp) {
      return moment(timestamp * 1000).format()
    }

    Vue.prototype.$getQRCode = function (address) {
      var json = {
        address,
        amount: '',
        message: ''
      }
      return JSON.stringify(json)
    }

    Vue.prototype.$getStyleIO = function (h1, h2) {
      if (h1 === null || h2 === null) {
        return
      }
      if (iotaNode.iota.utils.noChecksum(h1) === iotaNode.iota.utils.noChecksum(h2)) {
        return 'font-weight: bold; font-style:italic'
      }
    }
  }
}
