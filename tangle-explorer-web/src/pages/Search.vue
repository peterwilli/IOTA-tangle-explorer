<template lang="html">
  <div class="container">
    <legend>
      Results
    </legend>
    <search-results v-if="addrResults !== null && txResults !== null && bundleResults !== null" :bundleResults='bundleResults' :txResults='txResults' :addrResults='addrResults'></search-results>
    <div class="absence error" v-else>
      No transaction or address found :(
    </div>
  </div>
</template>

<script>
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")
const iotaSearch = require('@/utils/iota-search-engine.js')

import IotaBalanceView from '@/components/IotaBalanceView.vue'
import RelativeTime from '@/components/RelativeTime.vue'
import SearchResults from '@/components/SearchResults.vue'

export default {
  components: {
    SearchResults
  },
  mounted() {
    var val = this.$route.params.query
    var _this = this
    iotaSearch(val, (txs) => {
      _this.txResults = txs
    }, (addresses) => {
      _this.addrResults = addresses
    }, (bundles) => {
      _this.bundleResults = bundles
    })
  },
  data() {
    return {
      txResults: null,
      addrResults: null,
      bundleResults: null
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  position relative
</style>
