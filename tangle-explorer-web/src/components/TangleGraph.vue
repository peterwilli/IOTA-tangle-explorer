<template lang="html">
  <div>

    <div class="pusher" v-if="shouldShowPusher">

    </div>
    <div class="graph-container" ref="container">
      <span class="infoLabel" id="transactionLabel">Transactions: {{this.nodeCount}}</span>
      <span class="infoLabel" id="edgeLabel">Connections: {{this.edgeCount}}</span>
      <span class="txLabel" id="valueLabel">Value: {{this.txValue}}</span>
      <span class="txLabel" id="tagLabel">Tag: {{this.txTag}}</span>
      <div class="toolbar">
        <div :title='"Expand the graph to include transactions which directly reference the current transactions"' v-if="network !== null && this.networkLoading === false" class="button inceaseButton" @click="increaseDepth()">
          <i class="fa fa-plus-square increaseIcon"></i><span>Increase Depth</span>
        </div>
        <div class='button' v-else>
          <pulse-loader :color="'#fff'" size='13px'></pulse-loader>
        </div>
        <div class="right">
          <div class="button" @click="fullscreenToggle()">
            <i class="fa fa-expand" v-if="!expanded"></i>
            <i class="fa fa-compress" v-else ></i>
          </div>
        </div>
      </div>
      <div class="graph" ref="graph"></div>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
const vis = require('vis')
const _ = require('lodash')
require('@/lib/iota')
const iotaNode = require("@/utils/iota-node")
const $ = require('jquery')

