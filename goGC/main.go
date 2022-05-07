package main

import (
	"flag"
	"log"
	"runtime"
)

func main() {
	manualGC := flag.Bool("manual_gc", false, "Set true to enable manual call for each loop")
	flag.Parse()

	sum := 0
	for i := 0; i < 10000; i++ {
		for range make([]int, 100000) {
			sum += 1
		}

		// Manual call GC
		if manualGC != nil && *manualGC {
			runtime.GC()
		}
	}

	log.Printf("Total %d int block memories have been allocated", sum)
}
