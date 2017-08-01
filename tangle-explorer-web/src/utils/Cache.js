/*
  Universal in-memory cache with expiry check.
*/

export default class Cache {
  constructor() {
    this.cache = {}
    this.expires = {}
    this.lastCheck = 0
  }

  static time() {
    return new Date().getTime()
  }

  set(k, v, expireMS = 0) {
    this.cache[k] = v
    if(expireMS > 0) {
      this.expires[k] = Cache.time() + expireMS
    }
  }

  remove(k) {
    if(this.expires[k] !== undefined) {
      delete this.expires[k]
    }
    if(this.cache[k] !== undefined) {
      delete this.cache[k]
    }
  }

  context(k, fn, expireMS = 0) {
    if(this.has(k)) {
      return this.get(k)
    }
    else {
      var ret = fn()
      this.set(k, ret, expireMS)
      return ret
    }
  }

  expireCheck() {
    var t = Cache.time()
    if(t >= this.lastCheck) {
      for(var k of Object.keys(this.expires)) {
        var v = this.expires[k]
        if(t >= v) {
          delete this.cache[k]
          delete this.expires[k]
        }
      }
      this.lastCheck = t + 5000
    }
  }

  get(k) {
    var ret = this.cache[k]
    return ret
  }

  has(k) {
    return this.cache[k] !== undefined
  }
}
