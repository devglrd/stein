#!/bin/bash

ENV="$1"

Echo "Mount Api..."

Echo "First mount mysql"
docker-compose -f ./engine/api/docker-compose.yml up -d stein-mysql

case "$ENV" in
    "serve") docker-compose  -f ./engine/api/docker-compose.yml up -d stein-api-serve;;
    "prod") docker-compose  -f ./engine/api/docker-compose.yml  up --build -d stein-api;;
esac

Echo "Api Mount";

Echo "Mount ui...";

case "$ENV" in
    "serve") docker-compose -f ./ui/docker-compose.yml up -d stein-ui-serve;;
    "prod") docker-compose -f ./ui/docker-compose.yml up -d --build stein-ui;;
esac
Echo "Ui Mount";

Echo "All Mount";
