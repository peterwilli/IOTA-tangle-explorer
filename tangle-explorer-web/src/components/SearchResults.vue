<template lang="html">
  <div class='results' v-if="addrResults !== null || txResults !== null">
    <div class="result" @click="goTo('Transaction', result.hash);close();" v-for="result in txResults">
      <div class="cut-text hash">{{ result.hash }}</div>
      <div class="cut-text address">
        <ceri-icon name="fa-user"></ceri-icon>
        {{ result.address }}
      </div>
      <div class="cut-text time">
        <ceri-icon name="fa-clock-o"></ceri-icon>
        <relative-time :timestamp="result.timestamp"></relative-time>
      </div>
    </div>

    <div class="result" @click="goTo('Address', result.hash);close();" v-for="result in addrResults">
      <div class="cut-text hash">
        <ceri-icon name="fa-user"></ceri-icon>
        {{ result.address }}
      </div>
      <div class="cut-text balance">
        <iota-balance-view :value='result.balance'></iota-balance-view>
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
  props: ['addrResults', 'txResults'],
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
    }
  }
}
</script>

<style lang="css">
</style>
