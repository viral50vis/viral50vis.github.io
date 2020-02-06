<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="countryList">
      <h3>Countries</h3>
      <ul>
        <li v-for="country in countries" v-bind:key="country.id">
          {{country}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import countries from '../assets/countries.json'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function(){
    return {countries: countries}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
</style>
