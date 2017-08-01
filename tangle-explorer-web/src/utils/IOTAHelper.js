const Cache = require('./Cache').default

export default class IOTAHelper {
  constructor(iota) {
    this.iota = iota
  }

  async getLatestInclusion(hashes, cb) {
    return new Promise(function(resolve, reject) {
      iotaNode.iota.api.getLatestInclusion(txHashes, function(e, r) {
        resolve(_.map(r, (ri) => {
          return !!ri
        }))
      })
    })
  }
}
