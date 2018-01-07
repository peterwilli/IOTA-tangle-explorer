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

var txsAreConfirmed = async function(txHashes) {
  var ret = {}
  var getConfirms = async (txHashes) => {
    return new Promise(function(resolve, reject) {
      iotaNode.iota.api.getLatestInclusion(txHashes, function(e, r) {
        resolve(_.map(r, (ri) => {
          return !!ri
        }))
      })
    })
  }
  var responses = await getConfirms(txHashes)
  var i = 0
  for(var hash of txHashes) {
    ret[hash] = responses[i]
    i++
  }
  return ret
}

export default async (r) => {
  var res = {}
  var txCache = {}
  var txHashes = []
  for(var i = 0; i < r.length; i++) {
    var tx = r[i]
    txHashes.push(tx.hash)
  }
  var confirmedCache = await txsAreConfirmed(txHashes)
  var showConfirmedOnly = false
  for(var k in confirmedCache) {
    if(confirmedCache[k]) {
      // When none of the transactions are confirmed, we can show unconfirmed ones too.
      // When there is at least one confirmed transaction, we're better off just showing the confirmed transaction.
      // Because the rest might be a promote or reattach transaction
      showConfirmedOnly = true
      break
    }
  }
  for(var i = 0; i < r.length; i++) {
    var tx = r[i]
    if(!res[tx.bundle]) {
      res[tx.bundle] = { inputs: [], outputs: [] }
    }
    // Cache is being used for making sure no duplicated transactions from re-attached bundles show up in the i/o gui.
    var cacheKey = `${tx.bundle}${tx.value}${tx.tag}${tx.address}`
    if(txCache[cacheKey] === undefined) {
      var shouldAdd = false
      if(showConfirmedOnly) {
        var isConfirmed = confirmedCache[tx.hash]
        if(isConfirmed) {
          shouldAdd = true
        }
      }
      else {
        shouldAdd = true
      }
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
  res = Object.values(res)
  res = _.filter(res, (txs) => {
    return (txs.inputs.length + txs.outputs.length) > 0
  })
  res.sort((a, b) => {
    return b.inputs[0].timestamp - a.inputs[0].timestamp
  })
  return res
}
