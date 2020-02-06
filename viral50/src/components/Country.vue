<template> 
  <div>
    <a href="#" class="list-group-item list-group-item-action country"
            v-bind:class="{active: isActive}"
            v-on:click="isActive=!isActive">
            {{name}}
    </a>
  </div>
  </template>

<script>
export default {
  name: 'Country',
  props: {
    name: String,
    key: Number
  },
  data: function(){
    return {isActive: false}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.country{
  background-color: #17201e;
  border: 1px solid rgba(0,0,0, 0.125);
}


#country-list .country.active{
  background-color: rgb(47, 70, 52) !important;
  color: #42b983;
}

#country-list .country:hover{
  background-color: #202e23;
  color: #42b983;
}
#country-list .country:active {
  background-color: rgb(47, 70, 52);
  color: #42b983;
}
#country-list .country:visited{
  color: #42b983;
}
</style>
