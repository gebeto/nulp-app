FROM node:10.16.3-alpine

MAINTAINER slavik.nychkalo@gmail.com

WORKDIR /app

ADD . .

RUN yarn

EXPOSE 5000

ENTRYPOINT ["yarn", "workspace", "@nulp/api-server", "start"]