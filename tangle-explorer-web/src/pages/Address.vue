<template lang="html">
  <div class='tx container' v-if="addr.balances && addr.transactions">
    <div class="tx-box">
      <div class='title hidden mobile'>
        <div class="addr-box-title">
          Address
        </div>
        <div class="tx-info-title">
          Summary
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="addr-box">
        <div class="qr">
          <identi-qr :size='500' :contents="$getQRCode($route.params.hash)"></identi-qr>
        </div>
        <div slot='content' class="addr mono-space">
          <click-to-select :text='$route.params.hash'></click-to-select>
        </div>
      </div>
      <div class="tx-info stretch mobile">
        <div class="name">
          Total balance
        </div>
        <div class="value mono-space">
          <iota-balance-view :value='addr.balances[0]'></iota-balance-view>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <legend>
      Recent Transactions
    </legend>
    <div class="tx-io" v-if="txIOs">
      <div class="tx-item" v-for="txIO in txIOs" v-if="txIO.inputs.length > 0">
        <tx-io :viewingHash='hash' :txIO="txIO"></tx-io>
      </div>
    </div>
  </div>
  <div class="loading" v-else>

  </div>
</template>

<script>
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")
const txToIO = require('@/utils/tx-to-io.js').default
const _ = require('lodash')

import TxIo from '@/components/TXIo.vue'
import Identicon from '@/components/Identicon.vue'
import IdentiQr from '@/components/IdentiQR.vue'
import ExpandBox from '@/components/ExpandBox.vue'
import RelativeTime from '@/components/RelativeTime.vue'
import ClickToSelect from '@/components/ClickToSelect.vue'
import IotaBalanceView from '@/components/IotaBalanceView.vue'
import TxStatus from '@/components/TxStatus.vue'

export default {
  components: {
    Identicon,
    IdentiQr,
    ExpandBox,
    TxIo,
    RelativeTime,
    ClickToSelect,
    TxStatus,
    IotaBalanceView
  },
  methods: {
    initAddr() {
      var _this = this
      iotaNode.iota.api.getBalances([this.$route.params.hash], 20, function(e, r) {
        _this.addr.balances = _.map(r.balances, (balance) => {
          return parseInt(balance)
        })
      })
      iotaNode.iota.api.findTransactionObjects({
        addresses: [this.$route.params.hash]
      }, function(e, r) {
        _this.addr.transactions = r
        var bundles = _.uniq(_.map(r, (tx) => {
          return tx.bundle
        }))
        iotaNode.iota.api.findTransactionObjects({
          bundles
        }, function(e, r) {
          _this.txIOs = txToIO(r)
        })
      })
    }
  },
  mounted() {
    this.initAddr()
  },
  watch: {
    '$route.params.hash': function() {
      this.initAddr()
    }
  },
  data() {
    return {
      addr: {
        balances: null,
        transactions: null
      },
      txIOs: null,
      hash: this.$route.params.hash
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../styles/media-mixin.styl"

.tx-item
  padding 5px
  &:nth-child(even){background-color: #f2f2f2}

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
