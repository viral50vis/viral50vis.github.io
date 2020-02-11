<template>
  <div class="body">
    <h1>{{ heading }}</h1>
    <h2>{{ subtitle }}</h2>
    <Countries>
    </Countries>
  </div>
</template>

<script>
import Countries from './Countries.vue'

export default {
  name: 'Body',
  props: {
    heading: String,
    subtitle: String,
  },
  data: function(){
    return {
    }
  },
  components: {
    Countries
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 6vw;
  font-weight: bold;
}
h2 {
  font-size: calc(1vw + 1vh);
}

a {
  color: #42b983;
}

</style>
