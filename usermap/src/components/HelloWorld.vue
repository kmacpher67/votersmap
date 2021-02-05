<template>
  <div>
    <div>
        <!-- <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete> -->
        <!-- <button @click="addMarker">Add</button>
      </label> -->
        <!-- <select class="wardSelected" @change="getPrecints($event)">
          <option value="WARREN-WARD 5">WARREN-WARD 5</option>
          <option v-for="ward in wards" :value="ward" :key="ward">{{ ward }}</option>
        </select> -->

        <select class="precinctSelected" v-model="precinctSelected" @change="precinctChange($event)">
          <option selected: value="WARREN CITY 5K" >WARREN CITY 5K</option>
          <option v-for="precint in precincts" :value="precint" :key="precint">{{ precint }}</option>
        </select>
      <label>
        <button @click="partyAffliationFilter" v-b-tooltip.hover title="Filter vote totals by party voter count T,D,M,R">{{partyAffliation}}</button>
      </label>
      <label>
        <button @click="incrementScore" v-b-tooltip.hover title="totalScore Limit">{{scoreLimit}}</button>
      </label>
      <label>
        <button @click="getVoters" v-b-tooltip.hover title="get new Voters query">voters</button>
      </label>
      m={{markers.length}}, tv={{voters.length}}
    </div>
    <gmap-map
      :center="center"
      :zoom=zoom
      :fullscreenControl=true
      :zoomControl=true
      :streetViewControl=true
      style="width:100%; height:700px;"
    >
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :label="m.label"
          :title="m.title"
          :icon="m.icon"
          :zIndex="m.zIndex"
          :clickable="true" @click="toggleInfoWindow(m,i)"
        ></gmap-marker>
          <gmap-info-window 
          :options="infoOptions" 
          :position="infoWindowPos" 
          :opened="infoWinOpen" 
          @closeclick="infoWinOpen=false">
            <div id="gmap-info-window-form">
            </div>
        </gmap-info-window>        
    </gmap-map>
      <label>Voter Mapper Search and find.</label>
      <button class="vs-component vs-button vs-button-primary vs-button-filled" color="red" @click="print">Print</button><br> 
    <div id="print" class='voterlist'> 
      {{precinctSelected}}
      <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th style="font-size: smaller;"><a v-on:click="sortVotersList('LAST_NAME')">Last Name</a></th>
                    <th>First Name</th>
                    <th><a v-on:click="sortVotersList('streetNum')">Str No</a></th>
                    <th><a v-on:click="sortVotersList('street')">Street</a></th>
                    <th style="font-size: smaller;"><a v-on:click="sortVotersList('DATE_OF_BIRTH')">birf</a></th>
                    <th style="font-size: smaller;"><a v-on:click="sortVotersList('muniVotes')">city vot</a></th>
                    <th><a v-on:click="sortVotersList('totalVotes')">tot</a></th>
                    <th><a v-on:click="sortVotersList('demVotes')">Ds</a></th>
                    <th><a v-on:click="sortVotersList('repVotes')">Rs</a></th>
                    <th style="font-size: smaller;">party</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="voter in voters" :key="voter._id" style="text-align:left">
                    <td style="font-size: smaller;">{{voter.LAST_NAME.toLowerCase().trim()}} </td>
                    <td style="font-size: smaller;">{{voter.FIRST_NAME.toLowerCase().trim()}} </td>
                    <td style="font-size: smaller;">{{voter.streetNum}}</td>
                    <td style="font-size: smaller;">{{voter.street}} {{voter.RESIDENTIAL_ADDRESS2}}</td>
                    <td style="font-size: smaller;">{{voter.DATE_OF_BIRTH.substr(0, 4)}}</td>
                    <td style="text-align:center">{{voter.muniVotes}}</td>
                    <td style="text-align:center">{{voter.totalVotes}}</td>
                    <td style="text-align:center">{{voter.demVotes}}</td>
                    <td style="text-align:center">{{voter.repVotes}}</td>
                    <td style="text-align:center"> {{voter.PARTY_AFFILIATION}}</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 41.238553, lng: -80.8258473 },
      markers: [],
      voters: [],
      places: [],
      infoOptionText: '',
      infoOptionVoter: null,
      wards: ["WARREN-WARD 1", "WARREN-WARD 2",  "WARREN-WARD 3",  "WARREN-WARD 4",  "WARREN-WARD 5",  "WARREN-WARD 6","WARREN-WARD 7"],
      precincts: ["WARREN CITY 1A","WARREN CITY 1B","WARREN CITY 1E","WARREN CITY 1G","WARREN CITY 2C","WARREN CITY 2F","WARREN CITY 2G","WARREN CITY 3D","WARREN CITY 3G","WARREN CITY 3J","WARREN CITY 3K","WARREN CITY 3L","WARREN CITY 4A","WARREN CITY 4D","WARREN CITY 4F","WARREN CITY 5D","WARREN CITY 5E","WARREN CITY 5F","WARREN CITY 5G","WARREN CITY 5K","WARREN CITY 6B","WARREN CITY 6D","WARREN CITY 6G","WARREN CITY 7A","WARREN CITY 7C","WARREN CITY 7D"],
      users: [{name: 'kenny', position:{lat:41.238553, lng:-80.8258473}}],
      zoom:14,
      precinctSelected:"WARREN CITY 5K",
      wardSelected:"WARREN-WARD 5",
      partyAffliation:"M",
      scoreLimit:1,
      blueURL:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      redURL:"http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      greenURL:"http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        content: '',
        maxWidth: 390,
        background: 'blue',
            // optional: offset infowindow so it visually sits nicely on top of our marker
            pixelOffset: {
              width: 15,
              height: -15
          }
      },
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
    },
    print() {
      var prtContent = document.getElementById("print");
      var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
      WinPrint.document.write(prtContent.innerHTML);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    },
    centerPage(positionLatLng) {
        console.log(' enterPage(positionLatLng)=' + positionLatLng);
        this.center = positionLatLng;
    },
    toggleInfoWindow: function(marker, idx) {
        console.log('toggleInfoWindow: function(marker, idx) {' + JSON.stringify(marker,null,3) + idx);
            this.infoWindowPos = marker.position;
            this.infoOptions.content='';

            // should we be checking voters and adding them as additional markers
            var allAddresses = this.markers.filter(function(item) {
                return item.RESIDENTIAL_ADDRESS1 == marker.RESIDENTIAL_ADDRESS1;
            });
            console.log('markers filtered for allAddresses =' + allAddresses );

            var locInfoAddresses = this.findOtherAddresses(this.voters[marker.voterIndex]);

            locInfoAddresses.forEach( (element, index) => {
              console.log(element + index);
              if (index>0) { 
                this.infoOptions.content = this.infoOptions.content + '<br>'
              }
              console.log('this.infoOptions=' + this.infoOptions);
              this.infoOptions.content = this.infoOptions.content + this.parseVoterInfoText(element);
            });

            this.infoOptions.content='<div id="components-demo"><button-counter></button-counter></div><div id="voterInfoDetails" class="infopage">'+this.infoOptions.content;
            this.infoOptions.content= this.infoOptions.content+'</div><button onclick="console.log(this);window.getSelection().removeAllRanges(); var range = document.createRange(); range.selectNode(document.getElementById(\'voterInfoDetails\'));window.getSelection().addRange(range);document.execCommand(\'copy\');">Copy to Clipboard</button> ';

            //this.infoOptions.content = marker.infoText;
            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == idx) {
              this.infoWinOpen = !this.infoWinOpen;
            }
            //if different marker set infowindow to open and reset current marker index
            else {
              this.infoWinOpen = true;
              this.currentMidx = idx;

            }
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
    sortVotersList: function(sortKey='muniVotes') {
      console.log(' sortVotersList: function(sortKey=) {' + sortKey);
      this.voters.sort((a, b) => this.compare(a, b, sortKey) );
      console.log('    AFTER sortVotersList: function(sortKey=) {' + sortKey);
    },
    compare( a, b, keyValue='RESIDENTIAL_ADDRESS1' ) {
      if ( a[keyValue] < b[keyValue] ){
        return -1;
      }
      if ( a[keyValue] > b[keyValue] ){
        return 1;
      }
      return 0;
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
    partyAffliationFilter() {
      console.log('partyAffliationFilter() { = ' + this.partyAffliation);

      if (this.partyAffliation == 'T' ) {
        this.partyAffliation = 'D'
      } else if (this.partyAffliation == 'D'){
        this.partyAffliation = 'M'
      } else if (this.partyAffliation == 'M'){
        this.partyAffliation = 'R'
      } else {
        this.partyAffliation = 'T'
      }
      this.placeMarkers();
    },
    votersListStreet() {
      console.log('votersListStreet() { adding values like street Name & streetnum');
      this.voters.forEach( (voter ) => {
        var a = voter.RESIDENTIAL_ADDRESS1.trim().split(' '), number, street;
        if (a.length <= 1) {
          console.log('votersListStreet() { =');
          return;
        }
        number = a.shift();
        voter.streetNum=number;
        street = a.shift().toLowerCase() || '';
        if (a.length >1 || street.length == 1) {
          street = street + ' ' + a.shift().toLowerCase();
        }
        voter.street=street;
        // console.log('voter street stuff: =' + number + ' ' + street+ ' streetNum=' +  voter.streetnum + ' street=' + voter.street );
      });
    },
    getVoters() {
      var targetUrl='/getprecinctByScore/'+this.precinctSelected+'/'+this.scoreLimit;
      console.log('getVoters() -- targetUrl=' + targetUrl);
      this.axios.get(targetUrl).then(response => {
              console.log(response.data);
              this.voters = response.data;
              console.log('votersize...' + this.voters.length);
              // this.sortVotersList();
              this.votersListStreet();
              if (this.voters.length >0) {
                 this.center = {
                  lat: this.voters[0].geometry.location.lat,
                  lng: this.voters[0].geometry.location.lng
                };
              }
             this.placeMarkers();
          //end of happy path... 
          }).catch(function (error) {
                // handle error
                console.error(error);
                //Default value for error block
                //this.voters = [{"_id":"600adb4cad4ca1e0eeeba965","SOS_VOTERID":"OH0015769681","COUNTY_NUMBER":"78","COUNTY_ID":"26999","LAST_NAME":"PATSY","FIRST_NAME":"HOLLY","MIDDLE_NAME":"ELAINE","SUFFIX":"","DATE_OF_BIRTH":"1956-10-11","REGISTRATION_DATE":"1988-05-11","VOTER_STATUS":"ACTIVE","PARTY_AFFILIATION":"D","RESIDENTIAL_ADDRESS1":"2415 PARKWOOD DR NW","RESIDENTIAL_SECONDARY_ADDR":"","RESIDENTIAL_CITY":"WARREN","RESIDENTIAL_STATE":"OH","RESIDENTIAL_ZIP":"44485","RESIDENTIAL_ZIP_PLUS4":"","RESIDENTIAL_COUNTRY":"","RESIDENTIAL_POSTALCODE":"","MAILING_ADDRESS1":"","MAILING_SECONDARY_ADDRESS":"","MAILING_CITY":"","MAILING_STATE":"","MAILING_ZIP":"","MAILING_ZIP_PLUS4":"","MAILING_COUNTRY":"","MAILING_POSTAL_CODE":"","CAREER_CENTER":"TRUMBULL CAREER & TECH CENTER","CITY":"WARREN CITY","CITY_SCHOOL_DISTRICT":"WARREN CITY SD","COUNTY_COURT_DISTRICT":"","CONGRESSIONAL_DISTRICT":"13","COURT_OF_APPEALS":"11","EDU_SERVICE_CENTER_DISTRICT":"","EXEMPTED_VILL_SCHOOL_DISTRICT":"","LIBRARY":"","LOCAL_SCHOOL_DISTRICT":"","MUNICIPAL_COURT_DISTRICT":"WARREN","PRECINCT_NAME":"WARREN CITY 7C","PRECINCT_CODE":"78-P-AEK","STATE_BOARD_OF_EDUCATION":"07","STATE_REPRESENTATIVE_DISTRICT":"64","STATE_SENATE_DISTRICT":"32","TOWNSHIP":"","VILLAGE":"","WARD":"WARREN-WARD 7","PRIMARY-03/07/2000":"X","GENERAL-11/07/2000":"X","SPECIAL-05/08/2001":"X","GENERAL-11/06/2001":"X","PRIMARY-05/07/2002":"X","GENERAL-11/05/2002":"X","SPECIAL-05/06/2003":"X","GENERAL-11/04/2003":"X","PRIMARY-03/02/2004":"X","GENERAL-11/02/2004":"X","SPECIAL-02/08/2005":"","PRIMARY-05/03/2005":"","PRIMARY-09/13/2005":"","GENERAL-11/08/2005":"X","SPECIAL-02/07/2006":"","PRIMARY-05/02/2006":"X","GENERAL-11/07/2006":"X","PRIMARY-05/08/2007":"","PRIMARY-09/11/2007":"","GENERAL-11/06/2007":"X","PRIMARY-11/06/2007":"","GENERAL-12/11/2007":"","PRIMARY-03/04/2008":"D","PRIMARY-10/14/2008":"","GENERAL-11/04/2008":"X","GENERAL-11/18/2008":"","PRIMARY-05/05/2009":"","PRIMARY-09/08/2009":"","PRIMARY-09/15/2009":"","PRIMARY-09/29/2009":"","GENERAL-11/03/2009":"X","PRIMARY-05/04/2010":"D","PRIMARY-07/13/2010":"","PRIMARY-09/07/2010":"","GENERAL-11/02/2010":"X","PRIMARY-05/03/2011":"D","PRIMARY-09/13/2011":"","GENERAL-11/08/2011":"X","PRIMARY-03/06/2012":"D","GENERAL-11/06/2012":"X","PRIMARY-05/07/2013":"","PRIMARY-09/10/2013":"","PRIMARY-10/01/2013":"","GENERAL-11/05/2013":"","PRIMARY-05/06/2014":"D","GENERAL-11/04/2014":"X","PRIMARY-05/05/2015":"D","PRIMARY-09/15/2015":"","GENERAL-11/03/2015":"X","PRIMARY-03/15/2016":"D","GENERAL-06/07/2016":"","PRIMARY-09/13/2016":"","GENERAL-11/08/2016":"X","PRIMARY-05/02/2017":"","PRIMARY-09/12/2017":"","GENERAL-11/07/2017":"X","PRIMARY-05/08/2018":"D","GENERAL-08/07/2018":"","GENERAL-11/06/2018":"X","PRIMARY-05/07/2019":"D","PRIMARY-09/10/2019":"","GENERAL-11/05/2019":"X","PRIMARY-03/17/2020":"D","GENERAL-11/03/2020":""}];
              });
    },
    setMarkerIconUrl (voter) {
      console.log('setMarkerIcon (voter) { voter');
      var iconurl='http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
      if (voter.PARTY_AFFILIATION == 'R') {
          iconurl = this.redURL
      } else if (voter.PARTY_AFFILIATION == 'D') {
          iconurl = this.blueURL;
      } else {
          iconurl = this.greenURL;
      }
    return iconurl;
    },
    placeMarkers() {
      console.log('placeMarkers() scoreLimit={' + this.scoreLimit + ' this.partyAffliation=' + this.partyAffliation);
      this.markers = [];
        this.voters.forEach( (voter ) => {
                //console.log('setting markers on voter='+ JSON.stringify(voter, null, 3));
            var index = this.voters.indexOf(voter);
            //if (this.partyAffliation == voter.PARTY_AFFILIATION) {this.setVoterMarker(voter, index); } 
            if (this.partyAffliation == 'R' ) {
              //console.log('this.partyAffliation = ' + this.partyAffliation + voter.muniVotes + voter.PARTY_AFFILIATION + (this.partyAffliation == 'D' && voter.PARTY_AFFILIATION != 'D'));
              if (voter.repVotes >=this.scoreLimit ) {this.setVoterMarker(voter, index);}
            }
            if (this.partyAffliation == 'D' ) {
              //console.log('this.partyAffliation = ' + this.partyAffliation + voter.muniVotes + voter.PARTY_AFFILIATION + (this.partyAffliation == 'D' && voter.PARTY_AFFILIATION != 'D'));
              if (voter.demVotes >=this.scoreLimit ) {this.setVoterMarker(voter, index);}
            }
            if (this.partyAffliation == 'M') {
              // console.log('this.partyAffliation = ' + this.partyAffliation + voter.muniVotes + voter.PARTY_AFFILIATION + (this.partyAffliation == 'D' && voter.PARTY_AFFILIATION != 'D'));
              if (voter.muniVotes >= this.scoreLimit ) {this.setVoterMarker(voter, index);}
            }
            if (this.partyAffliation == 'T' ) {
              if (voter.totalVotes>=this.scoreLimit) {
                this.setVoterMarker(voter, index);
              }
            }
          });
    },
    setVoterMarker(voter, index) {
          var iconurl='http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
          iconurl = this.setMarkerIconUrl(voter);
          var infoText = voter;
          delete infoText.geometry.bounds;
          delete infoText.geometry.viewport;
          const marker = {
                  voterIndex: index,
                  sosVoterID: voter.SOS_VOTERID,
                  title: voter.LAST_NAME+ voter.RESIDENTIAL_ADDRESS1,
                  label: {text:voter.LAST_NAME+'~'+voter.totalVotes+voter.PARTY_AFFILIATION, fontSize:'9px', labelStyle: {opacity: 1}},
                  zIndex: 100001 + (index % 3),
                  infoText: JSON.stringify(infoText),
                  icon: {
                      url: iconurl,
                      strokeColor: '#000000',
                      strokeWeight: 1,
                      scale: 2,
                  },
                  position: {
                      lat: voter.geometry.location.lat,
                      lng: voter.geometry.location.lng
                      }
                  };
            if (this.markers>501) {
              console.log('MARKERS LIMIT !!! - if (this.markers>501) {');
            } else {
              this.markers.push(marker); // this.places.push(this.currentPlace);
            }
            
    },
    findOtherAddresses(targetVoter) {
      console.log(' findOtherAddresses(targetVoter) {=' + targetVoter.RESIDENTIAL_ADDRESS1);
      
      var votersAtAddress = this.voters.filter(function (el) {
          return el.RESIDENTIAL_ADDRESS1 == targetVoter.RESIDENTIAL_ADDRESS1;
        });

      //console.log('votersatadress = ' + JSON.stringify(votersAtAddress,null,3));
      return votersAtAddress;
    },
    parseVoterInfoText(voterinfo) {
      console.log('parseVoterInfoText() {=' + voterinfo.SOS_VOTERID + voterinfo.LAST_NAME);

      var voterInfoText = '<label>OhioID:'+ voterinfo.SOS_VOTERID + ' </label><br/>';
      // voterInfoText = voterInfoText + '<label> CountyID:'+ voterinfo.COUNTY_ID + '</label><br/>';
      voterInfoText = voterInfoText + '<label>'+ voterinfo.FIRST_NAME + ' </label> ';
      voterInfoText = voterInfoText + '<label> '+ voterinfo.LAST_NAME + ' </label><br/>';
      voterInfoText = voterInfoText + '<label>'+ voterinfo.RESIDENTIAL_ADDRESS1 + ' </label>';
      voterInfoText = voterInfoText + '<label>  '+ (voterinfo.RESIDENTIAL_ADDRESS2 ||'') + '</label><br/>';
      voterInfoText = voterInfoText + '<label>  '+ (voterinfo.PRECINCT_NAME ||'') + '</label><br/>';
      voterInfoText = voterInfoText + '<label>Reg:'+voterinfo.REGISTRATION_DATE + '</label>,';
      voterInfoText = voterInfoText + '<label>Birth:'+voterinfo.DATE_OF_BIRTH + '</label><br/>';
      // voterInfoText = voterInfoText + '<textarea class="form-control" v-model="voterinfo.notes" placeholder="add multiple lines" rows="5" cols="30">'+(voterinfo.notes ||'')+'</textarea><br/>';
      voterInfoText = voterInfoText + ' Total Votes='+voterinfo.totalVotes + ' Muni='+voterinfo.muniVotes +' Dems='+voterinfo.demVotes +' Reps='+voterinfo.repVotes +' Party='+voterinfo.PARTY_AFFILIATION + '<br/>';
      // voterInfoText = voterInfoText + '<br/>';

      this.infoOptionText = voterInfoText;
      return voterInfoText;
    },
    selectCopy(containerid) {
      console.log('selectCopy(containerid) { = ' + containerid);
      var range = document.createRange();
      range.selectNode(document.getElementById(containerid));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    },
    getVoter(voterRec) {
      console.log('getVoter(voterRec) ='+ JSON.stringify(voterRec))
      this.axios.get('/users/'+JSON.stringify(voterRec)).then(response => {
              console.log(response.data.json);
              this.currentVoterDetails=response.data.json;
              return response.data.json;
          }).catch(function (error) {
            // handle error
            console.log('getVoter(voterRec) { error occurred');
            console.log(error);
        });
    },
    updateVoterNotes(voterInfoUpdate) {
      console.log('updateVoterNotes(voterInfoUpdate) {' + JSON.stringify(voterInfoUpdate, null, 3));


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
  }
};
</script>

<style>
  .infopage {
    font-size:larger;
  }
  .voterlist {
    font-size: smaller;
    border-spacing: 1px;
  }
</style>