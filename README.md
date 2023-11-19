<p align="center">
  <a href="http://208.117.85.199:3000/" target="blank"><img src="" width="320" alt="Citizen Tools" /></a>
</p>

BETA VERSION 
========

There 

## Voter data base location 
https://www6.ohiosos.gov/ords/f?p=VOTERFTP:HOME::::::


# Backend Nest JS database and details: 

HINT
For quickly creating a CRUD controller with the validation built-in, you may use the CLI's CRUD generator: nest g resource [name].

## Data Dictionary 

db.getCollection('voters').createIndex({"SOS_VOTERID":1})
db.getCollection('voters').createIndex({"lastUpdate":1})
db.getCollection('voters').createIndex({"PRECINCT_NAME":1})


{
    "createdCollectionAutomatically" : false,
    "numIndexesBefore" : 2,
    "numIndexesAfter" : 3,
    "ok" : 1.0
}


See the Ohio SOS Voter_File_Layout.docx for details.

SOS Voter Id
County Number
County Id
Last Name
First Name
Middle Name
Suffix
Date Of Birth
Registration Date
Voter Status
Party Affiliation
Residential Address1
Residential Address 2 
Residential City
Residential State
Residential Zip
Residential Zip Plus 4
Residential Country
Residential Postal Code

Current flat map from SOS website download and insert: 

