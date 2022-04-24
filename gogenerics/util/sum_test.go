package util

import (
	"testing"
)

func TestNumberInt64(t *testing.T) {
	var testcases = []struct {
		in   map[string]int64
		want int64
	}{
		{
			map[string]int64{
				"first":  1,
				"second": 1,
			},
			2,
		},
		{
			map[string]int64{
				"first":  -1,
				"second": -1,
			},
			-2,
		},
		{
			map[string]int64{
				"first":  -1,
				"second": 1,
			},
			0,
		},
	}

	for _, tc := range testcases {
		sum := SumNumber(tc.in)
		if sum != tc.want {
			t.Errorf("SumInts: %v, want %v", sum, tc.want)
		}
	}
}

func TestSumNumberFloat64(t *testing.T) {
	var testcases = []struct {
		in   map[string]float64
		want float64
	}{
		{
			map[string]float64{
				"first":  -1.0,
				"second": 1.0,
			},
			0.0,
		},
	}

	for _, tc := range testcases {
		sum := SumNumber(tc.in)
		if sum != tc.want {
			t.Errorf("SumFloats: %v, want %v", sum, tc.want)
		}
	}
}
