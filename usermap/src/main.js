import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import VueCookies from "vue-cookies"
// import InfoWindowComponent from './components/InfoWindow.vue';

Vue.config.productionTip = false

const GOOGLE_MAP_KEY = process.env.VUE_APP_GOOGLE_MAP_KEY || "GOOGLE_MAPS_API_KEY_REPLACE";
console.log('vuejs main.js - GOOGLE_MAP_KEY= ' + GOOGLE_MAP_KEY);

// const DEFAULT_WARDS = ["WARREN-WARD 1", "WARREN-WARD 2",  "WARREN-WARD 3",  "WARREN-WARD 4",  "WARREN-WARD 5",  "WARREN-WARD 6","WARREN-WARD 7"];

// const DEFAULT_PRECINCTS = ["WARREN CITY 5K"]


export default {
  name: "App",
  mounted() {
    console.log(process.env.NODE_ENV)
    console.log(process.env.VUE_APP_TEST)
    console.log(process.env.GOOGLE_MAP_KEY)
    console.log(process.env.VUE_APP_DOOSVARS)
  },
  methods: {
    // logout: function (e) {
    //   console.log('logout: function (e) { e = ' + e);
    //   axios.serverHostPort=3000;
    //   axios.get("/api/logout")
    //     .then(() => {
    //       router.push("/")
    //     })
    // }
  }
}


Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAP_KEY,
    libraries: "places" // necessary for places input
  }
});

// var InfoWindow = Vue.extend(InfoWindowComponent);
// var instance = new InfoWindow({
//     propsData: {
//         content: "This displays as info-window content! Default dummy."
//     }
// });

// instance.$mount();

// var new_infowindow = new VueGoogleMaps.maps.InfoWindow({
//     content: instance.$el,
// });

// // new_infowindow.open(<map object>, <marker>);
// new_infowindow.open()



// API_PORT=3000 
Vue.use(VueAxios, axios);

Vue.use(VueCookies)

// axios.defaults.baseURL='http://localhost/3000';
console.log(window.location)
console.log('axios.defaults.baseURL='+axios.defaults.baseURL)
// var apiHostURL= new URL(window.location.origin);
// console.log('apiHostURL=' + apiHostURL);
// apiHostURL.port="3000";
// apiHostURL.protocol=window.location.protocol;
// console.log('apiHostURL=' + apiHostURL);
// axios.defaults.baseURL=apiHostURL.origin || "http://localhost:3000";

// // axios.defaults.apiHostPort='3000';
// // axios.defaults.serverHostPort='3000';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Access-Control-Allow-Access-Control-Allow-Methods'] = "GET, POST, PATCH, PUT, DELETE, OPTIONS";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = "Origin, Content-Type, X-Auth-Token, Authorization, X-Requested-With";
console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_API_PORT)
console.log(process.env.VUE_APP_DOOSVARS)
console.log(process.env.VUE_APP_TITLE)

console.log('axios.defaults' + JSON.stringify(axios.defaults));
Vue.config.kenwashere = false

new Vue({
  el: "#app",
  router,
  render: h => h(App),
}).$mount('#app')


// new Vue({ el: '#app', router, render: h => h(App) })