// Understanding the Problem
// We are given two strings:

// haystack → the main string
// needle → the substring we need to search for
// We need to return the index of the first occurrence of needle in haystack, or -1 if needle is not found.

// Constraints
// 1 <= haystack.length, needle.length <= 10⁴
// Both haystack and needle contain only lowercase English letters.

// 🔹 Key Observations
// This is a substring search problem.
// Brute Force has a time complexity of O(n * m), where:
// n = haystack.length
// m = needle.length
// More efficient algorithms include:
// Knuth-Morris-Pratt (KMP) Algorithm → O(n + m)
// Rabin-Karp Algorithm → O(n) (on average)

// Example Walkthrough
// Example 1
// Input
// haystack = "sadbutsad"
// needle = "sad"

// Occurrences in haystack
// Index	Substring Comparison
// 0 → ✅	"sad" matches at index 0
// 6 → ✅	"sad" appears again at index 6, but we return the first occurrence.
// ✅ Output: 0

// Example 2
// Input
// plaintext
// haystack = "leetcode"
// needle = "leeto"
// Occurrences in haystack
// "leeto" does not appear in "leetcode".
// ❌ Output: -1

//  Approach 1: Brute Force (O(n * m))
// Algorithm
// Iterate through haystack from index 0 to n - m.
// Check if haystack[i:i+m] matches needle.
// If a match is found, return i.
// If no match is found, return -1.

function strStr(haystack: string, needle: string): number {
  //   return haystack.indexOf(needle);
  let n = haystack.length;
  let m = needle.length;

  for (let i = 0; i <= n - m; i++) {
    let j = 0;
    while (j < m && haystack[i + j] === needle[j]) {
      j++;
    }
    if (j === m) return i; //found the needle
  }
  return -1;
}

// Step-by-Step Execution

// Example: haystack = "sadbutsad", needle = "sad"

// Step	i (Start Index)	haystack[i:i+3]	Comparison	Result
// 0	0	          "sad"	          ✅ Match	          Return 0

// ✅ Output: 0

// Example: haystack = "hello", needle = "ll"
// Step	i (Start Index)	haystack[i:i+2]	          Comparison	Result
// 0	0	          "he"	                    ❌ No Match	Continue
// 1	1	          "el"	                    ❌ No Match	Continue
// 2	2	          "ll"	                    ✅ Match	Return 2
// ✅ Output: 2

// 🔹 Time & Space Complexity
// Approach	Time Complexity	Space Complexity
// Brute Force	O(n * m)	          O(1)
// Worst-case scenario: when needle is not present, every character in haystack is checked → O(n * m).
// Space Complexity: O(1) since we use only a few variables.

// Approach 2: Knuth-Morris-Pratt (KMP) Algorithm (O(n + m))

// The KMP algorithm is an optimized string search algorithm that avoids redundant comparisons. It efficiently jumps over sections of the needle that have already been matched.

// 🔹 Why Use KMP?
// Avoids unnecessary comparisons by leveraging a preprocessed prefix table (LPS array).
// Efficient for large texts where needle may appear multiple times.
// Best-case performance: O(n + m) (where n is the length of haystack, and m is the length of needle).

// 🔹 Key Concept: Longest Prefix Suffix (LPS) Table
// The LPS array is a helper table that stores the longest proper prefix that is also a suffix for needle[0..i].
// If a mismatch occurs, KMP uses the LPS table to avoid unnecessary rechecking.
// Example of LPS Table
// For needle = "abacab":

// Index i	Needle Prefix (needle[0..i])	LPS Value (lps[i])
// 0	"a"	0
// 1	"ab"	0
// 2	"aba"	1
// 3	"abac"	0
// 4	"abaca"	1
// 5	"abacab"	2
// The LPS array = [0, 0, 1, 0, 1, 2].

// This means:

// If a mismatch occurs at index i, jump to LPS[i-1] instead of restarting the search.

// KMP Algorithm
// 1. Compute the LPS Table
// Iterate over needle, storing LPS values for each index.
// If a mismatch occurs, use the previous LPS value to determine where to jump.

// 2. Use LPS for Efficient Search
// Traverse haystack while checking for needle.
// If a match occurs, increment both indices.
// If a mismatch occurs:
// Use LPS to determine the new starting index.
// If LPS[j-1] == 0, move to the next character in haystack.
