<template> 
  <div class="country-container">
    <label class="btn btn-block country"
        v-bind:class="{active: isActive}"
        v-on:click.prevent="updateSelected">
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
    id: Number,
    selectedId: Number
  },
  data: function(){
    return {}
  },
  computed: {
    isActive(){
      return (this.selectedId == this.id+1)
    }
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
  background-color: #17201e;
  display: contents;
}

.country-container .country {
  background-color: #17201e;
  border: none;
  color: #42b983;
  box-shadow: none;
  padding-top: 0.5vw;
  padding-bottom: 0.5vw;
  margin-bottom: 0;
  cursor: pointer;
  display: list-item;
}

.country-container .country.active {
  background-color: rgb(47, 70, 52) !important;
  color: #42b983;
  
}

.country-container .country:hover {
  background-color: #202e23;
  color: #42b983;
}

.country {
  font-size: 1.3vw;
}

/* Removes default styling of radio buttons */
.country > input[type=radio] {
  position: absolute;
  clip: rect(0,0,0,0);
  pointer-events: none;
}
</style>
