<template lang="html">
  <div class='top-bar'>
    <div class='container'>
      <div class="left">
        <router-link to="/">
          <img class='logo' src="../assets/logo.png" />
        </router-link>
      </div>
      <div class='right'>
        <div class="bar-button">
          <router-link :to="{ name: 'Settings' }">
            <i class="fa fa-gear icon" style="font-size: 32px"></i>
          </router-link>
        </div>
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

.container
  position relative

.logo
  margin-top 5px
  margin-left 5px

.search
  margin-top 20px

.search-field
  position absolute
  width 100%
  right 40px

.right
  position absolute
  left 100px
  right 0px

.left
  float left
  width 100px

.top-bar
  position fixed
  top 0
  left 0
  right 0
  height 80px
  background #121728
  padding-left 10px
  padding-right 10px
  z-index: 2

  .bar-button
    a
      display block
    float right
    margin-left 5px
    margin-top 20px

  .icon
    color #fff
    margin-left 10px
    margin-top 2px
</style>
