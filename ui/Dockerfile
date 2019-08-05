FROM node:11 AS builder

WORKDIR /stein-ui

COPY ./ .

RUN npm i && npm install -g @angular/cli && ng build --prod

FROM nginx

RUN mkdir /var/stein-ui && mkdir /var/logs

WORKDIR /var/stein-ui

COPY --from=builder /stein-ui/dist/stein .

COPY ./nginx-conf/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
