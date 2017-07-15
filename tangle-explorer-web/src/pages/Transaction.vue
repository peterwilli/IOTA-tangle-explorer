<template lang="html">
  <div class='tx container' v-if="tx">
    <p align="center">
      <identicon :seed='tx.address' :size="150"></identicon>
      <table class="wrap-table table table-striped">
        <tbody>
            <tr>
                <td>Transaction Hash</td>
                <td class="val">{{ tx.hash }}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td class="val"><a :href="'/addr/' + tx.address">{{ tx.address }}</a></td>
            </tr>
            <tr>
                <td>Value</td>
                <td class="val">{{ tx.value }}</td>
            </tr>
            <tr>
                <td>Tag</td>
                <td class="val">{{ tx.tag }}</td>
            </tr>
            <tr>
              <td>Timestamp</td>
              <td class="val">{{ $localeTimestamp(tx.timestamp) }} ({{ $relativeTimestamp(tx.timestamp) }})</td>
            </tr>
            <tr>
                <td>Current Index in Bundle</td>
                <td class="val">{{ tx.currentIndex }}</td>
            </tr>
            <tr>
                <td>Last Index of Bundle</td>
                <td class="val">{{ tx.lastIndex }}</td>
            </tr>
            <tr>
                <td>Trunk Transaction Hash</td>
                <td class="val"><a :href="'/tx/' + tx.trunkTransaction">{{ tx.trunkTransaction }}</a></td>
           </tr>
            <tr>
                <td>Branch Transaction Hash</td>
                <td class="val"><a :href="'/tx/' + tx.branchTransaction">{{ tx.branchTransaction }}</a></td>
           </tr>
            <tr>
                <td>Bundle Hash</td>
                <td class="val"><a :href="'/bundle/' + tx.bundle">{{ tx.bundle }}</a></td>
            </tr>
            <tr>
                <td>Nonce</td>
                <td class="val">{{ tx.nonce }}</td>
            </tr>
            <tr data-toggle="collapse" data-target="#sig" class="clickable">
                <td>Message or Signature (click to show)</td>
                <td class="val">
                  <div class="accordion-body collapse" id="sig">
                    {{ tx.signatureMessageFragment }}
                  </div>
                </td>
            </tr>
        </tbody>
    </table>
    </p>
  </div>
  <div class="loading" v-else>

  </div>
</template>

<script>
require('@/lib/iota')
var iotaNode = require("@/utils/iota-node")
import Identicon from '@/components/Identicon.vue'

export default {
  components: {
    Identicon
  },
  methods: {
    initTX() {
      var _this = this
      iotaNode.iota.api.getTransactionsObjects([this.$route.params.hash], function(e, r) {
        _this.tx = r[0]
      })
    }
  },
  mounted() {
    this.initTX()
  },
  watch: {
    '$route.params.hash': function() {
      this.initTX()
    }
  },
  data() {
    return {
      hash: this.$route.params.hash,
      tx: null
    }
  }
}
</script>

<style lang="stylus" scoped>
.val
  word-break break-all
  font-family: "Courier New", Courier, monospace
</style>
