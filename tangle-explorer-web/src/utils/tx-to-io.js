export default (r) => {
  var res = {}
  for(var i = 0; i < r.length; i++) {
    var tx = r[i]
    if(!res[tx.bundle]) {
      res[tx.bundle] = { inputs: [], outputs: [] }
    }
    var isInput = tx.value < 0
    var isOutput = tx.value > 0
    if(isInput) {
      res[tx.bundle].inputs.push(tx)
    }
    else if(isOutput) {
      res[tx.bundle].outputs.push(tx)
    }
  }
  res = Object.values(res)
  return res
}
