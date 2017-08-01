const Cache = require('./Cache').default
const _ = require('lodash')

export default class IOTAHelper {
  constructor(iota) {
    this.iota = iota
    this.cache = new Cache()
  }

  async getLatestInclusion(txHashes) {
    var _this = this
    return new Promise(function(resolve, reject) {
      var keepSort = {}
      var i = 0
      for(var txHash of txHashes) {
        keepSort[txHash] = i
        i++
      }
      _this.cache.expireCheck()
      var toFetchFromNode = _.filter(txHashes, (txHash) => {
        return !_this.cache.has(`GLI-${txHash}`)
      })
      var toFetchFromCache = _.filter(txHashes, (txHash) => {
        return _this.cache.has(`GLI-${txHash}`)
      })

      var resultsFromCache = _.map(toFetchFromCache, (txHash) => {
        return _this.cache.get(`GLI-${txHash}`)
      })

      var next = (resultsFromNode) => {
        // Create empty array with enough to store a sorted result list
        var res = Object.values(keepSort)
        var i = 0
        for(var hash of toFetchFromCache) {
          var v = keepSort[hash]
          res[v] = resultsFromCache[i]
          i++
        }
        i = 0
        for(var hash of toFetchFromNode) {
          var v = keepSort[hash]
          res[v] = toFetchFromNode[i]
          _this.cache.set(`GLI-${hash}`, res[v], res[v] ? 60000 : 5000)
          i++
        }
        resolve(res)
      }

      if(toFetchFromNode.length > 0) {
        _this.iota.api.getLatestInclusion(toFetchFromNode, function(e, r) {
          var resultsFromNode = _.map(r, (ri) => {
            return !!ri
          })
          next(resultsFromNode)
        })
      }
      else {
        next([])
      }
    })
  }
}
