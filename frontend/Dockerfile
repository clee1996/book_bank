FROM node:14.17.6-alpine

WORKDIR /usr/src/app

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY tsconfig.json .

COPY src .

COPY webpack.config.js .

EXPOSE 8080

CMD ["yarn","start"]


