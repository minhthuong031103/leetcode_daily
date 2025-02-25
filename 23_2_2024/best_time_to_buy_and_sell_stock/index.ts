// Step 1: Understanding the Problem
// You have a list of stock prices.
// You must buy before selling.
// The goal is to find the maximum possible profit.
// If no profit is possible (prices always decrease), return 0.

// Step 2: Brute Force Approach (O(n²))
// 🔴 Idea: Try every possible buy and sell combination.

const maxProfit = (prices: number[]): number => {
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      let profit = prices[j] - prices[i];
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
};
// Too slow (O(n²)) for large inputs

// Step 3: Optimized Approach (O(n)) – Track Min Price
// 🔵 Idea:

// Track the minimum price seen so far (minPrice).
// Track the maximum profit at each step.

const maxProfitOptimized = (prices: number[]): number => {
  let minPrice = Infinity; // Store the lowest price seen so far
  let maxProfit = 0; // Store the max profit

  for (let price of prices) {
    minPrice = Math.min(minPrice, price); // Update min price
    maxProfit = Math.max(maxProfit, price - minPrice); // Update max profit
  }

  return maxProfit;
};
// ✅ Efficient (O(n))

// Step 4: Walkthrough Example
// Let's simulate prices = [7,1,5,3,6,4] step by step.

// Day	Price	minPrice	Profit (price - minPrice)	          maxProfit
// 1	7	7	          0	                    0
// 2	1	1	          0	                    0
// 3	5	1	          4	                    4
// 4	3	1	          2	                    4
// 5	6	1	          5	                    5
// 6	4	1	          3	                    5
// Final max profit = 5 (buy at 1, sell at 6).
// Step 5: Edge Cases
// Only one price: [5] → 0
// Always decreasing: [7,6,4,3,1] → 0
