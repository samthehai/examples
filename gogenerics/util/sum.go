package util

type Number interface {
	int8 | int16 | int | int32 | int64 |
		float32 | float64
}

// SumIntsOrFloats sums the values of map m. It supports both int64 and float64
// as types for map values.
func SumNumber[K comparable, V Number](m map[K]V) V {
	var s V
	for _, v := range m {
		s += v
	}
	return s
}
