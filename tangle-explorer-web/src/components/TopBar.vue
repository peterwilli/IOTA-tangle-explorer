<template lang="html">
  <div class='top-bar'>
    <div class='container'>
      <router-link to="/">
        <img class='logo' src="../assets/logo.png" />
      </router-link>
      <div class='right'>
        <div class='search'>
          <search-field></search-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchField from '@/components/SearchField.vue'

export default {
  components: {
    SearchField
  }
}
</script>

<style lang="stylus" scoped>
@import "../styles/media-mixin.styl"

.logo {
  margin-top 5px
  margin-left 5px
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
  z-index: 2
}
</style>
