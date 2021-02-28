import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import VueCookies from "vue-cookies"

Vue.config.productionTip = false

const GOOGLE_MAP_KEY = process.env.GOOGLE_MAP_KEY || "";
console.log('vue-main.js - GOOGLE_MAP_KEY= ' + GOOGLE_MAP_KEY);

// const DEFAULT_WARDS = ["WARREN-WARD 1", "WARREN-WARD 2",  "WARREN-WARD 3",  "WARREN-WARD 4",  "WARREN-WARD 5",  "WARREN-WARD 6","WARREN-WARD 7"];

// const DEFAULT_PRECINCTS = ["WARREN CITY 5K"]


// export default {
//   name: "App",
//   methods: {
//     logout: function (e) {
//       console.log('logout: function (e) { e = ' + e);
//       axios.get("/api/logout")
//         .then(() => {
//           router.push("/")
//         })
//     }
//   }
// }


Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAP_KEY,
    libraries: "places" // necessary for places input
  }
});

Vue.use(VueAxios, axios);

Vue.use(VueCookies)

Vue.config.kenwashere = false

new Vue({
  el: "#app",
  router,
  render: h => h(App),
}).$mount('#app')


// new Vue({ el: '#app', router, render: h => h(App) })