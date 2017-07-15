<template>
  <div class="hello">
    <h1 v-if="iotaNode.nodeInfo.latestMilestone !== null">test: {{ iotaNode.nodeInfo.latestMilestone }}</h1>
  </div>
</template>

<script>
require('@/lib/iota')
var iotaNode = require("@/utils/iota-node")
export default {
  name: 'NodeInfo',
  data() {
    return {
      iotaNode: iotaNode,
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
