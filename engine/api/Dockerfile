FROM node:11

RUN mkdir /stein-api

WORKDIR /stein-api

COPY ./ /stein-api

RUN npm i && npm i -g pm2 && cp .env.docker .env && npm run build

CMD ["pm2-runtime", "start", "ecosystem.config.js"]

EXPOSE 3000
