<template>
  <div class="hello">
    <h1>{{ heading }}</h1>
    <h2>{{ subtitle }}</h2>
    <div id="country-list">
      <div class="list-group">
        <h4>Countries</h4>
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
    return {countries: countries}
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
h3 {
  margin-top: 0;
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

.country{
  background-color: #17201e;
}
#country-list .country:hover{
  background-color: #202e23;
  color: #42b983;
}
#country-list .country:active{
  background-color: #fff;
  /*background-color: rgb(47, 70, 52);*/
  color: #42b983;
}
#country-list .country:visited{
  color: #42b983;
}
</style>
