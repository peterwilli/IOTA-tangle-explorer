const store = require('store')
const defaultSettings = {
  nodeUrl: 'https://node.iota.dance:443'
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
