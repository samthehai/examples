package main

import (
	"fmt"

	"github.com/samthehai/examples/gofuzz/util"
)

func main() {
	input := "The quick brown fox jumped over the lazy dog"
	rev, err := util.Reverse(input)
	if err != nil {
		panic(err)
	}
	doubleRev, err := util.Reverse(rev)
	if err != nil {
		panic(err)
	}
	fmt.Printf("original: %q\n", input)
	fmt.Printf("reversed: %q\n", rev)
	fmt.Printf("reversed again: %q\n", doubleRev)
}
