<template lang="html">
  <form v-on:submit.prevent="onSubmit" class='search'>
    <input @input="update" type='text' placeholder="Search transactions, adresses" />
    <div class='results' v-if="results !== null">
      <div class="result" v-for="result in results">
        <div class="cut-text hash">{{ result.hash }}</div>
        <div class="cut-text address">
          <ceri-icon name="fa-user"></ceri-icon>
          {{ result.address }}
        </div>
        <div class="cut-text time">
          <ceri-icon name="fa-clock-o"></ceri-icon>
          {{ $relativeTimestamp(result.timestamp) }}
        </div>
      </div>
    </div>
  </form>
</template>

<script>
const _ = require('lodash')
require('@/lib/iota')
var iotaNode = require("@/utils/iota-node")

export default {
  methods: {
    searchCallback(e, r) {
      this.results = r
    },
    update: _.debounce(function (e) {
      iotaNode.iota.api.getTransactionsObjects([e.target.value], this.searchCallback)
    }, 300),
    onSubmit() {

    }
  },
  data() {
    return {
      results: null
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
