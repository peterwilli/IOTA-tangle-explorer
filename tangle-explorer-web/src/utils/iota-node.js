const log = require('@/utils/log')

// The global object for node info etc.
var obj = {
  nodeInfo: {
    latestMilestone: null
  }
}

// Create IOTA instance directly with provider
var iota = new IOTA({
    'provider': 'http://iota.bitfinex.com:80'
});

// now you can start using all of the functions
iota.api.getNodeInfo(function(error, success) {
    if (error) {
        log(error);
    } else {
        obj.nodeInfo = success
    }
})

module.exports = obj
