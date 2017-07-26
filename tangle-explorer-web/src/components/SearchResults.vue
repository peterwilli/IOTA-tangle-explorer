<template lang="html">
  <div class='results' v-if="addrResults !== null || txResults !== null">
    <div class="result" v-if="txResults.length == 0 && addrResults == null">
      <div class="cut-text hash">
        <ceri-icon name="fa-search"></ceri-icon>
        <span class="result-cat">No transaction or address found</span>
      </div>
    </div>

    <div class="result" @click="goTo('Transaction', result.hash)" v-for="result in txResults">
      <div class="cut-text hash">
      <ceri-icon name="fa-hashtag"></ceri-icon>
      <span class="result-cat">Hash: </span>{{ result.hash }}
      </div>
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
        <ceri-icon name="fa-hashtag"></ceri-icon>
        <span class="result-cat">Bundle: </span>{{ result.hash }}
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
    RelativeTime,
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
