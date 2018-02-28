const store = require('store')
const defaultSettings = {
  nodeUrl: 'http://node01.testnet.iotatoken.nl:16265'
}

export default {
  resetToDefault() {
    store.remove('settings')
  },
  set(settings) {
    store.set('settings', settings)
  },
  get() {
    return Object.assign({}, defaultSettings, store.get('settings'))
  }
}
