# /usr/bin/sh
GOOS=linux GOARCH=amd64 go build main.go
# To over come the problem disable oom kill for docker
docker run --rm -m 6M --memory-swap=6M --oom-kill-disable -v $PWD:/app alpine:latest time /app/main
