// Remove Duplicates from Sorted Array
// Understanding the Problem
// We are given a sorted array nums, and we need to remove duplicates in-place
//  so that each unique element appears only once.

// The first k elements of nums should contain the unique elements in the same order.
// The rest of the array can have any values (they are not considered).
// The function should return k, the count of unique elements.
// Key Constraints:
// 1 <= nums.length <= 30,000
// -100 <= nums[i] <= 100
// nums is sorted in non-decreasing order.
// Since nums is sorted, all duplicates appear consecutively,
// which allows us to efficiently remove duplicates using a two-pointer approach.

// Test Case Expansion
// Input	                    Expected Output (k, Modified Array)	Explanation
// [1,1,2]	          2, [1,2,_]	                    Remove duplicates, keep 1,2.
// [0,0,1,1,1,2,2,3,3,4]	5, [0,1,2,3,4,_,_,_,_,_]	          Remove duplicates, keep 0,1,2,3,4.
// [1,2,3,4,5]	          5, [1,2,3,4,5]	                    Already unique, k = 5.
// [1,1,1,1,1]	          1, [1,_]	                              Only 1 remains.
// [-1,-1,0,0,1,2,2]	4, [-1,0,1,2,_,_,_]	                    Handle negatives.

// Choosing the Best Approach
// Since the array is sorted, we can use two pointers:

// Fast Pointer (i): Iterates through nums, looking for unique elements.
// Slow Pointer (j): Tracks the position where the next unique element should be placed.
// Algorithm (Two Pointers)
// Initialize j = 0 (the position where we place unique values).
// Iterate through nums using i:
// If nums[i] !== nums[j], move j forward and place nums[i] there.
// Return j + 1 (the number of unique elements).
// TypeScript Implementation
// Two-Pointer Approach

function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;

  let j = 0; // Slow pointer

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[j]) {
      j++; // Move slow pointer forward
      nums[j] = nums[i]; // Place the next unique element
    }
  }

  return j + 1; // Number of unique elements
}

// Example: nums = [0,0,1,1,1,2,2,3,3,4]
// i (Fast Pointer)	j (Slow Pointer)	nums[j]	Action
// 1	          0	          0	nums[1] === nums[0], skip.
// 2	          0 → 1	          1	nums[2] !== nums[1], store 1 at nums[1].
// 3	          1	          1	nums[3] === nums[1], skip.
// 4	          1	          1	nums[4] === nums[1], skip.
// 5	          1 → 2	          2	nums[5] !== nums[1], store 2 at nums[2].
// 6	          2	          2	nums[6] === nums[2], skip.
// 7	          2 → 3	          3	nums[7] !== nums[2], store 3 at nums[3].
// 8	          3	          3	nums[8] === nums[3], skip.
// 9	          3 → 4	          4	nums[9] !== nums[3], store 4 at nums[4].
// Final k = 5	nums = [0,1,2,3,4,_,_,_,_,_]
// Time & Space Complexity
// Approach	Time Complexity	Space Complexity
// Two Pointers

// Time Complexity:

// O(N) since we traverse the array once.
// Space Complexity:

// O(1) since we modify nums in place.
