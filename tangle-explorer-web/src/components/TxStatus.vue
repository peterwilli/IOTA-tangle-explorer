<template lang="html">
  <span v-if="txStatus" :class="'status-' + txStatus">{{ displayStatus(txStatus) }}</span>
  <span v-else class="status-loading">Checking...</span>
</template>

<script>
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")

export default {
  props: ['latestInclusion', 'hash'],
  mounted() {
    this.update()
  },
  watch: {
    hash() {
      this.update()
    }
  },
  methods: {
    update() {
      var _this = this
      iotaNode.iota.api.getLatestInclusion([this.hash], function(e, r) {
        if(r[0]) {
          _this.txStatus = 'confirmed'
        }
        else {
          _this.txStatus = 'pending'
        }
      })
    },
    displayStatus(status) {
      return status.charAt(0).toUpperCase() + status.slice(1)
    }
  },
  data() {
    return {
      txStatus: null
    }
  }
}
</script>

<style lang="stylus" scoped>
.status-pending {
  color rgb(182, 45, 45)
  font-weight bold
}

.status-loading {

}

.status-confirmed {
  color rgb(48, 168, 24)
  font-weight bold
}
</style>
