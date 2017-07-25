const store = require('store')
const defaultSettings = {
  nodeUrl: 'https://n1.iota.nu:443'
}

export default {
  set(settings) {
    store.set('settings', settings)
  },
  get() {
    return Object.assign({}, defaultSettings, store.get('settings'))
  }
}
