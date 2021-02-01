import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

const GOOGLE_MAP_KEY = process.env.GOOGLE_MAP_KEY || "AIzaSyAfVlHH4ZLf4oy7dilAaBQACNGzLPZw9IM";
console.log('vue-main.js - GOOGLE_MAP_KEY= ' + GOOGLE_MAP_KEY);

// const DEFAULT_WARDS = ["WARREN-WARD 1", "WARREN-WARD 2",  "WARREN-WARD 3",  "WARREN-WARD 4",  "WARREN-WARD 5",  "WARREN-WARD 6","WARREN-WARD 7"];

// const DEFAULT_PRECINCTS = ["WARREN CITY 5K"]

// Define a new component called button-counter
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});

new Vue({ el: '#components-demo' });

Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAP_KEY,
    libraries: "places" // necessary for places input
  }
});

Vue.use(VueAxios, axios);

new Vue({
  el: "#app",
  render: h => h(App)
});


// new Vue({ el: '#app', router, render: h => h(App) })