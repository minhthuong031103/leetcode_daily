// Understanding the Problem
// We are given a sorted array of distinct integers and a target value.

// If target exists in nums, return its index.
// If target does not exist, return the index where it should be inserted to maintain sorted order.
// Key Constraints
// 1 <= nums.length <= 10⁴
// nums contains distinct values, sorted in ascending order.
// Expected runtime: O(log n), which strongly suggests a Binary Search approach.

// Test Case Expansion
// Input	                    Output	          Explanation
// [1,3,5,6], 5	          2	          5 is found at index 2.
// [1,3,5,6], 2	          1	          2 is missing, but should be inserted at index 1.
// [1,3,5,6], 7	          4	          7 is greater than all elements, should be inserted at index 4 (end).
// [1,3,5,6], 0	          0	          0 is smaller than all elements, should be inserted at index 0.
// [1,3,5,7,9,11], 6	3	          6 is missing, should be inserted before 7.

// 🔹 Key Observations
// Since the array is sorted, Binary Search is the best approach to achieve O(log n) time complexity.
// Binary Search Idea:
// Start with two pointers: left = 0, right = nums.length - 1.
// Repeat until left > right:
// Compute mid = Math.floor((left + right) / 2).
// If nums[mid] == target, return mid (target found).
// If nums[mid] < target, search in the right half (left = mid + 1).
// If nums[mid] > target, search in the left half (right = mid - 1).
// When the search completes, return left as the correct insertion position.

function searchInsert(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    if (nums[mid] > target) right = mid - 1;
  }

  return left;
}

// Step-by-Step Execution
// Example 1: nums = [1,3,5,6], target = 2
// Step	          left	right	mid	nums[mid]	          Comparison	Next Step
// 1	          0	3	1	3	          3 > 2	Move right = mid - 1 = 0
// 2	          0	0	0	1	          1 < 2	Move left = mid + 1 = 1
// End	left = 1	Return left = 1
// Output:
// 1

// Example 2: nums = [1,3,5,6], target = 5
// Step	          left	right	mid	nums[mid]	          Comparison	Next Step
// 1	          0	3	1	3	          3 < 5	Move left = mid + 1 = 2
// 2	          2	3	2	5	          5 == 5	Return mid = 2
// Output:
// 2

// Example 3: nums = [1,3,5,6], target = 7
// Step	          left	right	mid	nums[mid]	          Comparison	Next Step
// 1	          0	3	1	3	          3 < 7	Move left = mid + 1 = 2
// 2	          2	3	2	5	          5 < 7	Move left = mid + 1 = 3
// 3	          3	3	3	6	          6 < 7	Move left = mid + 1 = 4
// End	left = 4	Return left = 4
// Output:
// 4

// Example 4: nums = [1,3,5,6], target = 0
// Step	left	right	mid	nums[mid]	Comparison	Next Step
// 1	0	3	1	3	3 > 0	Move right = mid - 1 = 0
// 2	0	0	0	1	1 > 0	Move right = mid - 1 = -1
// End	left = 0	Return left = 0
// Output:
// 0

// Alternative Approach: Linear Search (Brute Force)
// A linear search simply iterates through nums and finds the first position where nums[i] ≥ target.

// Implementation (Brute Force)

function searchInsertLinear(nums: number[], target: number): number {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= target) return i;
  }
  return nums.length; // Insert at end if target > all elements
}
