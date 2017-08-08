<template lang="html">
  <div ref='box' class='expand-box' :style="getStyle()">
    <slot name="content"></slot>
    <div v-if="hasOverflow && !expanded" @click="toggleExpand()" class="expand-button">
      Expand
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.currentHeight = this.maxHeight
    this.checkOverflow()
    var _this = this
    this.timer = setInterval(function() {
      _this.checkOverflow()
    }, 500)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    getStyle() {
      if(this.currentHeight > 0) {
        return ('max-height:' + this.currentHeight + 'px')
      }
      else {
        return ''
      }
    },
    toggleExpand() {
      this.expanded = !this.expanded
      this.currentHeight = this.$refs.box.scrollHeight
    },
    checkOverflow() {
      var element = this.$refs.box
      this.hasOverflow = (element.offsetHeight < element.scrollHeight - 1)
    }
  },
  data() {
    return {
      timer: 0,
      hasOverflow: false,
      expanded: false,
      currentHeight: 0
    }
  },
  props: {
    maxHeight: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.expand-box
  overflow hidden
  position relative
  transition max-height 0.5s ease
  padding-bottom 5px

.expand-button:hover
  background rgba(0, 0, 0, 0.2)

.expand-button:active
  background rgba(0, 0, 0, 0.6)

.expand-button
  position absolute
  bottom 0
  left 0
  right 0
  height 40px
  line-height 40px
  text-align center
  font-weight bold
  color #fff
  background rgba(0, 0, 0, 0.4)
  cursor pointer
</style>
