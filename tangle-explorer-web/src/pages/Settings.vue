<template lang="html">
  <div class="container">
    <div class='settings-table'>
      <legend>
        Settings
      </legend>

      <form @submit.prevent='apply'>
        <table class="wrap striped">
            <tbody>
                <tr>
                    <td title="Full node IP or URL (eg. http://examplenode.com:14265">Node URL</td>
                    <td><input class="input" type="url" v-model="settings.nodeUrl" required /></td>
                </tr>
            </tbody>
        </table>
        <input title="Save these settings" type="submit" class="primary btn" value="Apply" v-toast='"Settings Saved"' />
        <input title="Reset all settings to the default values" type="button" @click="reset" class="destructive btn" value="Reset" v-toast='"Settings Reset"'  />
      </form>
    </div>
  </div>
</template>

<script>
const settings = require('@/utils/settings.js').default
export default {
  methods: {
    reset(event) {
      var reset = confirm("Are you sure you want to reset to default settings?")
      if(reset) {
        settings.resetToDefault()
        window.location.reload()
      }
      else {
        event.stopPropagation()
      }
    },
    apply(event) {
      var oldSettings = settings.get()
      settings.set(this.settings)
      if(this.settings.nodeUrl !== oldSettings.nodeUrl) {
        var restart = confirm("You've changed the Node address. It's recommended that you reload the page after applying the settings. Would you like to reload now?")
        if(restart) {
          window.location.reload()
        }
      }
    }
  },
  data() {
    return {
      settings: settings.get()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../styles/media-mixin.styl"
+mobile()
  .wrap
    table-layout auto!important
</style>
