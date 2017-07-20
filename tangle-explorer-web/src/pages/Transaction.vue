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
          <ceri-icon name="fa-clock-o"></ceri-icon> <relative-time :timestamp="tx.timestamp"></relative-time>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="addr-box">
        <div class="qr">
          <identi-qr :size='500' :contents="$getQRCode(tx.address)"></identi-qr>
        </div>
        <div class="addr mono-space">
          <router-link :to="{ name: 'Address', params: { hash: tx.address }}">{{ tx.address }}</router-link>
        </div>
      </div>
      <div class="tx-info stretch mobile">
        <div class="name">
          Hash
        </div>
        <div class="value mono-space">
          <click-to-select :text='tx.hash'></click-to-select>
        </div>
        <div class="name">
          Status
        </div>
        <div class="value mono-space">
          <tx-status :hash="tx.hash"></tx-status>
        </div>
        <div class="name">
          Tag
        </div>
        <div class="value mono-space">
          <click-to-select :text='tx.tag'></click-to-select>
        </div>
        <div class="name">
          Value
        </div>
        <div class="value">
          <iota-balance-view :value='tx.value'></iota-balance-view>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <legend>
      Transaction I/O
    </legend>
    <div class="tx-io" v-if="txIO && (txIO.inputs.length + txIO.outputs.length) > 0">
      <tx-io :txIO='txIO' :viewingHash='tx.address'></tx-io>
    </div>
    <div class="absence error" v-else>
      No Tx I/O found :(
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
              <td class="val mono-space"><iota-balance-view :value='tx.value'></iota-balance-view></td>
          </tr>
          <tr>
              <td>Tag</td>
              <td class="val mono-space">{{ tx.tag }}</td>
          </tr>
          <tr>
            <td>Timestamp</td>
            <td class="val mono-space">{{ $localeTimestamp(tx.timestamp) }} (<relative-time :timestamp="tx.timestamp"></relative-time>)</td>
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

import IotaBalanceView from '@/components/IotaBalanceView.vue'
import TxIo from '@/components/TXIo.vue'
import IdentiQr from '@/components/IdentiQR.vue'
import ExpandBox from '@/components/ExpandBox.vue'
import RelativeTime from '@/components/RelativeTime.vue'
import ClickToSelect from '@/components/ClickToSelect.vue'
import TxStatus from '@/components/TxStatus.vue'

export default {
  components: {
    IdentiQr,
    ExpandBox,
    TxIo,
    RelativeTime,
    IotaBalanceView,
    TxStatus,
    ClickToSelect
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
