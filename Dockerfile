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
