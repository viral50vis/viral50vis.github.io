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
  font-size: 10vw;
  font-weight: bold;
}
h2 {
  font-size: 2.5vw;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#country-list{
  width: 15%;
}
</style>
