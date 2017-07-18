<template lang="html">
  <span>{{ time }}</span>
</template>

<script>
const moment = require('moment')
export default {
  props: {
    timestamp: {
      type: Number,
      required: true
    }
  },
  methods: {
    update() {
      this.time = moment(this.timestamp * 1000).fromNow()
    }
  },
  watch: {
    timestamp() {
      this.update()
    }
  },
  beforeDestroy() {
    if(this.interval !== null) {
      clearInterval(this.update)
      this.interval = null
    }
  },
  mounted() {
    // interval updates every 59 seconds instead of every 60 just to be sure that when a minute has passed, text will get updated.
    this.interval = setInterval(this.update, 59 * 1000)
    this.update()
  },
  data() {
    return {
      time: null,
      interval: null
    }
  }
}
</script>
