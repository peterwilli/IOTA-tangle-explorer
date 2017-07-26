require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")
const _ = require('lodash')

module.exports = (val, callbackTxs, callbackAddresses, callbackBundles, fullyDone) => {
  var callbackStack = 3
  var callbackCheck = () => {
    callbackStack--
    if(callbackStack === 0) {
      if(fullyDone !== undefined) {
        fullyDone()
      }
    }
  }

  iotaNode.iota.api.getBalances([val], 20, function(e, r) {
    if(r !== undefined) {
      var balance = parseInt(r.balances[0])
      iotaNode.iota.api.findTransactionObjects({ addresses: [val] }, function(e, r) {
        if(r !== undefined && r.length > 0) {
          callbackAddresses([{
            address: val,
            balance: balance
          }])
        }
        callbackCheck()
      })
    } else {
      callbackCheck()
    }
  })
  iotaNode.iota.api.getTransactionsObjects([val], function(e, r) {
    callbackTxs(_.filter(r, (tx) => {
      return tx.hash !== '999999999999999999999999999999999999999999999999999999999999999999999999999999999'
    }))
    callbackCheck()
  })
  iotaNode.iota.api.findTransactionObjects({ bundles: [val] }, function(e, r) {
    if(r !== undefined && r.length > 0) {
      callbackBundles([{
        hash: r[0].bundle
      }])
    }
    callbackCheck()
  })
}
