<template lang="html">
  <div class='tx container' v-if="tx">
    <div class="tx-box">
      <div class='title'>
        <div class="addr-box-title">
          Address
        </div>
        <div class="tx-info-title">
          Transaction Info
        </div>
        <div class="right">
          <ceri-icon name="fa-clock-o"></ceri-icon> {{ $relativeTimestamp(tx.timestamp) }}
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="addr-box">
        <div class="qr">
          <identi-qr :size='500' :contents="tx.address"></identi-qr>
        </div>
        <div class="addr mono-space">
          {{ tx.address }}
        </div>
      </div>
      <div class="tx-info">
        <div class="name">
          Hash
        </div>
        <div class="value mono-space">
          {{ tx.hash }}
        </div>
        <div class="name">
          Tag
        </div>
        <div class="value mono-space">
          {{ tx.tag }}
        </div>
        <div class="name">
          Value
        </div>
        <div class="value">
          {{ tx.value }}
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <legend>
      Transaction I/O
    </legend>
    <div class="tx-io" v-if="txIO">
      <expand-box :max-height='250'>
        <div slot="content" class="io-content">
          <div class="inputs">
            <div class="input" v-for="tx in txIO.inputs">
              <div class="hash mono-space">
                <router-link :to="{ name: 'Transaction', params: { hash: tx.hash }}">{{ tx.hash }}</router-link>
              </div>
            </div>
          </div>
          <div class="arrow">
            <ceri-icon name="fa-arrow-circle-o-right"></ceri-icon>
          </div>
          <div class="outputs">
            <div class="output" v-for="tx in txIO.outputs">
              <div class="hash mono-space">
                <router-link :to="{ name: 'Transaction', params: { hash: tx.hash }}">{{ tx.hash }}</router-link>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
      </expand-box>
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
              <td class="val mono-space"><router-link :to="{ name: 'Transaction', params: { hash: tx.trunkTransaction }}">{{ tx.trunkTransaction }}</router-link></td>
         </tr>
          <tr>
              <td>Branch Transaction Hash</td>
              <td class="val mono-space"><router-link :to="{ name: 'Transaction', params: { hash: tx.branchTransaction }}">{{ tx.branchTransaction }}</router-link></td>
         </tr>
          <tr>
              <td>Bundle Hash</td>
              <td class="val mono-space"><router-link :to="{ name: 'Bundle', params: { hash: tx.bundle }}">{{ tx.bundle }}</router-link></td>
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
import IdentiQr from '@/components/IdentiQR.vue'
import ExpandBox from '@/components/ExpandBox.vue'

export default {
  components: {
    Identicon,
    IdentiQr,
    ExpandBox
  },
  methods: {
    getIOFromTX(tx) {
      iotaNode.iota.api.findTransactionObjects({ bundles: [tx.bundle] }, (e, r) => {
        var inputs = []
        var outputs = []
        for(var i = 0; i < r.length; i++) {
          var tx = r[i]
          var isInput = tx.currentIndex > 0
          if(isInput) {
            inputs.push(tx)
          }
          else {
            outputs.push(tx)
          }
        }
        this.txIO = { inputs, outputs }
      })
    },
    getQRAddress() {
      return '{"address":"'+ this.tx.address +'","amount":"","message":"","tag":""}'
    },
    initTX() {
      var _this = this
      iotaNode.iota.api.getTransactionsObjects([this.$route.params.hash], function(e, r) {
        _this.tx = r[0]
        _this.getIOFromTX(r[0])
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
      txIO: null,
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

.tx-io
  padding: 8px
  .inputs, .outputs
    width 40%
    word-break break-all

  .inputs
    float left

  .outputs
    float right

  .arrow
    float left
    width 20%
    font-size 50px
    text-align center
    color: #1fb02e

.tx-box
  word-break break-all
  background #fff

  .tx-info
    width auto
    padding 5px
    overflow:hidden
    .name
      font-weight bold
    .value
      word-break break-all
      font-size 15px

  .addr-box
    float left
    width 244px
    .qr
      width 100%
    .addr
      font-size 15px
      word-break break-all

  .title
    height 40px

    .tx-info-title, .addr-box-title
      font-weight bold

    .tx-info-title
      float left
      width auto

    .addr-box-title
      float left
      width 244px

    padding 10px
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
