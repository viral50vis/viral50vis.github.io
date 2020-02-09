<template> 
  <div class="country-container">
    <label class="btn btn-block country"
        v-on:click="updateSelected">
          <input type="radio" name="countries">
      {{name}}
    </label>
  </div>
  </template>

<script>
export default {
  name: 'Country',
  props: {
    name: String,
    id: Number
  },
  data: function(){
    return {}
  },
  methods: {
    updateSelected: function(event){
      this.$emit('selected', event, this.id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Fill parent component width */ 
.country-container {
  width: 100%;
  background-color: #17201e;
}

#country-list .country {
  background-color: #17201e;
  border: none;
  color: #42b983;
  width: 100%;
  box-shadow: none;
  padding-top: 1vw;
  padding-bottom: 1vw;
  margin-bottom: 0;
  cursor: pointer;
}

#country-list .country.active {
  background-color: rgb(47, 70, 52) !important;
  color: #42b983;
  
}

#country-list .country:hover {
  background-color: #202e23;
  color: #42b983;
}

.country > input[type=radio] {
  position: absolute;
  clip: rect(0,0,0,0);
  pointer-events: none;
}
</style>
