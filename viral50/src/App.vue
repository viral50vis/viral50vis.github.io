<template>
  <div id="app" class="container-fluid">
    <!-- img alt="Vue logo" src="./assets/logo.png"-->
    <HelloWorld heading="Viral 50" subtitle="Visualizing Spotify data from Viral 50 lists"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #85d6eb; /*2c3e50*/
  background-color: #07100e;
  padding-top: 2%;
}
</style>