_id
/* 1 */
{
    "_id" : object,
    "SOS_VOTERID" : string,
    "COUNTY_NUMBER" : string,
    "COUNTY_ID" : string,
    "LAST_NAME" : string,
    "FIRST_NAME" : string,
    "MIDDLE_NAME" : string,
    "SUFFIX" : string,
    "DATE_OF_BIRTH" : string,
    "REGISTRATION_DATE" : string,
    "VOTER_STATUS" : string,
    "PARTY_AFFILIATION" : string,
    "RESIDENTIAL_ADDRESS1" : string,
    "RESIDENTIAL_SECONDARY_ADDR" : string,
    "RESIDENTIAL_CITY" : string,
    "RESIDENTIAL_STATE" : string,
    "RESIDENTIAL_ZIP" : string,
    "RESIDENTIAL_ZIP_PLUS4" : string,
    "RESIDENTIAL_COUNTRY" : string,
    "RESIDENTIAL_POSTALCODE" : string,
    "MAILING_ADDRESS1" : 1.0,
    "MAILING_SECONDARY_ADDRESS" : 1.0,
    "MAILING_CITY" : 1.0,
    "MAILING_STATE" : 1.0,
    "MAILING_ZIP" : 1.0,
    "MAILING_ZIP_PLUS4" : 1.0,
    "MAILING_COUNTRY" : 1.0,
    "MAILING_POSTAL_CODE" : 1.0,
    "CAREER_CENTER" : 1.0,
    "CITY" : 1.0,
    "CITY_SCHOOL_DISTRICT" : 1.0,
    "COUNTY_COURT_DISTRICT" : 1.0,
    "CONGRESSIONAL_DISTRICT" : 1.0,
    "COURT_OF_APPEALS" : 1.0,
    "EDU_SERVICE_CENTER_DISTRICT" : 1.0,
    "EXEMPTED_VILL_SCHOOL_DISTRICT" : 1.0,
    "LIBRARY" : 1.0,
    "LOCAL_SCHOOL_DISTRICT" : 1.0,
    "MUNICIPAL_COURT_DISTRICT" : 1.0,
    "PRECINCT_NAME" : 1.0,
    "PRECINCT_CODE" : 1.0,
    "STATE_BOARD_OF_EDUCATION" : 1.0,
    "STATE_REPRESENTATIVE_DISTRICT" : 1.0,
    "STATE_SENATE_DISTRICT" : 1.0,
    "TOWNSHIP" : 1.0,
    "VILLAGE" : 1.0,
    "WARD" : 1.0,
    "PRIMARY-03/07/2000" : 1.0,
    "GENERAL-11/07/2000" : 1.0,
    "SPECIAL-05/08/2001" : 1.0,
    "GENERAL-11/06/2001" : 1.0,
    "PRIMARY-05/07/2002" : 1.0,
    "GENERAL-11/05/2002" : 1.0,
    "SPECIAL-05/06/2003" : 1.0,
    "GENERAL-11/04/2003" : 1.0,
    "PRIMARY-03/02/2004" : 1.0,
    "GENERAL-11/02/2004" : 1.0,
    "SPECIAL-02/08/2005" : 1.0,
    "PRIMARY-05/03/2005" : 1.0,
    "PRIMARY-09/13/2005" : 1.0,
    "GENERAL-11/08/2005" : 1.0,
    "SPECIAL-02/07/2006" : 1.0,
    "PRIMARY-05/02/2006" : 1.0,
    "GENERAL-11/07/2006" : 1.0,
    "PRIMARY-05/08/2007" : 1.0,
    "PRIMARY-09/11/2007" : 1.0,
    "GENERAL-11/06/2007" : 1.0,
    "PRIMARY-11/06/2007" : 1.0,
    "GENERAL-12/11/2007" : 1.0,
    "PRIMARY-03/04/2008" : 1.0,
    "PRIMARY-10/14/2008" : 1.0,
    "GENERAL-11/04/2008" : 1.0,
    "GENERAL-11/18/2008" : 1.0,
    "PRIMARY-05/05/2009" : 1.0,
    "PRIMARY-09/08/2009" : 1.0,
    "PRIMARY-09/15/2009" : 1.0,
    "PRIMARY-09/29/2009" : 1.0,
    "GENERAL-11/03/2009" : 1.0,
    "PRIMARY-05/04/2010" : 1.0,
    "PRIMARY-07/13/2010" : 1.0,
    "PRIMARY-09/07/2010" : 1.0,
    "GENERAL-11/02/2010" : 1.0,
    "PRIMARY-05/03/2011" : 1.0,
    "PRIMARY-09/13/2011" : 1.0,
    "GENERAL-11/08/2011" : 1.0,
    "PRIMARY-03/06/2012" : 1.0,
    "GENERAL-11/06/2012" : 1.0,
    "PRIMARY-05/07/2013" : 1.0,
    "PRIMARY-09/10/2013" : 1.0,
    "PRIMARY-10/01/2013" : 1.0,
    "GENERAL-11/05/2013" : 1.0,
    "PRIMARY-05/06/2014" : 1.0,
    "GENERAL-11/04/2014" : 1.0,
    "PRIMARY-05/05/2015" : 1.0,
    "PRIMARY-09/15/2015" : 1.0,
    "GENERAL-11/03/2015" : 1.0,
    "PRIMARY-03/15/2016" : 1.0,
    "GENERAL-06/07/2016" : 1.0,
    "PRIMARY-09/13/2016" : 1.0,
    "GENERAL-11/08/2016" : 1.0,
    "PRIMARY-05/02/2017" : 1.0,
    "PRIMARY-09/12/2017" : 1.0,
    "GENERAL-11/07/2017" : 1.0,
    "PRIMARY-05/08/2018" : 1.0,
    "GENERAL-08/07/2018" : 1.0,
    "GENERAL-11/06/2018" : 1.0,
    "PRIMARY-05/07/2019" : 1.0,
    "PRIMARY-09/10/2019" : 1.0,
    "GENERAL-11/05/2019" : 1.0,
    "PRIMARY-03/17/2020" : 1.0,
    "GENERAL-11/03/2020" : 1.0,
    "demVotes" : 1.0,
    "geometry" : 1.0,
    "muniVotes" : 1.0,
    "place_id" : 1.0,
    "repVotes" : 1.0,
    "totalVotes" : 1.0,
    "types" : 1.0
}


## Seeding Data from SOS site: 

(base) kenmac@kenmac-ThinkPad-P53:~/personal/nestjs1/smstext$ node csvjson.js
Inserted: 136884 rows

## mongo db collection: 

> db.getCollection("voters").find({"CITY":"WARREN CITY"}).size()
24466
> 

