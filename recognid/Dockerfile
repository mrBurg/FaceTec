FROM node:17
RUN mkdir -p /usr/src/app/node_modules
WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

#USER node
RUN npm install

COPY  . .
RUN npm run next:build

EXPOSE 80

CMD ["npm","run",":server"]


