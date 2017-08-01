export default class Cache {
  constructor() {
    this.cache = {}
    this.expires = {}
  }

  set(k, v, expireMS) {
    this.cache[k] = v
    if(expireMS > 0) {
      this.expires[k] = expireMS
    }
  }

  get(k) {
    return this.cache[k]
  }

  has(k) {
    return this.cache[k] !== undefined
  }
}
