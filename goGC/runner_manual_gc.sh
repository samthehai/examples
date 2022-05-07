# /usr/bin/sh
GOOS=linux GOARCH=amd64 go build main.go

# Because of this reason below, there is not always good to keep the current default GC configuration:
# Ref: https://pkg.go.dev/runtime#hdr-Environment_Variables
# > The GOGC variable sets the initial garbage collection target percentage.
# > A collection is triggered when the ratio of freshly allocated data to
# > live data remaining after the previous collection reaches this percentage.
# > The default is GOGC=100. Setting GOGC=off disables the garbage collector entirely.
#
# To demonstrate:
# Run docker with memory limit 6M and disable memory swap by setting its value equal to
# memory limit value as below:
#
# docker run --rm -m 6M --memory-swap=6M -v $PWD:/app alpine:latest time /app/main
#
# The program was terminated by signal 9 (is killed by docker because excess memory)
# https://docs.docker.com/config/containers/resource_constraints/#memory
# Command terminated by signal 9
# real    0m 0.28s
# user    0m 0.00s
# sys     0m 0.20s
#
# To over come the problem manually call runtime.GC() for each iteration
docker run --rm -m 6M --memory-swap=6M -v $PWD:/app alpine:latest time /app/main -manual_gc=true
