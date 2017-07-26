<template lang="html">
  <div v-click-outside="close" class='search-field'>
    <input class="search-input" v-on:keyup.enter="pickFirstResult()" v-on:keyup.esc="emptyResults()" @input="update" v-model="searchText" type='text' placeholder="Search transactions, addresses" />
    <search-results :click='close' v-if="addrResults !== null || txResults !== null || bundleResults !== null" :bundleResults='bundleResults' :txResults='txResults' :addrResults='addrResults'></search-results>
  </div>
</template>

<script>
const _ = require('lodash')
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")
const iotaSearch = require('@/utils/iota-search-engine.js')

import IotaBalanceView from '@/components/IotaBalanceView.vue'
import RelativeTime from '@/components/RelativeTime.vue'
import SearchResults from '@/components/SearchResults.vue'

export default {
  components: {
    RelativeTime, IotaBalanceView, SearchResults
  },
  methods: {
    goTo(name, hash) {
      this.$router.push({
        name: name,
        params: {
          hash
        }
      })
    },
    pickFirstResult() {
      if(this.searchText.length === 0) {
        return
      }
      if(this.addrResults !== null && this.addrResults.length > 0) {
        this.goTo('Address', this.addrResults[0].address)
      }
      else if(this.txResults !== null && this.txResults.length > 0) {
        this.goTo('Transaction', this.txResults[0].hash)
      }
      else if(this.bundleResults !== null && this.bundleResults.length > 0) {
        this.goTo('Bundle', this.bundleResults[0].hash)
      }
      else {
        this.$router.push({
          name: 'Search',
          params: {
            query: this.searchText
          }
        })
      }
      this.close()
    },
    emptyResults() {
      this.bundleResults = this.addrResults = this.txResults = null
    },
    close() {
      this.emptyResults()
      this.searchText = ''
    },
    update: _.debounce(function (e) {
      this.emptyResults()
      var val = e.target.value.trim()
      var _this = this
      iotaSearch(val, (txs) => {
        _this.txResults = txs
      }, (addresses) => {
        _this.addrResults = addresses
      }, (bundles) => {
        _this.bundleResults = bundles
      })
    }, 300)
  },
  data() {
    return {
      txResults: null,
      addrResults: null,
      bundleResults: null,
      searchText: ''
    }
  }
}
</script>

<style lang="stylus">
.search-field
  .results
    position absolute
    width 80%
    right 0
    top 37px
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

<style lang="stylus" scoped>
.search
  width 100%
  input
    border 1px solid #333
    padding 10px
    width 80%
    float right
</style>
