<template lang="html">
  <img :src="src" />
</template>

<script>
export default {
  props: {
    seed: {
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
      src: null
    }
  },
  watch: {
    seed() {
      this.updateAvatar()
    }
  },
  methods: {
    updateAvatar() {
      var avatars = new Avatars([Avatars.SPRITE_SETS.male, Avatars.SPRITE_SETS.female][this.seed.charCodeAt(0) % 2])
      var _this = this
      avatars.create(this.seed, { size: this.size }, function(err, canvas) {
        _this.src = canvas.toDataURL()
      })
    }
  },
  mounted() {
    this.updateAvatar()
  }
}
</script>

<style lang="css" scoped>
</style>
