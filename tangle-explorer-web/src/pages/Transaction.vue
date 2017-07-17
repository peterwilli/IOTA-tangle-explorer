<template lang="html">
  <div class='tx container' v-if="tx">
    <div class="tx-box">
      <div class='title hidden mobile'>
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
      <div class="tx-info stretch mobile">
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
          <span class="iota-val">{{ tx.value }}</span>
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
              <div class="io-link">
                <router-link class="mono-space io-link" :style="$getStyleIO(hash, tx.hash)" :to="{ name: 'Transaction', params: { hash: tx.hash }}">{{ tx.hash }}</router-link>
              </div>
              <span class="iota-val">{{ tx.value }}</span>
            </div>
          </div>
          <div ref="arrow" class="arrow">
            <ceri-icon class="arrow-icon" name="fa-arrow-circle-o-right"></ceri-icon>
          </div>
          <div class="outputs">
            <div class="output" v-for="tx in txIO.outputs">
              <div class="hash">
                <div class="io-link">
                  <router-link class="mono-space io-link" :style="$getStyleIO(hash, tx.hash)" :to="{ name: 'Transaction', params: { hash: tx.hash }}">{{ tx.hash }}</router-link>
                </div>
                <span class="iota-val">{{ tx.value }}</span>
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
            <td class="val mono-space"><router-link :to="{ name: 'Address', params: { hash: tx.address }}">{{ tx.address }}</router-link></td>
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
          <tr >
              <td>Message or Signature</td>
              <td class="val mono-space">
                <expand-box :max-height='250'>
                  <div slot="content">
                    {{ tx.signatureMessageFragment }}
                  </div>
                </expand-box>
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
const iotaNode = require("@/utils/iota-node")
const txToIO = require('@/utils/tx-to-io.js').default

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
    getIOFromTX() {
      iotaNode.iota.api.findTransactionObjects({ bundles: [this.tx.bundle] }, (e, r) => {
        this.txIO = txToIO(r)[0]
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
@import "../styles/media-mixin.styl"

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
    width 45%
    word-break break-all

  .inputs
    float left

  .outputs
    float right

  .io-link
    overflow hidden
    text-overflow ellipsis
    white-space: nowrap

  .arrow
    float left
    width 10%
    text-align center
    color: #1fb02e

    .arrow-icon
      width 100%

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

  +mobile()
    .addr-box
      margin 0 auto
      float none!important
      text-align center

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
      float right
      text-align right
      font-weight bold

.val
  word-break break-all
</style>
