FROM vuejs/ci

WORKDIR /usr/src/app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

RUN npm install

# COPY ./* /
COPY . .
RUN npm run build

RUN npm install -g @vue/cli

EXPOSE 8080

# start app
CMD ["npm", "run", "serve"]
