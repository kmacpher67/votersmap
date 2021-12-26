#!/bin/bash

# run it danno, @TO-DO add prod vs dev stsart modes. 

now="$(date)"
echo "Hello World bash startup for smstext maps $now"

# npm run start
export GOOGLE_MAP_KEY=GOOGLE_MAPS_API_KEY_REPLACE

echo "must have export GOOGLE_MAP_KEY = $GOOGLE_MAP_KEY"
if [ -z ${GOOGLE_MAP_KEY} ]; 
    then 
    echo "GOOGLE_MAP_KEY is unset, export GOOGLE_MAP_KEY= "
    exit 1;
fi

cd usermap
npm run build
cd ..
sed -i "s/GOOGLE_MAPS_API_KEY_REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/dist/js/*
npm run start

