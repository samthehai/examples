package main

import (
	"fmt"

	"github.com/samthehai/examples/gogenerics/util"
)

func main() {
	// Initialize a map for the integer values
	ints := map[string]int64{
		"first":  34,
		"second": 12,
	}

	// Initialize a map for the float values
	floats := map[string]float64{
		"first":  35.98,
		"second": 26.99,
	}

	fmt.Printf("Generic Sums: %v and %v\n",
		util.SumNumber(ints),
		util.SumNumber(floats))
}
