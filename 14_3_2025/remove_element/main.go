// Two-Pointer Approach

// The two-pointer technique is an efficient way to solve problems involving array modifications in place.
// This method is useful when we need to filter out certain elements while mataining the order of the remaining ones

// How It Works
// Use two pointers:
// i: Iterates over the entire array.
// j: Keeps track of the position where the next valid element should be placed.
// If nums[i] is not equal to val, copy nums[i] to nums[j] and move j forward.
// Continue this until the entire array is processed.
// The final value of j represents the number of valid elements remaining.

package main

import "fmt"

func removeElement(nums []int, val int) int {
	j := 0 //Pointer for new valid array position
	for i := 0; i < len(nums); i++ {
		if nums[i] != val {
			nums[j] = nums[i] //Copy the valid element to the new position
			j++               //Move the valid position pointer forward
		}

	}

	return j //Number of valid elements

}

func main() {
	//Test cases

	nums1 := []int{3, 2, 2, 3}
	k1 := removeElement(nums1, 3)
	fmt.Println(k1, nums1[:k1]) //Output: 2 [2 2]
}
