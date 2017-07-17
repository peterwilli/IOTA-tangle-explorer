<template lang="html">
  <form v-on:submit.prevent="onSubmit" class='search'>
    <input @input="update" v-model="searchText" type='text' placeholder="Search transactions, adresses" />
    <div class='results' v-if="results !== null">
      <div class="result" @click="goTo(result.hash);close();" v-for="result in results">
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
    </div>
  </form>
</template>

<script>
const _ = require('lodash')
require('@/lib/iota')
var iotaNode = require("@/utils/iota-node")

import RelativeTime from '@/components/RelativeTime.vue'

export default {
  components: {
    RelativeTime
  },
  methods: {
    goTo(hash) {
      this.$router.push({
        name:'Transaction',
        params: {
          hash
        }
      })
    },
    close() {
      this.results = null
      this.searchText = ''
    },
    searchCallback(e, r) {
      this.results = r
    },
    update: _.debounce(function (e) {
      iotaNode.iota.api.getTransactionsObjects([e.target.value.trim()], this.searchCallback)
    }, 300),
    onSubmit() {

    }
  },
  data() {
    return {
      results: null,
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
