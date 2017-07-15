<template lang="html">
  <div class='tx container' v-if="tx">
    <div class="tx-box">
      <div class='title'>
        <div class="right">
          <ceri-icon name="fa-clock-o"></ceri-icon> {{ $relativeTimestamp(tx.timestamp) }}
        </div>
        <div style="clear:both"></div>
      </div>
      <table>
        <tbody>
            <tr>
                <td width="20%">Transaction Hash</td>
                <td width="50"></td>
                <td class="val mono-space">{{ tx.hash }}</td>
            </tr>
            <tr>
              <td width="20%">Address</td>
              <td width="50">
                <identicon :seed='tx.address' :size="50"></identicon>
              </td>
              <td>
                <a :href="'/addr/' + tx.address">{{ tx.address }}</a>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
    <legend>
      Transaction details
    </legend>
    <table class="striped">
      <tbody>
          <tr>
              <td width="20%">Transaction Hash</td>
              <td class="val mono-space">{{ tx.hash }}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td class="val mono-space"><a :href="'/addr/' + tx.address">{{ tx.address }}</a></td>
          </tr>
          <tr>
              <td>Value</td>
              <td class="val mono-space">{{ tx.value }}</td>
          </tr>
          <tr>
              <td>Tag</td>
              <td class="val mono-space">{{ tx.tag }}</td>
          </tr>
          <tr>
            <td>Timestamp</td>
            <td class="val mono-space">{{ $localeTimestamp(tx.timestamp) }} ({{ $relativeTimestamp(tx.timestamp) }})</td>
          </tr>
          <tr>
              <td>Current Index in Bundle</td>
              <td class="val mono-space">{{ tx.currentIndex }}</td>
          </tr>
          <tr>
              <td>Last Index of Bundle</td>
              <td class="val mono-space">{{ tx.lastIndex }}</td>
          </tr>
          <tr>
              <td>Trunk Transaction Hash</td>
              <td class="val mono-space"><a :href="'/tx/' + tx.trunkTransaction">{{ tx.trunkTransaction }}</a></td>
         </tr>
          <tr>
              <td>Branch Transaction Hash</td>
              <td class="val mono-space"><a :href="'/tx/' + tx.branchTransaction">{{ tx.branchTransaction }}</a></td>
         </tr>
          <tr>
              <td>Bundle Hash</td>
              <td class="val mono-space"><a :href="'/bundle/' + tx.bundle">{{ tx.bundle }}</a></td>
          </tr>
          <tr>
              <td>Nonce</td>
              <td class="val mono-space">{{ tx.nonce }}</td>
          </tr>
          <tr data-toggle="collapse" data-target="#sig" class="clickable">
              <td>Message or Signature (click to show)</td>
              <td class="val mono-space">
                <div class="accordion-body collapse" id="sig">
                  {{ tx.signatureMessageFragment }}
                </div>
              </td>
          </tr>
      </tbody>
    </table>
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
table.striped {
    border-collapse: collapse;
    width: 100%;
    th, td {
        text-align: left;
        padding: 8px;
    }
    tr:nth-child(even){background-color: #f2f2f2}
}

legend {
  border-bottom 1px solid #595959
  padding 5px
  font-size 25px
  margin-top 15px
  color #595959
}

.tx-box
  word-break break-all
  background #fff

  .title
    padding 5px
    background rgb(222, 222, 222)
    .left
      float left
      width 80%

    .right
      width 20%
      float right
      text-align right
      font-weight bold

.val
  word-break break-all
</style>
