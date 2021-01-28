FROM node:12.13.1 AS builder

WORKDIR /app

# RUN apt-get update && apt-get install curl -y

COPY ./package.json ./
# RUN npm install --only=production

RUN rm -f package-lock.json
RUN rm -f usermap/package-lock.json
RUN /usr/local/bin/npm install

RUN echo "/usr/local/bin/npm install -g @nestjs/cli"
# RUN npm install
RUN /usr/local/bin/npm install -g @nestjs/cli


RUN echo "/usr/local/bin/npm install -g @vue/cli "
RUN /usr/local/bin/npm install -g @vue/cli 

COPY ./*.js* ./
COPY ./src ./src
COPY ./nest-cli.json ./
COPY ./tsconfig* ./
COPY ./docker-run-nest.sh ./

RUN /usr/local/bin/npm run build

# COPY front end web code 
COPY ./usermap/ ./usermap/

RUN echo "build vuesj dist production of voter UI app: cd usermap; npm install; npm run build"
RUN rm -f usermap/package-lock.json
RUN cd usermap; npm install; npm run build
RUN cd -

RUN echo "the var GOOGLE_MAPS_API_KEY should be set "; [ -z "$var" ] && echo "Empty"
RUN sed -i "s/GOOGLE_MAPS_API_KEY_REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/src/App.vue
RUN sed -i "s/GOOGLE_MAPS_API_KEY_REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/src/main.js 
RUN sed -i "s/GOOGLE_MAPS_API_KEY_REPLACE/$GOOGLE_MAPS_API_KEY/g" usermap/dist/js/* 

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
