OUTPUT="$(tail -1 ./autocd.txt)"
echo "$OUTPUT"
((OUTPUT=OUTPUT+1))
echo "$OUTPUT"

echo $OUTPUT | cat >> ./autocd.txt

./build.sh $OUTPUT

sed "s/REPLACE_NUMBER/$OUTPUT/g" ./kubernetes/20-api/deployement-temp.yaml > ./kubernetes/20-api/deployement.yaml

cd ./kubernetes/ && docker-compose run kubectl kubectl apply -f /clusterconfig/20-api/deployement.yaml -n stein &&  docker-compose run kubectl watch -n 1 kubectl get pods -n stein


