FROM nginx

RUN mkdir /var/stein-ui

RUN mkdir /var/logs

WORKDIR /var/stein-ui

COPY ./dist/stein /var/stein-ui

COPY ./nginx-conf/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
