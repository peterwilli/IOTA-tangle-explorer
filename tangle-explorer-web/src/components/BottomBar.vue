<template lang="html">
  <div class='bottom-bar'>
    <div class='container'>
      <div class="madeby">
        IOTA Tangle Explorer by Peter Willemsen and <a href="https://github.com/peterwilli/IOTA-tangle-explorer#contributors" target="_blank">fellow contributors</a>
        <br  />
        <a target="_blank" href="https://github.com/peterwilli/IOTA-tangle-explorer">Source Code</a> |
        <router-link :to="{ name: 'Address', params: { hash: 'DSQXMGTAEPOKLVJVQPAXFEQYXECCMOQSRMYNRF9GOSKKPWPSHKETQFZXSIGSPGTCBVMNUVWZNDJOVJAIDLI9JPHZCB' }}">Developer Donation</router-link>
        <br />
        Made with <ceri-icon style="color:#f45353" name="fa-heart"></ceri-icon> in The Netherlands
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style lang="stylus" scoped>
@import "../styles/media-mixin.styl"

.bottom-bar
  margin-top 15px

.madeby
  text-align center
</style>
