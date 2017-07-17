<template lang="html">
  <expand-box :max-height='250' v-if="(txIO.inputs.length + txIO.outputs.length) > 0">
    <div slot="content" class="io-content">
      <div class="inputs">
        <div class="input" v-for="tx in txIO.inputs">
          <div class="io-link">
            <router-link class="mono-space io-link" :style="$getStyleIO(tx.address, viewingHash)" :to="{ name: 'Transaction', params: { hash: tx.hash }}">{{ tx.address }}</router-link>
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
              <router-link class="mono-space io-link" :style="$getStyleIO(tx.address, viewingHash)" :to="{ name: 'Transaction', params: { hash: tx.hash }}">{{ tx.address }}</router-link>
            </div>
            <span class="iota-val">{{ tx.value }}</span>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </expand-box>
</template>

<script>
import Identicon from '@/components/Identicon.vue'
import IdentiQr from '@/components/IdentiQR.vue'
import ExpandBox from '@/components/ExpandBox.vue'

export default {
  components: {
    Identicon,
    IdentiQr,
    ExpandBox
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
</style>
