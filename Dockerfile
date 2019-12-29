FROM node:10.16.3-alpine as builder
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY packages/calendar/package.json packages/calendar/package.json
COPY packages/api-server/package.json packages/api-server/package.json
COPY packages/parser/package.json packages/parser/package.json
COPY packages/web/package.json packages/web/package.json
RUN yarn
RUN yarn workspace @nulp/web build 


FROM node:10.16.3-alpine
WORKDIR /app

COPY package.json package.json
COPY /packages/calendar/package.json /packages/calendar/package.json
COPY /packages/api-server/package.json /packages/api-server/package.json
COPY /packages/parser/package.json /packages/parser/package.json
# COPY /packages/web/package.json /packages/web/package.json

RUN yarn

COPY . .

EXPOSE 5000
ENTRYPOINT ["yarn", "workspace", "@nulp/api-server", "start"]