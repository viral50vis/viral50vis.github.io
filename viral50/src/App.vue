<template>
  <div id="app" class="container-fluid">
    <!-- img alt="Vue logo" src="./assets/logo.png"-->
    <Body heading="Viral 50" subtitle="Visualizing data from Spotify Viral 50 lists"/>
  </div>
</template>

<script>
import Body from './components/Body.vue'

export default {
  name: 'app',
  components: {
    Body
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
  height: 100vh;
  animation: fadeInAnimation ease 0.5s;
  animation-iteration-count: 1; 
  animation-fill-mode: forwards; 
}

@keyframes fadeInAnimation { 
    0% { 
        opacity: 0; 
    } 
    100% { 
        opacity: 1; 
     } 
} 
</style>
