echo "Apply all"
kubectl apply -f 10-redis/ -n stein
kubectl apply -f 11-mysql/ -n stein
kubectl apply -f 20-api/ -n stein
kubectl apply -f 30-queue/ -n stein
kubectl apply -f 40-frontend/ -n stein
kubectl get pods -n stein
kubectl get service -n stein
