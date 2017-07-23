<template lang="html">
  <div class='results' v-if="addrResults !== null || txResults !== null">
    <div class="result" @click="goTo('Transaction', result.hash)" v-for="result in txResults">
      <div class="cut-text hash"><span class="result-cat">Hash: </span>{{ result.hash }}</div>
      <div class="cut-text address">
        <ceri-icon name="fa-user"></ceri-icon>
        <span class="result-cat">Address: </span> {{ result.address }}
      </div>
      <div class="cut-text time">
        <ceri-icon name="fa-clock-o"></ceri-icon>
        <relative-time :timestamp="result.timestamp"></relative-time>
      </div>
    </div>

    <div class="result" @click="goTo('Address', result.address)" v-for="result in addrResults">
      <div class="cut-text address">
        <ceri-icon name="fa-user"></ceri-icon>
        <span class="result-cat">Address: </span>{{ result.address }}
      </div>
      <div class="cut-text balance">
        <span class="result-cat">Balance: </span><iota-balance-view :value='result.balance'></iota-balance-view>
      </div>
    </div>

    <div class="result" @click="goTo('Bundle', result.hash)" v-for="result in bundleResults">
      <div class="cut-text hash">
        {{ result.hash }}
      </div>
    </div>
  </div>
</template>

<script>
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")
const iotaSearch = require('@/utils/iota-search-engine.js')

import IotaBalanceView from '@/components/IotaBalanceView.vue'
import RelativeTime from '@/components/RelativeTime.vue'

export default {
  props: ['addrResults', 'bundleResults', 'txResults', 'click'],
  components: {
    IotaBalanceView,
    RelativeTime
  },
  methods: {
    goTo(name, hash) {
      this.$router.push({
        name: name,
        params: {
          hash
        }
      })
      if(this.click !== undefined) {
        this.click()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.results
  position absolute
  left 0px
  right 0px
  background #fff
  border-left 1px solid #121728
  border-right 1px solid #121728
  border-bottom 1px solid #121728

  .result:hover
    background #eee

  .result
    padding 5px
    padding-left 10px
    cursor pointer
    .result-cat
      font-weight bold
</style>
