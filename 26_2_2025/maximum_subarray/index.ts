// Understanding the Problem
// Given an integer array nums, we need to find the contiguous subarray with the largest sum and return its sum.

// Key Constraints:
// 1 <= nums.length <= 100,000
// -10,000 <= nums[i] <= 10,000
// The array can contain negative numbers.
// We need an efficient solution due to the large constraints.
// Key Observations
// A contiguous subarray means elements must be consecutive in nums.
// The optimal solution must run in O(n) time for efficiency.
// Example Walkthrough
// Example 1
// Input:

// nums = [-2,1,-3,4,-1,2,1,-5,4]
// Subarrays and Their Sums:
// Subarray	Sum
// [-2]	          -2
// [1]	          1
// [4, -1, 2, 1]	6 (maximum sum)
// [5,4,-1,7,8]	23



// Approach 1: Kadane’s Algorithm (O(n) Solution)
// Idea
// Iterate through nums, keeping track of:
// Current sum (currentSum): The sum of the subarray ending at index i.
// Max sum (maxSum): The highest sum encountered so far.
// If currentSum < 0, restart at nums[i], since a negative sum decreases future values.
// Update maxSum whenever currentSum exceeds it.
// Algorithm
// Initialize:
// maxSum = nums[0]
// currentSum = nums[0]
// Iterate from i = 1 to n-1:
// Update currentSum = max(nums[i], currentSum + nums[i])
// Update maxSum = max(maxSum, currentSum)
// Implementation (Kadane's Algorithm)

// 🔹 Concept
// Keep track of two variables:

// currentSum: The maximum sum of the subarray ending at the current index.
// maxSum: The global maximum sum found so far.
// Decide at each step:

// Either extend the current subarray (currentSum + nums[i]).
// Or start a new subarray from nums[i] if currentSum becomes negative.
// Update maxSum whenever currentSum is greater.

function maxSubArray(nums: number[]): number {
    let maxSum = nums[0];
    let currentSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // Either extend the existing subarray or start new at nums[i]
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

// 🔹 Example Walkthrough
// Given Input:

// nums = [-2,1,-3,4,-1,2,1,-5,4]
// Step-by-Step Execution
// Index	nums[i]	currentSum (max(nums[i], currentSum + nums[i]))	maxSum
// 0	-2	-2	                                       -2
// 1	1	max(1, -2+1) = 1	                              1
// 2	-3	max(-3, 1-3) = -2	                              1
// 3	4	max(4, -2+4) = 4	                              4
// 4	-1	max(-1, 4-1) = 3	                              4
// 5	2	max(2, 3+2) = 5	                              5
// 6	1	max(1, 5+1) = 6	                              6
// 7	-5	max(-5, 6-5) = 1	                              6
// 8	4	max(4, 1+4) = 5	                              6
// Final Answer:
// ts
// Copy
// Edit
// maxSum = 6
// (The subarray [4,-1,2,1] has the max sum 6.)

// 🔹 Time & Space Complexity
// Complexity	Explanation
// Time Complexity: O(n)	We iterate through the array once.
// Space Complexity: O(1)	Only two variables (currentSum, maxSum) are used.
// 🔹 Why Kadane’s Algorithm Works
// Local vs. Global Decision: We determine at every step whether to continue or restart the subarray.
// Dynamic Adjustment: If the running sum ever drops below 0, we start fresh.
// Greedy Choice: We only consider positive subarrays because negative sums hurt the maximum.


// // Time & Space Complexity
// Approach	Time Complexity	Space Complexity
// Kadane’s Algorithm	O(n)	O(1)



// 🔹 Approach 2: Divide and Conquer (O(n log n) Solution)
// This method divides the problem into smaller subproblems, solves them recursively, and merges the results. The key idea is to split the array, compute the maximum subarray sum in each half, and then compute the maximum sum crossing the midpoint.

// 🔹 Concept
// Divide:

// Find the midpoint of the array.
// Recursively find the max subarray in the left and right halves.
// Conquer:

// Compute the max subarray sum that crosses the midpoint.
// This is needed because the optimal subarray might span both halves.
// Merge:

// The result is the maximum of three values:
// leftMax: Maximum subarray sum in the left half.
// rightMax: Maximum subarray sum in the right half.
// crossMax: Maximum subarray sum that crosses the midpoint.
// Base Case:

// If there's only one element, return it.
// 🔹 Code Implementation

function maxSubArrayDC(nums: number[]): number {
    return divideAndConquer(nums, 0, nums.length - 1);
}

function divideAndConquer(nums: number[], left: number, right: number): number {
    if (left === right) return nums[left]; // Base case (single element)

    const mid = Math.floor((left + right) / 2);
    
    const leftMax = divideAndConquer(nums, left, mid);  // Left half
    const rightMax = divideAndConquer(nums, mid + 1, right); // Right half
    const crossMax = maxCrossingSum(nums, left, mid, right); // Cross sum

    return Math.max(leftMax, rightMax, crossMax);
}

function maxCrossingSum(nums: number[], left: number, mid: number, right: number): number {
    let leftSum = -Infinity, rightSum = -Infinity, sum = 0;

    // Compute max sum in left half (including mid)
    for (let i = mid; i >= left; i--) {
        sum += nums[i];
        leftSum = Math.max(leftSum, sum);
    }

    sum = 0; // Reset sum

    // Compute max sum in right half (excluding mid)
    for (let i = mid + 1; i <= right; i++) {
        sum += nums[i];
        rightSum = Math.max(rightSum, sum);
    }

    return leftSum + rightSum;
}

// 🔹 Example Walkthrough
// Given Input:

// nums = [-2,1,-3,4,-1,2,1,-5,4]
// Step-by-Step Execution
// Step 1️⃣: Divide the array into halves


// Left Half: [-2,1,-3,4]
// Right Half: [-1,2,1,-5,4]
// Step 2️⃣: Recursively find max subarray sum for each half

// leftMax = 4 (from [4])
// rightMax = 4 (from [4])
// Step 3️⃣: Find the max crossing sum

// Left side from mid: [-3, 4] → max sum = 4
// Right side from mid: [-1, 2, 1] → max sum = 2
// Cross sum: 4 + 2 = 6
// Final Answer:

// maxSum = 6
// (The subarray [4, -1, 2, 1] has the max sum 6.)

// 🔹 Time & Space Complexity
// Complexity	Explanation
// Time Complexity: O(n log n)	Each recursive step splits the array in half, leading to a log(n) depth, and at each level, we compute O(n) work.
// Space Complexity: O(log n)	Due to the recursive stack calls (not storing extra data).
// 🔹 Kadane’s Algorithm vs. Divide & Conquer
// Approach	Time Complexity	Space Complexity	Best Use Case
// Kadane’s Algorithm	O(n)	O(1)	Best for all cases, linear time
// Divide and Conquer	O(n log n)	O(log n)	Useful when parallel processing or recursion-based optimization is needed
// ✅ Kadane’s Algorithm is faster, but Divide and Conquer is useful when working with parallel computing or recursion-heavy tasks.