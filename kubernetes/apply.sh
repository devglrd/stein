echo "Apply all"
kubectl apply -f 10-redis/sentinel.yaml -n stein && kubectl apply -f 10-redis/sentinel-service.yaml -n stein
kubectl apply -f 10-redis/server.yaml -n stein && kubectl apply -f 10-redis/server-service.yaml -n stein
kubectl apply -f 11-mysql/ -n stein
kubectl apply -f 20-api/deployement.yaml -n stein && kubectl apply -f 20-api/service.yaml -n stein
kubectl apply -f 30-queue/ -n stein
kubectl apply -f 40-frontend/ -n stein
kubectl get pods -n stein
kubectl get service -n stein
