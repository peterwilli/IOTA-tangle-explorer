const log = require('@/utils/log')

// The global object for node info etc.
var obj = {
  nodeInfo: {
    appName: null,
    appVersion: null,
    jreAvailableProcessors: null,
    jreFreeMemory: null,
    jreVersion: null,
    jreMaxMemory: null,
    jreTotalMemory: null,
    latestMilestone: null,
    latestMilestoneIndex: null,
    latestSolidSubtangleMilestone: null,
    latestSolidSubtangleMilestoneIndex: null,
    neighbors: null,
    packetsQueueSize: null,
    time: null,
    tips: null,
    transactionsToRequest: null,
    duration: null
  }
}

// Create IOTA instance directly with provider
var iota = new IOTA({
    'provider': 'http://iota.bitfinex.com:80'
});
obj.iota = iota

var refreshNodeInfo = function() {
  iota.api.getNodeInfo(function(error, success) {
      if (error) {
          log(error);
      } else {
          obj.nodeInfo = success
      }
  })
}

setInterval(refreshNodeInfo, 2000)
refreshNodeInfo()

module.exports = obj
