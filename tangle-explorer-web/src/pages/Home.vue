<template>
  <div class="container">
    <node-info></node-info>
  </div>
</template>

<script>
import NodeInfo from '@/components/NodeInfo.vue'
require('@/lib/iota')
var iotaNode = require("@/utils/iota-node")

export default {
  components: {
    NodeInfo
  },
  beforeDestroy() {
    iotaNode.unsubscribe('node-info')
  },
  mounted() {
    iotaNode.subscribe('node-info')
  }
};
</script>

<style scoped lang="stylus">

</style>
