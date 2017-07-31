const txSort = require('@/utils/tx-sort-timestamp.js')
const _ = require('lodash')
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")

var txIsConfirmed = async function(txHash) {
  return new Promise(function(resolve, reject) {
    iotaNode.iota.api.getLatestInclusion([txHash], function(e, r) {
      resolve(!!r[0])
    })
  })
}

export default async (r) => {
  var res = {}
  var txCache = {}
  for(var i = 0; i < r.length; i++) {
    var tx = r[i]
    if(!res[tx.bundle]) {
      res[tx.bundle] = { inputs: [], outputs: [] }
    }
    // Cache is being used for making sure no duplicated transactions from re-attached bundles show up in the i/o gui.
    var cacheKey = `${tx.bundle}${tx.value}${tx.tag}${tx.address}`
    if(txCache[cacheKey] === undefined) {
      var isConfirmed = await txIsConfirmed(tx.hash)
      if(isConfirmed) {
        txCache[cacheKey] = null
        var isInput = tx.value < 0
        var isOutput = tx.value > 0
        if(isInput) {
          res[tx.bundle].inputs.push(tx)
        }
        else if(isOutput) {
          res[tx.bundle].outputs.push(tx)
        }
      }
    }
  }
  res = Object.values(res)
  res = _.filter(res, (txs) => {
    return (txs.inputs.length + txs.outputs.length) > 0
  })
  res.sort((a, b) => {
    return a.inputs[0].timestamp < b.inputs[0].timestamp
  })
  return res
}
