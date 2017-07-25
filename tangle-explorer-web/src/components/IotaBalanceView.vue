<template lang="html">
  <span :title=' listUnit(value)'>{{ convertToUnits(value) }}</span>
</template>

<script>
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")

export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    pickUnit(value) {
      var values = {
        '1': 'i',
        '1000': 'Ki',
        '1000000': 'Mi',
        '1000000000': 'Gi',
        '1000000000000': 'Ti',
        '1000000000000000': 'Pi'
      }
      value = Math.abs(value)
      var closestAmount = Math.floor((value + "").length / 3) * 3
      var key = "1".padEnd(closestAmount + 1, "0")
      if(typeof values[key] !== undefined) {
        return values[key]
      }
      return 'Pi'
    },
    listUnit(value)
    {
      var unit = this.pickUnit(value)
      var values = {
        'i' : 'Iota',
        'Ki' : "Kilo Iota",
        "Mi" : "Mega Iota",
        "Gi" : "Giga Iota",
        "Ti" : "Tera Iota",
        "Pi" : "Peta Iota"
      }
      return `${iotaNode.iota.utils.convertUnits(value, 'i', unit)}` + " " + values[unit];
    },
    convertToUnits(value) {
      var unit = this.pickUnit(value)
      return `${iotaNode.iota.utils.convertUnits(value, 'i', unit)} ${unit}`
    }
  }
}
</script>

<style lang="css">
</style>
