#!/bin/bash

echo "docker build run script"
# run it danno, @TO-DO add prod vs dev stsart modes. 

now="$(date)"
echo "Hello World bash startup for smstext maps $now"
# npm run start

echo "must have export GOOGLE_MAP_KEY = $GOOGLE_MAP_KEY"
if [ -z ${GOOGLE_MAP_KEY} ]; 
    then 
    echo "GOOGLE_MAP_KEY is unset, export GOOGLE_MAP_KEY= "
    exit 1;
fi
docker-compose up --build -d 
sed -i "s/GOOGLE_MAPS_API_KEY_REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/src/* 
# sed -i "s/GOOGLE_MAPS_API_KEY_REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/src/App.vue 
# sed -i "s/GOOGLE_MAPS_API_KEY_REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/dist/js/* 
cd usermap
npm run build
cd ..
sed -i "s/GOOGLE_MAPS_API_KEY_REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/dist/js/*
npm run build
## docker inspect --format="{{.Id}}" votersmap_smstest_1
docker container restart $(docker inspect --format="{{.Id}}" votersmap_smstest_1)
docker container ls
docker container restart 

exit 0