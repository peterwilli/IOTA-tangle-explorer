const log = require('@/utils/log')
const settings = require('@/utils/settings.js').default

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
    'provider': settings.get().nodeUrl
});
obj.iota = iota

var refreshNodeInfoTmr = null

obj.unsubscribe = (event) => {
  if(event === "node-info") {
    if(refreshNodeInfoTmr !== null) {
      clearInterval(refreshNodeInfoTmr)
      refreshNodeInfoTmr = null
    }
  }
}

obj.subscribe = (event) => {
  if(event === "node-info") {
    var refreshNodeInfo = function() {
      iota.api.getNodeInfo(function(error, success) {
          if (error) {
              log(error);
          } else {
              obj.nodeInfo = success
          }
      })
    }

    refreshNodeInfoTmr = setInterval(refreshNodeInfo, 2000)
    refreshNodeInfo()
  }
}
module.exports = obj
