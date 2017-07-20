<template lang="html">
  <expand-box :max-height='250' v-if="(txIO.inputs.length + txIO.outputs.length) > 0">
    <div slot="content" class="io-content">
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

      <div class="inputs">
        <div class="input" v-for="tx in txIO.inputs">
          <div class="io-link">
            <router-link class="mono-space io-link" :style="$getStyleIO(tx.address, viewingHash)" :to="{ name: 'Transaction', params: { hash: tx.hash }}">{{ tx.address }}</router-link>
          </div>
          <span class="iota-val"><iota-balance-view :value='tx.value'></iota-balance-view></span>
        </div>
      </div>
      <div ref="arrow" class="arrow">
        <ceri-icon class="arrow-icon" name="fa-arrow-circle-o-right"></ceri-icon>
      </div>
      <div class="outputs">
        <div class="output" v-for="tx in txIO.outputs">
          <div class="hash">
            <div class="io-link">
              <router-link class="mono-space io-link" :style="$getStyleIO(tx.address, viewingHash)" :to="{ name: 'Transaction', params: { hash: tx.hash }}">{{ tx.address }}</router-link>
            </div>
            <span class="iota-val"><iota-balance-view :value='tx.value'></iota-balance-view></span>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </expand-box>
</template>

<script>
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")
const txToIO = require('@/utils/tx-to-io.js').default

import IotaBalanceView from '@/components/IotaBalanceView.vue'
import Identicon from '@/components/Identicon.vue'
import IdentiQr from '@/components/IdentiQR.vue'
import ExpandBox from '@/components/ExpandBox.vue'
import RelativeTime from '@/components/RelativeTime.vue'
import TxStatus from '@/components/TxStatus.vue'

export default {
  components: {
    Identicon,
    IdentiQr,
    ExpandBox,
    IotaBalanceView,
    RelativeTime,
    TxStatus
  },
  props: ['txIO', 'viewingHash']
}
</script>

<style lang="stylus" scoped>
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

.tx-top
  margin-bottom 5px
  margin-top 5px
  .item
    border-left 1px solid rgba(#000000, 0.75)
    padding-left 5px
    &:first-child
      border-left 0
      padding-left 0

    float left
    margin-right 5px
</style>
