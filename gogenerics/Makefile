test:
	go test -v -cover ./...

fuzz:
	go test -v -cover -fuzz=Fuzz -fuzztime 30s ./util

.PHONY: test fuzz
