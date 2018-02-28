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
          <i class="fa fa-clock-o" style="float:left; margin-right: 5px"></i> <relative-time :timestamp="txIO.inputs[0].timestamp"></relative-time>
        </div>
        <div class="item">
          ({{txIO.inputs.length}} Input<span v-if="txIO.inputs.length > 1">s</span> - {{txIO.outputs.length}} Output<span v-if="txIO.outputs.length > 1">s</span>)
        </div>
        <div class="clearfix"></div>
      </div>

      <div class="inputs">
        <div class="input" v-for="tx in txIO.inputs">
          <div class="io-link">
            <router-link class="mono-space io-link" :style="$getStyleIO(tx.address, viewingHash)" :title='tx.address' :to="{ name: 'Address', params: { hash: tx.address }}">{{ tx.address }}</router-link>
            <span class="iota-val" :class="getValColor(tx.value)"><iota-balance-view :value='tx.value'></iota-balance-view></span>
          </div>
          <span class="iota-val" :class="getValColor(tx.value)"><iota-balance-view :value='tx.value'></iota-balance-view></span>
          <router-link class="mono-space io-link" :title='tx.hash' :to="{ name: 'Transaction', params: { hash: tx.hash }}"><span class="tx-button">TX</span></router-link>
        </div>
      </div>
      <div ref="arrow" class="arrow">
        <i class="fa fa-arrow-right arrow-icon"></i>
      </div>
      <div class="outputs">
        <div class="output" v-for="tx in txIO.outputs">
          <div class="hash">
            <div class="io-link">
              <router-link class="mono-space io-link" :style="$getStyleIO(tx.address, viewingHash)" :title='tx.address' :to="{ name: 'Transaction', params: { hash: tx.hash }}">{{ tx.address }}</router-link>
            </div>
            <span class="iota-val" :class="getValColor(tx.value)"><iota-balance-view :value='tx.value'></iota-balance-view></span>
            <router-link class="mono-space io-link" :title='tx.hash' :to="{ name: 'Transaction', params: { hash: tx.hash }}"><span class="tx-button">TX</ceri-icon></span></router-link>
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

import IotaBalanceView from '@/components/IotaBalanceView.vue'
import IdentiQr from '@/components/IdentiQR.vue'
import ExpandBox from '@/components/ExpandBox.vue'
import RelativeTime from '@/components/RelativeTime.vue'
import TxStatus from '@/components/TxStatus.vue'

export default {
  components: {
    IdentiQr,
    ExpandBox,
    IotaBalanceView,
    RelativeTime,
    TxStatus
  },
  props: ['txIO', 'viewingHash'],
  methods: {
    getValColor(v)
    {
      return v > 0 ? "iota-val-positive" : "iota-val-negative"
    }
  }
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

  .tx-button
    background-color #F7B657
    padding 4px
    border-radius 2px
    color white
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-weight 600

  .tx-button, .iota-val
      box-shadow 0 3px 6px -1px rgba(0,0,0,0.12), 0 10px 36px -4px rgba(77,96,232,0)

.hash, .input
  margin-bottom 8px

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
