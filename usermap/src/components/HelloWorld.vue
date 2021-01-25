<template>
  <div>
    <div>
      <label>Voter Mapper Search and find.</label><br>
        <!-- <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete> -->
        <!-- <button @click="addMarker">Add</button>
      </label> -->

        <select class="wardSelected" @change="getPrecints($event)">
          <option value="WARREN-WARD 5">WARREN-WARD 5</option>
          <option v-for="ward in wards" :value="ward" :key="ward">{{ ward }}</option>
        </select>
        <select class="precinctSelected" v-model="precinctSelected" @change="precinctChange($event)">
          <option selected: value="WARREN CITY 5K" >WARREN CITY 5K</option>
          <option v-for="precint in precincts" :value="precint" :key="precint">{{ precint }}</option>
        </select>
      <label>
        <button @click="incrementScore" v-b-tooltip.hover title="totalScore Limit">{{scoreLimit}}</button>
      </label>
      <label>
        <button @click="getVoters">voters</button>
      </label>
      {{markers.length}}
    </div>
    <gmap-map
      :center="center"
      :zoom=zoom
      :fullscreenControl=true
      :zoomControl=true
      :streetViewControl=true
      style="width:100%; height:660px;"
    >
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :label="m.label"
          :title="m.title"
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
      voters: [],
      places: [],
      myOptionSelected: '',
      wards: ["WARREN-WARD 1", "WARREN-WARD 2",  "WARREN-WARD 3",  "WARREN-WARD 4",  "WARREN-WARD 5",  "WARREN-WARD 6","WARREN-WARD 7"],
      precincts: ["WARREN CITY 1A","WARREN CITY 1B","WARREN CITY 1E","WARREN CITY 1G","WARREN CITY 2C","WARREN CITY 2F","WARREN CITY 2G","WARREN CITY 3D","WARREN CITY 3G","WARREN CITY 3J","WARREN CITY 3K","WARREN CITY 3L","WARREN CITY 4A","WARREN CITY 4D","WARREN CITY 4F","WARREN CITY 5D","WARREN CITY 5E","WARREN CITY 5F","WARREN CITY 5G","WARREN CITY 5K","WARREN CITY 6B","WARREN CITY 6D","WARREN CITY 6G","WARREN CITY 7A","WARREN CITY 7C","WARREN CITY 7D"],
      users: [{name: 'kenny', position:{lat:41.238553, lng:-80.8258473}}],
      zoom:14,
      precinctSelected:"WARREN CITY 5K",
      wardSelected:"WARREN-WARD 5",
      scoreLimit:5,
      currentPlace: null
    };
  },

  mounted() {
    console.log('mounted method... in vue.use');
    this.geolocate();
    this.getUser();
    this.changeZoom();
    this.clickMe();
    this.fitBounds();
    this.getPrecincts();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      console.log('setPlace(place)  = ' + place);
      this.currentPlace = place;
    },
    changeZoom(zoomChangeValue) {
      console.log('change zoom in zoomChangeValue=' + zoomChangeValue);
      this.zoom = this.zoom+zoomChangeValue || 16;
    },
    incrementScore(clickEvent) {
      console.log('incrementScore(clickEvent) {' + clickEvent);
      console.log('precinctSelected='+ this.precinctSelected);
      this.scoreLimit = this.scoreLimit+1;
      if (this.scoreLimit>39) {
        this.scoreLimit=0;
      }
    }
    ,
    centerPage(positionLatLng) {
        console.log(' enterPage(positionLatLng)=' + positionLatLng);
        this.center = positionLatLng;
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
    clickMe: function() {
      console.log('clicking me users=' + this.users);
      this.getUser();
      console.log('clicking me users=' + this.users);
      this.users.forEach( (user ) => {
        console.log('setting markers on user='+ user);
        const marker = {
                title: user.name,
                label: user.name,
                position: {
                    lat: user.position.lat,
                    lng: user.position.lng
                    }
                };
          this.markers.push(marker );
        // this.places.push(this.currentPlace);
      });

    },fitBounds: function(){
          console.log('fitBounds' );
          // var b = new google.maps.LatLngBounds();
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('geolocate' + JSON.stringify(position, null, 3));
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    getPrecincts() {
      var targetUrl='/precincts';
      console.log('getPrecincts-- targetUrl=' + targetUrl);
       this.axios.get(targetUrl).then(response => {
              console.log(response.data);
              this.precincts = response.data;
          //end of happy path... 
          }).catch(function (error) {
                // handle error
                console.log(error);
                this.precincts = ["WARREN CITY 1A","WARREN CITY 1B","WARREN CITY 1E","WARREN CITY 1G","WARREN CITY 2C","WARREN CITY 2F","WARREN CITY 2G","WARREN CITY 3D","WARREN CITY 3G","WARREN CITY 3J","WARREN CITY 3K","WARREN CITY 3L","WARREN CITY 4A","WARREN CITY 4D","WARREN CITY 4F","WARREN CITY 5D","WARREN CITY 5E","WARREN CITY 5F","WARREN CITY 5G","WARREN CITY 5K","WARREN CITY 6B","WARREN CITY 6D","WARREN CITY 6G","WARREN CITY 7A","WARREN CITY 7C","WARREN CITY 7D"];
              });
    },
    precinctChange(events) {
      var targetUrl='/getprecinctByScore/' + this.precinctSelected + JSON.stringify(events,null,3);
      console.log('precinctChange(events) { -- targetUrl=' + targetUrl);

    },
    getVoters() {
      var targetUrl='/getprecinctByScore/WARREN%20CITY%205K/'+this.scoreLimit;
      console.log('getVoters() -- targetUrl=' + targetUrl);
      this.axios.get(targetUrl).then(response => {
              console.log(response.data);
              this.voters = response.data;
              console.log('votersize...' + this.voters.length);
              if (this.voters.length >0) {
                 this.center = {
                  lat: this.voters[0].geometry.location.lat,
                  lng: this.voters[0].geometry.location.lng
                };
              }
              this.markers = [];
                this.voters.forEach( (voter ) => {
                //console.log('setting markers on voter='+ JSON.stringify(voter, null, 3));
                var index = this.voters.indexOf(voter);
                const marker = {
                        title: voter.LAST_NAME+ voter.RESIDENTIAL_ADDRESS1,
                        label: voter.LAST_NAME+','+voter.totalVotes+voter.PARTY_AFFILIATION,
                        zIndex: 1001 + (index % 3),
                        labelStyle: {opacity: 1},
                        position: {
                            lat: voter.geometry.location.lat,
                            lng: voter.geometry.location.lng
                            }
                        };
                  this.markers.push(marker );
                // this.places.push(this.currentPlace);
              });
          
          //end of happy path... 
          }).catch(function (error) {
                // handle error
                console.log(error);
                //Default value for error block
                console.log(error);
                this.voters = [{"_id":"600adb4cad4ca1e0eeeba965","SOS_VOTERID":"OH0015769681","COUNTY_NUMBER":"78","COUNTY_ID":"26999","LAST_NAME":"PATSY","FIRST_NAME":"HOLLY","MIDDLE_NAME":"ELAINE","SUFFIX":"","DATE_OF_BIRTH":"1956-10-11","REGISTRATION_DATE":"1988-05-11","VOTER_STATUS":"ACTIVE","PARTY_AFFILIATION":"D","RESIDENTIAL_ADDRESS1":"2415 PARKWOOD DR NW","RESIDENTIAL_SECONDARY_ADDR":"","RESIDENTIAL_CITY":"WARREN","RESIDENTIAL_STATE":"OH","RESIDENTIAL_ZIP":"44485","RESIDENTIAL_ZIP_PLUS4":"","RESIDENTIAL_COUNTRY":"","RESIDENTIAL_POSTALCODE":"","MAILING_ADDRESS1":"","MAILING_SECONDARY_ADDRESS":"","MAILING_CITY":"","MAILING_STATE":"","MAILING_ZIP":"","MAILING_ZIP_PLUS4":"","MAILING_COUNTRY":"","MAILING_POSTAL_CODE":"","CAREER_CENTER":"TRUMBULL CAREER & TECH CENTER","CITY":"WARREN CITY","CITY_SCHOOL_DISTRICT":"WARREN CITY SD","COUNTY_COURT_DISTRICT":"","CONGRESSIONAL_DISTRICT":"13","COURT_OF_APPEALS":"11","EDU_SERVICE_CENTER_DISTRICT":"","EXEMPTED_VILL_SCHOOL_DISTRICT":"","LIBRARY":"","LOCAL_SCHOOL_DISTRICT":"","MUNICIPAL_COURT_DISTRICT":"WARREN","PRECINCT_NAME":"WARREN CITY 7C","PRECINCT_CODE":"78-P-AEK","STATE_BOARD_OF_EDUCATION":"07","STATE_REPRESENTATIVE_DISTRICT":"64","STATE_SENATE_DISTRICT":"32","TOWNSHIP":"","VILLAGE":"","WARD":"WARREN-WARD 7","PRIMARY-03/07/2000":"X","GENERAL-11/07/2000":"X","SPECIAL-05/08/2001":"X","GENERAL-11/06/2001":"X","PRIMARY-05/07/2002":"X","GENERAL-11/05/2002":"X","SPECIAL-05/06/2003":"X","GENERAL-11/04/2003":"X","PRIMARY-03/02/2004":"X","GENERAL-11/02/2004":"X","SPECIAL-02/08/2005":"","PRIMARY-05/03/2005":"","PRIMARY-09/13/2005":"","GENERAL-11/08/2005":"X","SPECIAL-02/07/2006":"","PRIMARY-05/02/2006":"X","GENERAL-11/07/2006":"X","PRIMARY-05/08/2007":"","PRIMARY-09/11/2007":"","GENERAL-11/06/2007":"X","PRIMARY-11/06/2007":"","GENERAL-12/11/2007":"","PRIMARY-03/04/2008":"D","PRIMARY-10/14/2008":"","GENERAL-11/04/2008":"X","GENERAL-11/18/2008":"","PRIMARY-05/05/2009":"","PRIMARY-09/08/2009":"","PRIMARY-09/15/2009":"","PRIMARY-09/29/2009":"","GENERAL-11/03/2009":"X","PRIMARY-05/04/2010":"D","PRIMARY-07/13/2010":"","PRIMARY-09/07/2010":"","GENERAL-11/02/2010":"X","PRIMARY-05/03/2011":"D","PRIMARY-09/13/2011":"","GENERAL-11/08/2011":"X","PRIMARY-03/06/2012":"D","GENERAL-11/06/2012":"X","PRIMARY-05/07/2013":"","PRIMARY-09/10/2013":"","PRIMARY-10/01/2013":"","GENERAL-11/05/2013":"","PRIMARY-05/06/2014":"D","GENERAL-11/04/2014":"X","PRIMARY-05/05/2015":"D","PRIMARY-09/15/2015":"","GENERAL-11/03/2015":"X","PRIMARY-03/15/2016":"D","GENERAL-06/07/2016":"","PRIMARY-09/13/2016":"","GENERAL-11/08/2016":"X","PRIMARY-05/02/2017":"","PRIMARY-09/12/2017":"","GENERAL-11/07/2017":"X","PRIMARY-05/08/2018":"D","GENERAL-08/07/2018":"","GENERAL-11/06/2018":"X","PRIMARY-05/07/2019":"D","PRIMARY-09/10/2019":"","GENERAL-11/05/2019":"X","PRIMARY-03/17/2020":"D","GENERAL-11/03/2020":""}];
              });
      },
    getUser() {
      console.log('getUser() ')
      this.users = this.setDefaultUsers();
      this.axios.get('/users').then(response => {
              console.log(response.data);
              this.users = this.getRandomUsers(response.data, 6)
          }).catch(function (error) {
            // handle error
            console.log('getUser() { error occurred');
            this.users = this.setDefaultUsers();
            console.log(error);
        });
        console.log('getUser() - this users = ' + this.users);
      },
    setDefaultUsers() {
      console.log('setting defult users');
      const DEF_USERS = [{"name": 'Oluyemi', "position": {"lat":41.238553, "lng": -80.8258473}}, {"name": 'kenny', "position":{"lat":41.2376032, "lng":-80.8104914}}];
      this.users = DEF_USERS;
      return DEF_USERS;
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