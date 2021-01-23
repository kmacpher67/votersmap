<template>
  <div id="app">
    <h1> test me </h1>
    <hello-world />
  </div>
</template>


<script>
// import HelloWorld from "@/components/HelloWorld"
import HelloWorld from '@/components/HelloWorld.vue';
// import {Client} from "@googlemaps/google-maps-services-js";
// import {gmapApi} from 'vue2-google-maps'

console.log('vue-App.vue - script HelloWorld default components before export default {' );

const GOOGLE_MAP_KEY = process.env.GOOGLE_MAP_KEY || "NOTHERE";
console.log('vue-App.vue - script - GOOGLE_MAP_KEY= ' + GOOGLE_MAP_KEY);

export default {
  components: { HelloWorld },
  name: 'App',
  Components: {
    HelloWorld    
  }
}

</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
