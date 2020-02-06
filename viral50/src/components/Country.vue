<template> 
  <div class="country-container">
    <label class="btn btn-block country">
      <input v-bind:value="checked" type="radio" name="countries">{{name}}
    </label>
  </div>
  </template>

<script>
export default {
  name: 'Country',
  props: {
    name: String,
  },
  data: function(){
    return {checked: false}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Fill parent component */ 
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
