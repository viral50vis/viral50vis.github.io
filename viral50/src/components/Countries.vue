<template>
  <div id="country-list">
    <h4>Countries</h4>
    <span>Selected ID: {{selectedId || 'None'}}</span>
    <div class="btn-group-vertical btn-group-toggle" data-toggle="buttons">        
      <Country
         @selected="updateSelected"
         v-for="(country, id) in countries" v-bind:key="id"
         v-bind:name="country" v-bind:id="id">
      </Country>
    </div>
  </div>
</template>

<script>
import countries from '../assets/countries.json'
import Country from './Country.vue'

export default {
  name: 'Countries',
  props: {
    heading: String,
    subtitle: String
  },
  data: function(){
    return {
      countries: countries,
      selectedId: null,
    }
  },
  methods: {
    updateSelected: async function(event, id){
      this.$set(this, 'selectedId', id+1)
    }
  },
  components: {
    Country
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#country-list{
  width: 15%;
}
.country-container:first-of-type{
  border-radius: 10vw;
}
.country-container:last-of-type{
  border-radius: 10vw;
}
</style>