export default {
  props: ['txs', 'viewingHash', 'viewingTag', 'viewingTrunkHash', 'viewingBranchHash'],
  components: {
    PulseLoader
  },
  methods: {
    processLabel(lbl,t) {
      var len = lbl.length-1;
      if (lbl === this.viewingHash) {
        return `*${lbl.substring(0, 6) + "..." + lbl.substring(len-6, len)}*`
      } else {
        return lbl.substring(0, 6) + "..." + lbl.substring(len-6, len)
      }
    },
    isDirect(hash)
    {
      return (hash == this.viewingBranchHash || hash == this.viewingTrunkHash || hash == this.viewingHash) ? true : false
    },
    getNodeColor(hash) {
      if (hash === this.viewingHash) {
        return '#EBB366'
      } else if(this.isDirect(hash)) {
        return '#477397'
      }
      else {
        return '#222'
      }
    },
    fullscreenToggle() {
      this.expanded = !this.expanded
      var container = this.$refs.container
      var $container = $(container)
      if(this.expanded) {
        var offset = $container.offset()
        var rt = $(window).width() - offset.left - $container.width()
        var bt = $(window).height() - (offset.top - $(window).scrollTop()) - $container.height()

        this.oldOffset = {offset, bt, rt}
        this.shouldShowPusher = true
        $container.css({
          position: 'fixed',
          left: offset.left + "px",
          top: (offset.top - $(window).scrollTop()) + "px",
          right: rt + "px",
          bottom: bt + "px"
        })
        setTimeout(() => {
          $container.css({
            height: 'auto',
            top: "80px",
            bottom: "0px",
            left: "0px",
            right: "0px"
          })
        }, 0)
      }
      else {
        var {offset, bt, rt} = this.oldOffset
        $container.css({
          left: offset.left + "px",
          top: (offset.top - $(window).scrollTop()) + "px",
          right: rt + "px",
          bottom: bt + "px"
        })
        $container.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', () => {
          this.shouldShowPusher = false
          $container.css({
            position: 'relative',
            height: '450px',
            left: 'auto',
            right: 'auto',
            top: 'auto',
            bottom: 'auto'
          })
        })
      }
    },
    txsToNodes(txs) {
      var arr = []
      for (var tx of txs) {
        arr.push({
          font: {
            multi: "md",
            color: (this.isDirect(tx.hash) ? "#ffffff" : "#aaaaaa"),
            size: (this.isDirect(tx.hash) ? 18 : 12)
          },
          id: tx.hash,
          color: {background:this.getNodeColor(tx.hash), border: "#487498"},
          borderWidth: 2,
          shadow: {enabled:true, color: '#1a1a1a', x: 2, y: 2, size: 2},
          label: this.processLabel(tx.hash),
        })

        arr.push({
          font: {
            multi: "md",
            color: (this.isDirect(tx.branchTransaction) ? "#ffffff" : "#aaaaaa"),
            size: (this.isDirect(tx.branchTransaction) ? 14 : 12)
          },
          id: tx.branchTransaction,
          color: {background:this.getNodeColor(tx.branchTransaction), border: "#cccccc"},
          borderWidth: 1,
          shadow: {enabled:true, color: '#1a1a1a', x: 2, y: 2, size: 2},
          label: this.processLabel(tx.branchTransaction),
        })

        arr.push({
          font: {
            multi: "md",
            color: (this.isDirect(tx.trunkTransaction) ? "#ffffff" : "#aaaaaa"),
            size: (this.isDirect(tx.trunkTransaction) ? 14 : 12)
          },
          id: tx.trunkTransaction,
          color: {background:this.getNodeColor(tx.trunkTransaction), border: "#cccccc"},
          borderWidth: 1,
          shadow: {enabled:true, color: '#1a1a1a', x: 2, y: 2, size: 2},
          label: this.processLabel(tx.trunkTransaction),
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
      this.networkLoading = true;
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
        _this.networkLoading = false;
        _this.update()
      })
    },
    destroyNetwork() {
      if(this.txsToRender && this.data) {
        var foundOriginalHash = this.data.nodes.get(this.viewingHash)
        if(!foundOriginalHash) {
          this.txsToRender = []
        }
      }

      if (this.network !== null) {
        this.network.destroy()
        this.network = null
      }
    },
    update() {

      this.destroyNetwork()
      if(this.txsToRender === null || this.txsToRender.length === 0) {
        this.txsToRender = this.txs.slice(0)
      }

      var t = this.txsToRender.find(function(el){return (el.hash == this.viewingHash) ? el : null},this)
      this.txTag = (t) ? t.tag : "''"
      this.txValue = (t) ? t.value : "0"
      var container = this.$refs.graph
      var nodes = this.txsToNodes(this.txsToRender)
      var edges = this.txsToEdges(this.txsToRender)
      this.nodeCount = nodes.length
      this.edgeCount = edges.length

      // provide the data in the vis format
      var data = {
        nodes: nodes,
        edges: edges
      };

      this.data = data

      var options = {
        physics: {
          enabled: false
        },
        layout: {
          randomSeed: 80085
        },
        nodes: {
          shape: 'dot',
          size: 20,
          font: {
            size: 18,
            color: '#ffffff'
          },
          borderWidth: 2,
        },
        edges: {
          width: 2,
          arrows: {
            to: true
          },
          color: "#aaaaaa"
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
      data: null,
      txsToRender: null,
      nodeCount: null,
      txValue: null,
      txTag: null,
      edgeCount: null,
      expanded: false,
      oldOffset: null,
      shouldShowPusher: false,
      networkLoading: false
    }
  },
  mounted() {
    this.update()
    this.increaseDepth()
  }
}
</script>

<style lang="stylus" scoped>
  .graph-container
    position relative
    height 450px
    transition all 0.5s ease

  .infoLabel
    position absolute
    left 5px
    color: #fff
    font-size 12px
    color: #ccc

  .txLabel
    position absolute
    right 5px
    font-size 12px
    color: #ccc
    text-align right

  #tagLabel
    bottom 5px

  #valueLabel
    position absolute
    bottom 20px

  .increaseIcon
    margin-right 5px

  #edgeLabel
    bottom 20px

  #transactionLabel
    bottom 5px

  .pusher
    height 450px

  .toolbar
    left 0
    right 0
    position absolute
    background rgba(255, 255, 255, 0.2)
    border-bottom 1px solid #333
    z-index: 1
    .right
      float right

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
    height 100%
</style>
