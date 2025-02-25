const search = (nums: number[], target: number): number => {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (nums[mid] === target) {
      return mid; // Target found
    } else if (nums[mid] > target) {
      high = mid - 1; // Search left half
    } else {
      low = mid + 1; // Search right half
    }
  }

  return -1; // Target not found
};
