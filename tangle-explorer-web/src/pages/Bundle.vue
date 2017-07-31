<template lang="html">
  <div class="container">
    <legend>
      Bundle info
    </legend>
    <div class="info">
      <div class="name">
        Hash
      </div>
      <div class="value mono-space">
        <click-to-select :text='$route.params.hash'></click-to-select>
      </div>
    </div>
    <legend>
      Bundle transactions
    </legend>
    <div class="tx-io" v-if="txIOs">
      <div class="tx-item" v-for="txIO in txIOs" v-if="txIO.inputs.length > 0">
        <tx-io :viewingHash='null' :txIO="txIO"></tx-io>
      </div>
    </div>
  </div>
</template>

<script>
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")
const txToIO = require('@/utils/tx-to-io.js').default
const _ = require('lodash')
import TxIo from '@/components/TXIo.vue'
import ClickToSelect from '@/components/ClickToSelect.vue'

export default {
  components: {
    TxIo,
    ClickToSelect
  },
  mounted() {
    this.initBundle()
  },
  methods: {
    initBundle() {
      var _this = this
      iotaNode.iota.api.findTransactionObjects({
        bundles: [this.$route.params.hash]
      }, function(e, r) {
        (async() => {
          _this.txIOs = await txToIO(r)
        })()
      })
    }
  },
  data() {
    return {
      txIOs: null
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
