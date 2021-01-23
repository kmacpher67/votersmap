<template>
  <div>
      <h1> Voters </h1>
    <div>
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br/>

    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>


export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      // 41.238553,-80.8258473
      center: { lat: 41.238553, lng: -80.8258473 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  mounted() {
    console.log('mounted method... in vue.use');
    this.geolocate();
    this.getUser();
    this.initializeMap()
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    getUser() {
                this.axios.get('/users').then(response => {
                    console.log(response.data);
                    this.users = this.getRandomUsers(response.data, 6)
                });
            },
    getRandomUsers(people, number) {
        console.log('getRandomUsers');
        const selected = [];
        for ( var i = 0; i < number; i++) {
            const index = Math.floor(Math.random() * people.length);
            if (selected.includes(index))  continue; 
            selected.push(index);
        }
        const selectedUsers = selected.map(index => {
            // people[{name: 'kenny', position:{lat:41.23, lng:-80.815}}]
            //var name={}, position={}; { name, position } = 
            const users = people[index];
            return users;                
        });
        return selectedUsers;
    },
    getUserLocation(position) {
        console.log('calling getUserLocation position=' + JSON.stringify(position, null, 3));
        const user = { position }
        this.axios.post('/users', user).then(response => {
            console.log(response);
        }) 
    },
    // addCircle(position) {
    //     this.circle = new google.maps.Circle({
    //         map: this.map,
    //         center: new google.maps.LatLng(position.lat, position.lng),
    //         radius: 2000,
    //         strokeColor: '#00ff00',
    //         fillColor: "#484040bf",
    //     });
    // },
    // withinRegion(position, user, radius) {
    //     const to = new google.maps.LatLng(user.position.lat, user.position.lng);
    //     const from = new google.maps.LatLng(position.lat, position.lng);
    //     const distance = google.maps.geometry.spherical.computeDistanceBetween(from, to);
    //     return distance <= radius;
    // }
  }
};
</script>