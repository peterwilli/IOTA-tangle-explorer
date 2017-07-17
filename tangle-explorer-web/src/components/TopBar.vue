<template lang="html">
  <div class='top-bar'>
    <div class='container'>
      <img class='logo' src="../assets/logo.png" />
      <div class='right'>
        <div class='search'>
          <search></search>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'

export default {
  components: {
    Search
  }
}
</script>

<style lang="stylus" scoped>
@import "../styles/media-mixin.styl"

.logo {
  margin-top 5px
}
.search {
  margin-top 20px
}
.right {
  float right
}
.top-bar {
  position fixed
  top 0
  left 0
  right 0
  height 80px
  background #121728
  padding-left 10px
  padding-right 10px
}
</style>
