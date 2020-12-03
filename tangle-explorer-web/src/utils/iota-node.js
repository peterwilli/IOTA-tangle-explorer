const log = require('@/utils/log')
const settings = require('@/utils/settings.js').default

import { composeAPI } from '@iota/core'
import { convertUnits } from '@iota/unit-converter'

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
const iota = composeAPI({
  provider: settings.get().nodeUrl
})

iota.getNodeInfo()
    .then(info => console.log(info))
    .catch(error => {
        console.log(`Request error: ${error.message}`)
    })
obj.iota = {
  api: iota,
  utils: {
    convertUnits
  }
}

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
      iota.getNodeInfo(function(error, success) {
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
export default obj
