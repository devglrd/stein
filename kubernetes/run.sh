$CMD = "$1"
docker build -t glrd/kubectl-custom:latest .

case "$CMD" in
    "bash") docker-compose run kubectl bash;;
esac

docker-compose run kubectl $CMD;


