j <template lang="html">
  <div ref="graph">

  </div>
</template>

<script>
const vis = require('vis')
const _ = require('lodash')
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")

export default {
  props: ['txs', 'viewingHash'],
  methods: {
    processLabel(lbl) {
      if(lbl === this.viewingHash) {
        return `*${lbl.substring(0, 5) + "..."}*`
      }
      else {
        return lbl.substring(0, 5) + "..."
      }
    },
    getNodeColor(hash) {
      if(hash === this.viewingHash) {
        return '#48aacf'
      }
      else {
        return '#ddb013'
      }
    },
    txsToNodes(txs) {
      var arr = []
      for(var tx of txs) {
        arr.push({
          font: { multi: "md" },
          id: tx.hash,
          color: this.getNodeColor(tx.hash),
          label: this.processLabel(tx.hash)
        })

        arr.push({
          font: { multi: "md" },
          id: tx.branchTransaction,
          color: this.getNodeColor(tx.branchTransaction),
          label: this.processLabel(tx.branchTransaction)
        })

        arr.push({
          font: { multi: "md" },
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
      for(var tx of txs) {
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
      for(var tx of this.txsToRender) {
        arr.push(tx.branchTransaction)
        arr.push(tx.trunkTransaction)
      }
      var _this = this
      iotaNode.iota.api.getTransactionsObjects(arr, function(e, r) {
        for(var tx of r) {
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
    }
  },
  beforeDestroy() {
    this.destroyNetwork()
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
  div {
    background: #222222
  }
</style>
