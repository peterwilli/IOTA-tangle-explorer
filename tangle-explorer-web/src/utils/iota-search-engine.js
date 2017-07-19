require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")
const _ = require('lodash')

module.exports = (val, callbackTxs, callbackAddresses) => {
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
      })
    }
  })
  iotaNode.iota.api.getTransactionsObjects([val], function(e, r) {
    callbackTxs(_.filter(r, (tx) => {
      return tx.hash !== '999999999999999999999999999999999999999999999999999999999999999999999999999999999'
    }))
  })
}
