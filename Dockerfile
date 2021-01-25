FROM node:12.13.1 AS builder

WORKDIR /app

# RUN apt-get update && apt-get install curl -y

COPY ./package.json ./
# RUN npm install --only=production
RUN /usr/local/bin/npm install

COPY ./*.js* ./
COPY ./src ./src
COPY ./nest-cli.json ./
COPY ./tsconfig* ./
COPY ./docker-run-nest.sh ./

RUN /usr/local/bin/npm run build

# COPY front end web code 
COPY ./usermap/ ./usermap/

RUN npm install -g @vue/cli
RUN cd usermap; npm install
RUN echo "the var GOOGLE_MAPS_API_KEY should be set "; [ -z "$var" ] && echo "Empty"
RUN cd usermap; npm run build  
RUN sed -i "s/GOOGLE_MAPS_API_KEY_REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/dist/App.vue
RUN sed -i "s/GOOGLE_MAPS_API_KEY_REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/src/main.js 
RUN sed -i "s/GOOGLE_MAPS_API_KEY_REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/dist/js/* 


# RUN npm install
RUN /usr/local/bin/npm i -g @nestjs/cli

# RUN nest -v 
# RUN npm run start:dev
# RUN npm run build
# RUN nest build

RUN cd /app
RUN chmod +x docker-run-nest.sh

# ENTRYPOINT $app/docker-run-nest.sh
# CMD ["/bin/bash" "-c" "/usr/local/bin/npm" "run" "start:dev"]
RUN echo "build almost complete test this change v1"

CMD ["/app/docker-run-nest.sh"]
