<template lang="html">
  <form v-on:submit.prevent="onSubmit" class='search'>
    <input @input="update" type='text' placeholder="Search transactions, adresses" />
    <div class='results' v-if="results !== null">
      <div class="result" v-for="result in results">
        {{ result }}
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
.search
  input
    border 1px solid #333
    padding 10px
</style>
