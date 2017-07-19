<template lang="html">
  <div class="container">
    <div class="tx-io" v-if="txIOs">
      <div class="tx-item" v-for="txIO in txIOs" v-if="txIO.inputs.length > 0">
        <div class="tx-top">
          <!-- I assume that all the timestamps of a transaction in a bundle are close to eachother,
           so that taking the first timestamp and displaying that as complete time of bundle is good enough. -->
           <div class="item">
             <tx-status :hash="txIO.inputs[0].hash"></tx-status>
           </div>
           <div class="item">
            <ceri-icon style="float:left; margin-right: 5px" name="fa-clock-o"></ceri-icon> <relative-time :timestamp="txIO.inputs[0].timestamp"></relative-time>
          </div>
          <div class="clearfix"></div>
        </div>
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
import TxStatus from '@/components/TxStatus.vue'
import RelativeTime from '@/components/RelativeTime.vue'
import TxIo from '@/components/TXIo.vue'

export default {
  components: {
    TxStatus,
    RelativeTime,
    TxIo
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
        _this.txIOs = txToIO(r)
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
