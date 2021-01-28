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


# root@kubnodejs:/votersmap# docker container ls 
# CONTAINER ID        IMAGE                   COMMAND                  CREATED             STATUS              PORTS                      NAMES
# 55e4c87446ca        votersmap_vuejswebapp   "docker-entrypoint.s…"   27 hours ago        Up 27 hours         0.0.0.0:8080->8080/tcp     votersmap_vuejswebapp_1
# b9b8b241fefc        votersmap_smstest       "docker-entrypoint.s…"   27 hours ago        Up 23 hours         0.0.0.0:3000->3000/tcp     votersmap_smstest_1
# 60b77ab92e50        mongo:4.4.3             "docker-entrypoint.s…"   27 hours ago        Up 27 hours         0.0.0.0:27017->27017/tcp   mongo

export vm_container=$(docker inspect --format="{{.Id}}" votersmap_smstest_1);
echo "vm_container = $vm_container"
if [ -z "$(docker inspect --format="{{.Id}}" votersmap_smstest_1)" ]; 
    then 
    echo "container $vm_container doesn't exist starting ....:   docker-compose up --build -d  ";
    docker-compose up --build -d 
fi

echo "starting sed commands ... "
sed -i "s/GOOGLE_MAPS_API_KEY_REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/src/*.js 
#sed -i "s/GOOGLE_MAPS_API_KEY_REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/src/App.vue 
#sed -i "s/GOOGLE_MAPS_API_KEY_REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/dist/js/* 

echo "cd usermap npm run build vuejs app"
cd usermap
npm run build
cd ..
sed -i "s/GOOGLE_MAPS_API_KEY_REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/dist/js/*

echo "starting docker container restart"
export b=$(basename "$PWD")"_smstest_1"
echo $b
export containerid=$(docker inspect --format="{{.Id}}" $b)
echo $containerid
docker container restart $containerid
sleep 1
docker logs $containerid
docker container ls
sleep 15
docker logs $containerid
docker exec -it $containerid /bin/bash -c "ls -ltr usermap/dist";

exit 0