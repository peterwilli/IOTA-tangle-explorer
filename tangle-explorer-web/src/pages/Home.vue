<template>
  <div class="container">
    <node-info></node-info>
  </div>
</template>

<script>
import NodeInfo from '@/components/NodeInfo.vue'
var iotaNode = require("@/utils/iota-node").default

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
