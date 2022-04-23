package main

import (
	"fmt"

	"github.com/samthehai/examples/gofuzz/util"
)

func main() {
	input := "The quick brown fox jumped over the lazy dog"
	rev := util.Reverse(input)
	doubleRev := util.Reverse(rev)
	fmt.Printf("original: %q\n", input)
	fmt.Printf("reversed: %q\n", rev)
	fmt.Printf("reversed again: %q\n", doubleRev)
}
