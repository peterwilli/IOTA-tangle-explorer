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
  data() {
    return {
      qrcode: null
    }
  },
  watch: {
    contents() {
      this.updateQR()
    }
  },
  methods: {
    updateQR() {
      if(this.qrcode !== null) {
        this.qrcode.clear()
        this.qrcode = null
        this.$refs.qrcode.innerHTML = ""
      }

      this.qrcode = new QRCode(this.$refs.qrcode, {
      	text: this.contents,
      	width: this.size,
      	height: this.size,
      	correctLevel : QRCode.CorrectLevel.M
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