> db.getCollection("voters").find({"CITY":"WARREN CITY"}).size()
24466
> db.getCollection("voters").find({"CITY":"WARREN CITY", "WARD":"WARREN-WARD 7"}).size()
2896
> db.getCollection("voters").find({"CITY":"WARREN CITY", "WARD":"WARREN-WARD 1"}).size()
4199


## security authentication setup

https://docs.nestjs.com/security/authentication

```
curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
# result -> {"userId":1,"username":"john"}
```

cd usermap
https://blog.jscrambler.com/vue-js-authentication-system-with-node-js-backend/


## Docker hell issues for containerization

WARNING: Image for service smstest was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `ls `.

docker build -t smstext_smstest:latest .

docker-compose up -d

### docker-compose --build somethings useful: 

docker-compose up --build -d

## Remember there are two Dockerfiles:

1> this container top directory
2> usermaps vuejs 

# Deploy dist to nestjs run as static content: fuck
https://cli.vuejs.org/guide/deployment.html#general-guidelines


## UI vuejs

npm install -g @vue/cli
npm install -g @vue-cli-service


## cool end points for test see usermapper README

### precinct level: 
http://localhost:3000/getprecinct/WARREN%20CITY%205K

WARREN CITY 1A
WARREN CITY 1B
WARREN CITY 1E
WARREN CITY 1G
WARREN CITY 2C
WARREN CITY 2F
WARREN CITY 2G
WARREN CITY 3D
WARREN CITY 3G
WARREN CITY 3J
WARREN CITY 3K
WARREN CITY 3L
WARREN CITY 1E
WARREN CITY 1E
WARREN CITY 1E
WARREN CITY 4A
WARREN CITY 4A
WARREN CITY 4A
WARREN CITY 5D
WARREN CITY 5E
WARREN CITY 5F
WARREN CITY 5G
WARREN CITY 5K
WARREN CITY 6B
WARREN CITY 6D
WARREN CITY 6G
WARREN CITY 7A
WARREN CITY 7C
WARREN CITY 7D


### ward level: 
http://localhost:3000/getward/WARREN-WARD%207

WARREN-WARD 1
WARREN-WARD 2
WARREN-WARD 3
WARREN-WARD 4
WARREN-WARD 5
WARREN-WARD 6
WARREN-WARD 7


# Google maps geolocation 

https://developers.google.com/maps/documentation/geocoding/overview
```
{
   "results" : [
      {
         "address_components" : [
            {
               "long_name" : "1600",
               "short_name" : "1600",
               "types" : [ "street_number" ]
            },
            {
               "long_name" : "Amphitheatre Pkwy",
               "short_name" : "Amphitheatre Pkwy",
               "types" : [ "route" ]
            },
            {
               "long_name" : "Mountain View",
               "short_name" : "Mountain View",
               "types" : [ "locality", "political" ]
            },
            {
               "long_name" : "Santa Clara County",
               "short_name" : "Santa Clara County",
               "types" : [ "administrative_area_level_2", "political" ]
            },
            {
               "long_name" : "California",
               "short_name" : "CA",
               "types" : [ "administrative_area_level_1", "political" ]
            },
            {
               "long_name" : "United States",
               "short_name" : "US",
               "types" : [ "country", "political" ]
            },
            {
               "long_name" : "94043",
               "short_name" : "94043",
               "types" : [ "postal_code" ]
            }
         ],
         "formatted_address" : "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
         "geometry" : {
            "location" : {
               "lat" : 37.4224764,
               "lng" : -122.0842499
            },
            "location_type" : "ROOFTOP",
            "viewport" : {
               "northeast" : {
                  "lat" : 37.4238253802915,
                  "lng" : -122.0829009197085
               },
               "southwest" : {
                  "lat" : 37.4211274197085,
                  "lng" : -122.0855988802915
               }
            }
         },
         "place_id" : "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
         "plus_code": {
            "compound_code": "CWC8+W5 Mountain View, California, United States",
            "global_code": "849VCWC8+W5"
         },
         "types" : [ "street_address" ]
      }
   ],
   "status" : "OK"
}
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
