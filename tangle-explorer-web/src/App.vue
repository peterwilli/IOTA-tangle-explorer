<template>
  <div id="app">
    <top-bar></top-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
export default {
  components: {
    TopBar
  },
  name: 'app',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 80px;
}
</style>
