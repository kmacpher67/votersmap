<template>
  <div id="app">
    <hello-world />
    <h6>@KenMacPherson 2010-2021 Help for the voters.</h6>
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld"
import HelloWorld from '@/components/HelloWorld.vue';
// import {Client} from "@googlemaps/google-maps-services-js";
// import {gmapApi} from '@/vue2-google-maps'
// import gmapsInit from '@/gmaps';

console.log('vue-App.vue - script HelloWorld default components before export default {' );

// sed script to replace the following line GOOGLE_MAPS_API_KEY_ REPLACE
// RUN sed -i "s/GOOGLE_MAPS_API_KEY_ REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/src/App.vue
const GOOGLE_MAP_KEY = process.env.GOOGLE_MAP_KEY || "AIzaSyAfVlHH4ZLf4oy7dilAaBQACNGzLPZw9IM";
console.log('vue-App.vue - script - GOOGLE_MAP_KEY= ' + GOOGLE_MAP_KEY);

export default {
  components: { HelloWorld },
  name: 'App',
  Components: {
    HelloWorld    
  },
  // async mounted() {
  //   try {
  //     const google = await gmapsInit();

  //     const geocoder = new google.maps.Geocoder();
  //     const map = new google.maps.Map(this.$el);

  //     geocoder.geocode({ address: 'Austria' }, (results, status) => {
  //       if (status !== 'OK' || !results[0]) {
  //         throw new Error(status);
  //       }

  //       map.setCenter(results[0].geometry.location);
  //       map.fitBounds(results[0].geometry.viewport);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1px;
  margin: 1px;
}
</style>
