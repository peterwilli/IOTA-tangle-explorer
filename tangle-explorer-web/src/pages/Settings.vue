<template lang="html">
  <div class="container">
    <div class='settings-table'>
      <legend>
        Settings
      </legend>

      <form @submit.prevent='apply()'>
        <table class="wrap striped">
            <tbody>
                <tr>
                    <td>Node URL</td>
                    <td><input class="input" type="url" v-model="settings.nodeUrl" required /></td>
                </tr>
            </tbody>
        </table>
        <input type="submit" class="primary btn" value="Apply" />
        <input type="button" @click="reset()" class="destructive btn" value="Reset to default settings" />
      </form>
    </div>
  </div>
</template>

<script>
const settings = require('@/utils/settings.js').default
export default {
  methods: {
    reset() {
      var reset = confirm("Are you sure you want to reset to default settings?")
      if(reset) {
        settings.resetToDefault()        
        window.location.reload()
      }
    },
    apply() {
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

<style lang="css">
</style>
