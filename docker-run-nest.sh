#!/bin/bash

# run it danno, @TO-DO add prod vs dev stsart modes. 

now="$(date)"
echo "Hello World bash startup for smstext maps $now"
# npm run start
npm run start:dev 

echo "npm location "
which npm 

/usr/local/bin/npm -version