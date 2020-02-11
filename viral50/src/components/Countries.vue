<template>
  <div id="countries-container">
    <h4>Countries</h4>
    <span>Selected ID: {{selectedId || 'None'}}</span>
    <div>
      <div class="md-form active-purple-2 mb-3">
        <input id="country-search" class="form-control" type="text" 
              placeholder="Search" aria-label="Search" v-model="searchTerm">
      </div>
    </div>
    <div id="country-list"
    class="btn-group-vertical btn-group-toggle" data-toggle="buttons">        
      <Country
         @selected="updateSelected"
         v-for="(country) in filteredCountries" v-bind:key="country.id"
         v-bind:name="country.name" v-bind:id="country.id"
         v-bind:selectedId="selectedId">
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
  },
  data: function(){
    return {
      countries: countries,
      selectedId: null,
      searchTerm: ""
    }
  },
  computed:{
    filteredCountries(){
      let filter = new RegExp(this.searchTerm, 'i');
      return this.countries.filter(c => c.name.match(filter));
    }
  },
  methods: {
    updateSelected: async function(event, id){
      this.$set(this, 'selectedId', id+1)
    }
  },
  components: {
    Country,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#countries-container{
  width: 15vw;
  max-height: 100%;
}

#countries-container > * {
  display: flex;
  flex-direction: column;
}

h4 {
  font-size: 2.5vw;
}

span {
  font-size: 1.5vw;
}

#country-search {
  background-color: #17201e;
  border: none;
  color: #42b983;
  box-shadow: none;
  margin-bottom: 0;
}
.mb-3{
  margin-bottom: 0.1rem!important;
}

#country-list {
  overflow-y: auto;
  max-height: 50vh;
  display: block;
}

.country-container:first-of-type{
  border-radius: 5em;
}
.country-container:last-of-type{
  border-radius: 5em;
}
</style>
