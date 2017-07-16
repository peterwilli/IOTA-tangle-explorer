<template lang="html">
  <div ref="qrcode"></div>
</template>

<script>
export default {
  props: {
    contents: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default() {
        return 200
      },
      required: false
    }
  },
  watch: {
    contents() {
      this.updateQR()
    }
  },
  methods: {
    updateQR() {
      var qrcode = new QRCode(this.$refs.qrcode, {
      	text: this.contents,
      	width: this.size,
      	height: this.size,
      	correctLevel : QRCode.CorrectLevel.L
      })
    }
  },
  mounted() {
    this.updateQR()
  }
}
</script>

<style lang="css" scoped>
</style>
