const txSort = require('@/utils/tx-sort-timestamp.js')
export default (r) => {
  r.sort(txSort)
  var res = {}
  var txCache = {}
  for(var i = 0; i < r.length; i++) {
    var tx = r[i]
    if(!res[tx.bundle]) {
      res[tx.bundle] = { inputs: [], outputs: [] }
    }
    // Cache is being used for making sure no duplicated transactions from re-attached bundles show up in the i/o gui.
    var cacheKey = `${tx.bundle}${tx.value}${tx.tag}`
    if(txCache[cacheKey] === undefined) {
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
  return res
}
