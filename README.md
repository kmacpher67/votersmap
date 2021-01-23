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



## Docker hell issues for containerization

WARNING: Image for service smstest was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.

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



## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
