<template lang="html">
  <div class='search'>
    <input v-on:keyup.enter="pickFirstResult()" @input="update" v-model="searchText" type='text' placeholder="Search transactions, adresses" />
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
  </div>
</template>

<script>
const _ = require('lodash')
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")
const iotaSearch = require('@/utils/iota-search-engine.js')

import IotaBalanceView from '@/components/IotaBalanceView.vue'
import RelativeTime from '@/components/RelativeTime.vue'

export default {
  components: {
    RelativeTime, IotaBalanceView
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
      if(this.addrResults !== null && this.addrResults.length > 0) {
        this.goTo('Address', this.addrResults[0].hash)
      }
      else if(this.txResults !== null && this.txResults.length > 0) {
        this.goTo('Transaction', this.txResults[0].hash)
      }
      this.close()
    },
    emptyResults() {
      this.addrResults = this.txResults = null
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
      })
    }, 300)
  },
  data() {
    return {
      txResults: null,
      addrResults: null,
      searchText: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.results
  position absolute
  left 1px
  right 1px
  background #fff

  .result:hover
    background #eee

  .result
    padding 5px
    cursor pointer
    .hash
      font-weight bold

.search
  position relative
  width 100%
  input
    border 1px solid #333
    padding 10px
</style>
