<template lang="html">
  <div class="container search-page" v-if="!searching">
    <legend>
      Results
    </legend>
    <search-results v-if="addrResults !== null || txResults !== null || bundleResults !== null" :bundleResults='bundleResults' :txResults='txResults' :addrResults='addrResults'></search-results>
    <div class="absence error" v-else>
      No transaction or address found :(
    </div>
  </div>
  <div v-else class="container page-loading">
    <pulse-loader :color="'#000'" size='30px'></pulse-loader>
  </div>
</template>

<script>
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")
const iotaSearch = require('@/utils/iota-search-engine.js')

import SearchResults from '@/components/SearchResults.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    SearchResults,
    PulseLoader
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
    }, () => {
      _this.searching = false
    })
  },
  data() {
    return {
      searching: true,
      txResults: null,
      addrResults: null,
      bundleResults: null
    }
  }
}
</script>

<style lang="stylus">
.search-page
  .results
    right 0
    top 37px
    background #fff

    .result:hover
      background #eee

    .result
      padding 5px
      padding-left 10px
      cursor pointer
      .result-cat
        font-weight bold
</style>
