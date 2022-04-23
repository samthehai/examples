test:
	go test -v -cover ./...

fuzz:
	go test -fuzz=Fuzz -fuzztime 30s ./util

.PHONY: test fuzz
