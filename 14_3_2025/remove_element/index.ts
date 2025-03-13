// We are given an integer array nums and an integer val.
// The goal is to remove all occurrences of val in nums in-place
// and return k, the number of elements that are not equal to val.

// 🔹 Approach 1: Two-Pointer Method (O(n))
// The Two-Pointer approach efficiently removes occurrences of val from nums in-place while maintaining a minimal number of operations.
//  How It Works
// Two Pointers:
// i → Iterates over nums (Current Index).
// j → Tracks the next position for elements not equal to val.

function removeElement(nums: number[], val: number): number {
  let j = 0; //Pointer for new valud array position

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[j] = nums[i];
      j++;
    }
  }

  return j;
}

// Step-by-Step Execution
// Example: nums = [0,1,2,2,3,0,4,2], val = 2
// Step	i (Current Index)	          nums[i]	j (Valid Position)	Action	Modified nums
// 1	          0	          0	0 → 1	          Keep	[0,1,2,2,3,0,4,2]
// 2	          1	          1	1 → 2	          Keep	[0,1,2,2,3,0,4,2]
// 3	          2	          2	2	          Skip	[0,1,2,2,3,0,4,2]
// 4	          3	          2	2	          Skip	[0,1,2,2,3,0,4,2]
// 5	          4	          3	2 → 3	          Keep	[0,1,3,2,3,0,4,2]
// 6	          5	          0	3 → 4	          Keep	[0,1,3,0,3,0,4,2]
// 7	          6	          4	4 → 5	          Keep	[0,1,3,0,4,0,4,2]
// 8	          7	          2	5	          Skip	[0,1,3,0,4,0,4,2]
// ✅ Final k = 5
// ✅ Modified nums = [0,1,3,0,4,_,_,_] (only the first k elements matter)
