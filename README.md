<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Voter data base location 
https://www6.ohiosos.gov/ords/f?p=VOTERFTP:HOME::::::


## Data Dictionary 

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

### ward level: 
http://localhost:3000/getward/WARREN-WARD%207



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
