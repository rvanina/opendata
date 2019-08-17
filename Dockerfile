FROM keymetrics/pm2:10-alpine

RUN apk add --no-cache http-parser

RUN echo -e 'http://dl-cdn.alpinelinux.org/alpine/edge/main\nhttp://dl-cdn.alpinelinux.org/alpine/edge/community\nhttp://dl-cdn.alpinelinux.org/alpine/edge/testing' > /etc/apk/repositories
RUN apk add --no-cache yarn git python make g++

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 8888

WORKDIR /app/front

RUN yarn
RUN yarn build

WORKDIR /app

ENV NODE_ENV="production"