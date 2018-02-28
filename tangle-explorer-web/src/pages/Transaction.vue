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
          <i class="fa fa-clock-o"></i> <relative-time :timestamp="tx.timestamp"></relative-time>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="addr-box">
        <div class="qr">
          <identi-qr :size='500' :contents="$getQRCode(tx.address)"></identi-qr>
        </div>
        <div class="addr mono-space">
          <router-link :title='tx.address' :to="{ name: 'Address', params: { hash: tx.address }}">{{ tx.address }}</router-link>
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
      Transaction Details
    </legend>
    <table class="striped">
      <tbody>
          <tr>
              <td title="Hash of the current Transaction" width="20%">Transaction Hash</td>
              <td class="val mono-space">{{ tx.hash }}</td>
          </tr>
          <tr>
            <td title="The Output Address of all spent inputs, before change is returned">Address</td>
            <td class="val mono-space"><router-link :title='tx.address' :to="{ name: 'Address', params: { hash: tx.address }}">{{ tx.address }}</router-link></td>
          </tr>
          <tr>
              <td title="Value transferred in this Transaction">Value</td>
              <td class="val mono-space"><iota-balance-view :value='tx.value'></iota-balance-view></td>
          </tr>
          <tr>
              <td title="Tag sent with this Transaction, encoded in Trytes">Tag</td>
              <td class="val mono-space">{{ tx.tag }}</td>
          </tr>
          <tr>
            <td title="Time at which this Transaction was generated">Timestamp</td>
            <td class="val mono-space">{{ $localeTimestamp(tx.timestamp) }} (<relative-time :timestamp="tx.timestamp"></relative-time>)</td>
          </tr>
          <tr>
              <td title="The current Transaction Index in the current Bundle">Current Index in Bundle</td>
              <td class="val mono-space">{{ tx.currentIndex }}</td>
          </tr>
          <tr>
              <td title="The last Transaction Index in the current Bundle">Last Index of Bundle</td>
              <td class="val mono-space">{{ tx.lastIndex }}</td>
          </tr>
          <tr>
              <td title="Hash of the Trunk Transaction which this tranasction approves">Trunk Transaction Hash</td>
              <td class="val mono-space"><router-link :title='tx.trunkTransaction' :to="{ name: 'Transaction', params: { hash: tx.trunkTransaction }}">{{ tx.trunkTransaction }}</router-link></td>
         </tr>
          <tr>
              <td title="Hash of the Branch Transaction which this Tranasction approves">Branch Transaction Hash</td>
              <td class="val mono-space"><router-link :title='tx.branchTransaction' :to="{ name: 'Transaction', params: { hash: tx.branchTransaction }}">{{ tx.branchTransaction }}</router-link></td>
         </tr>
          <tr>
              <td td="Hash of the Bundle which this Transaction is contained in">Bundle Hash</td>
              <td class="val mono-space"><router-link :title='tx.bundle' :to="{ name: 'Bundle', params: { hash: tx.bundle }}">{{ tx.bundle }}</router-link></td>
          </tr>
          <tr>
              <td title="Value to verify Proof of Work">Nonce</td>
              <td class="val mono-space">{{ tx.nonce }}</td>
          </tr>
          <tr >
              <td title="Message sent with this transaction, encoded in trytes">Message or Signature</td>
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
    <legend>
      Position in Tangle
    </legend>
    <tangle-graph :txs='[tx]' :viewingHash='tx.hash' :viewingTrunkHash='tx.trunkTransaction' :viewingBranchHash='tx.branchTransaction'></tangle-graph>
  </div>

  <div class="page-loading" v-else>
    <pulse-loader :color="'#000'" size='30px'></pulse-loader>
  </div>
</template>

<script>
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")
const txToIO = require('@/utils/tx-to-io.js').default

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import IotaBalanceView from '@/components/IotaBalanceView.vue'
import TxIo from '@/components/TXIo.vue'
import IdentiQr from '@/components/IdentiQR.vue'
import ExpandBox from '@/components/ExpandBox.vue'
import RelativeTime from '@/components/RelativeTime.vue'
import ClickToSelect from '@/components/ClickToSelect.vue'
import TxStatus from '@/components/TxStatus.vue'
import TangleGraph from '@/components/TangleGraph.vue'

export default {
  components: {
    IdentiQr,
    ExpandBox,
    TxIo,
    RelativeTime,
    IotaBalanceView,
    TxStatus,
    ClickToSelect,
    TangleGraph,
    PulseLoader
  },
  methods: {
    getIOFromTX() {
      var _this = this
      iotaNode.iota.api.findTransactionObjects({ bundles: [this.tx.bundle] }, (e, r) => {
        console.log('eeee', e, r);
        (async() => {
          var ios = await txToIO(r)
          console.log(ios);
          _this.txIO = ios[0]
        })()
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


.loading
  text-align center
  padding 25px

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
    line-height 28px

  .arrow
    position absolute
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width 5%
    text-align center
    color: #2C3E50

    .arrow-icon
      width 100%

.tx-box
  word-break break-all
  background #fff

  .tx-info
    width auto
    padding 5px
    padding-top 0px
    padding-left 12px
    overflow:hidden
    .name
    {
      font-weight bold
      margin-bottom 2px
    }
    .value
      word-break break-all
      font-size 16px
      letter-spacing 1px

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
      letter-spacing 1px
      word-break break-all
      margin-top 4px

  .title
    height 40px
    margin-bottom 10px

    .tx-info-title, .addr-box-title
      font-weight bold

    .tx-info-title
      float left
      width auto

    .addr-box-title
      float left
      width 244px

    padding 10px
    background #f9f9f9
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
