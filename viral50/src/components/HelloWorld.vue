<template>
  <div class="hello">
    <h1>{{ heading }}</h1>
    <h2>{{ subtitle }}</h2>
    <div id="country-list">
      <h4>Countries</h4>
      <div class="btn-group-vertical btn-group-toggle" data-toggle="buttons">        
        <Country
           v-for="country in countries" v-bind:key="country.id"
           v-bind:name="country">
        </Country>
      </div>
    </div>
  </div>
</template>

<script>
import countries from '../assets/countries.json'
import Country from './Country.vue'

export default {
  name: 'HelloWorld',
  props: {
    heading: String,
    subtitle: String
  },
  data: function(){
    return {
      countries: countries,
      selected: -1
    }
  },
  components: {
    Country
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 10vw;
  font-weight: bold;
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
