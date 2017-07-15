// Key extraction for converting regular objects to null objects for Vue to wrap getters/setters on.
// Useful during development.

module.exports = (obj) => {
  var keys = Object.keys(obj)
  var ks = []
  for(var k of keys) {
    ks.push(`${k}: null`)
  }
  return ks.join(',\n')
}
