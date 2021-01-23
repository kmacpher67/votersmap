import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false

const GOOGLE_MAP_KEY = process.env.GOOGLE_MAP_KEY || "NOTHERE";
console.log('vue-main.js - GOOGLE_MAP_KEY= ' + GOOGLE_MAP_KEY);

Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAP_KEY,
    libraries: "places" // necessary for places input
  }
});

new Vue({
  el: "#app",
  render: h => h(App)
});


// new Vue({ el: '#app', router, render: h => h(App) })