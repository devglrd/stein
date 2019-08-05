#!/usr/bin/env bash

ARG="$1"
source ./.env
URL=$APP_URL:$APP_PORT/api/$ARG?token=$DB_TOKEN
curl $URL

