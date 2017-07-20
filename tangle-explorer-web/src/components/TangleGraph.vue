<template lang="html">
  <div class="graph-container">
    <div class="toolbar">
      <div v-if="network !== null" class="button" @click="increaseDepth()">
        Increase Depth
      </div>
      <div class='button' v-else>
        <pulse-loader :color="'#fff'" size='13px'></pulse-loader>
      </div>
    </div>
    <div class="graph" ref="graph"></div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
const vis = require('vis')
const _ = require('lodash')
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")

export default {
  props: ['txs', 'viewingHash'],
  components: {
    PulseLoader
  },
  methods: {
    processLabel(lbl) {
      if (lbl === this.viewingHash) {
        return `*${lbl.substring(0, 5) + "..."}*`
      } else {
        return lbl.substring(0, 5) + "..."
      }
    },
    getNodeColor(hash) {
      if (hash === this.viewingHash) {
        return '#48aacf'
      } else {
        return '#ddb013'
      }
    },
    txsToNodes(txs) {
      var arr = []
      for (var tx of txs) {
        arr.push({
          font: {
            multi: "md"
          },
          id: tx.hash,
          color: this.getNodeColor(tx.hash),
          label: this.processLabel(tx.hash)
        })

        arr.push({
          font: {
            multi: "md"
          },
          id: tx.branchTransaction,
          color: this.getNodeColor(tx.branchTransaction),
          label: this.processLabel(tx.branchTransaction)
        })

        arr.push({
          font: {
            multi: "md"
          },
          id: tx.trunkTransaction,
          color: this.getNodeColor(tx.trunkTransaction),
          label: this.processLabel(tx.trunkTransaction)
        })
      }
      arr = _.uniqBy(arr, (node) => {
        return node.id
      })

      return new vis.DataSet(arr)
    },
    txsToEdges(txs) {
      var arr = []
      for (var tx of txs) {
        arr.push({
          from: tx.hash,
          to: tx.branchTransaction
        })

        arr.push({
          from: tx.hash,
          to: tx.trunkTransaction
        })
      }
      return new vis.DataSet(arr)
    },
    increaseDepth() {
      var arr = []
      for (var tx of this.txsToRender) {
        arr.push(tx.branchTransaction)
        arr.push(tx.trunkTransaction)
      }
      var _this = this
      arr = _.uniq(arr)
      arr = _.filter(arr, (hash) => {
        for(var tx of _this.txsToRender) {
          if(tx.hash === hash) {
            return false
          }
        }
        return true
      })

      iotaNode.iota.api.getTransactionsObjects(arr, function(e, r) {
        for (var tx of r) {
          _this.txsToRender.push(tx)
        }
        _this.txsToRender = _.uniqBy(_this.txsToRender, (tx) => {
          return tx.hash
        })
        _this.update()
      })
    },
    destroyNetwork() {
      if (this.network !== null) {
        this.network.destroy()
        this.network = null
      }
    },
    update() {
      this.destroyNetwork()
      var container = this.$refs.graph
      var nodes = this.txsToNodes(this.txsToRender)
      var edges = this.txsToEdges(this.txsToRender)

      // provide the data in the vis format
      var data = {
        nodes: nodes,
        edges: edges
      };

      var options = {
        nodes: {
          shape: 'dot',
          size: 30,
          font: {
            size: 20,
            color: '#ffffff'
          },
          borderWidth: 2
        },
        edges: {
          width: 2
        }
      };

      this.network = new vis.Network(container, data, options)
      var _this = this
      this.network.on("click", function(params) {
        if(this.getNodeAt(params.pointer.DOM) === undefined) {
          return
        }
        _this.$router.push({
          name: 'Transaction',
          params: {
            hash: this.getNodeAt(params.pointer.DOM)
          }
        })
      })
    }
  },
  beforeDestroy() {
    this.destroyNetwork()
  },
  watch: {
    txs() {
      this.update()
    }
  },
  data() {
    return {
      network: null,
      txsToRender: null
    }
  },
  mounted() {
    this.txsToRender = this.txs.slice(0)
    this.update()
    this.increaseDepth()
  }
}
</script>

<style lang="stylus" scoped>
  .graph-container
    position relative

  .toolbar
    left 0
    right 0
    position absolute
    background rgba(255, 255, 255, 0.2)
    border-bottom 1px solid #333
    z-index: 1
    .button
      color #fff
      cursor pointer
      padding 10px
      float left
      &:active
        background rgba(0, 0, 0, 0.1)!important

      &:hover
        background rgba(255, 255, 255, 0.2)

  .graph
    background #222222
    height 250px
</style>
