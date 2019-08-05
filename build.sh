#!/bin/bash

TAG="$1"

API_IMAGE="stein/stein-api:1.0.$TAG"
API_REGISTERY="xuxk2ofg.gra5.container-registry.ovh.net/$API_IMAGE"
UI_IMAGE="stein/stein-ui:1.0.$TAG"
UI_REGISTERY="xuxk2ofg.gra5.container-registry.ovh.net/$UI_IMAGE"

echo "Build Docker image";

cd ./engine/api/ && docker build -t "$API_IMAGE" .
cd ./../../
cd ./ui/ && docker build -t "$UI_IMAGE" .

docker tag "$API_IMAGE" "$API_REGISTERY"
docker tag "$UI_IMAGE" "$UI_REGISTERY"

docker push "$API_REGISTERY"
docker push "$UI_REGISTERY"

Echo "image build  and  push with tag 1.0.$TAG";
