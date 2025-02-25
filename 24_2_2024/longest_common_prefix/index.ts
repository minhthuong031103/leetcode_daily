// Longest Common Prefix
// Understanding the Problem Statement
// We are given an array of strings and need to determine the longest common prefix (LCP) that appears at the beginning of each string. If no common prefix exists, we return an empty string "".

// Key Takeaways from Constraints
// The input array will always have at least one string.
// A string in the array can be empty.
// The maximum number of strings and maximum length per string is 200, so our solution should be efficient.

// Test Case Expansion
// We need to handle different types of input cases:

// Test Case	                    Expected Output	          Reasoning
// ["flower", "flow", "flight"]	"fl"	                    "fl" is common in all words.
// ["dog", "racecar", "car"]	          ""	                    No common prefix exists.
// ["apple", "ape", "april"]	          "ap"	                    "ap" is the longest common prefix.
// ["abcd", "abc", "ab"]	          "ab"	                    Common prefix reduces as we check each string.
// ["single"]	                    "single"	                    A single string means the prefix is itself.
// ["", "b", "c"]	                    ""	                    The presence of an empty string makes the prefix empty.
// ["aaa", "aaa", "aaa"]	          "aaa"	                    All elements are identical.
// ["abcdefgh", "abcd", "abc", "ab"]	"ab"	                    The longest common prefix reduces gradually.

// Approach 1: Horizontal Scanning
// Idea
// Take the first word as the starting prefix.
// Compare it with every other string.
// If a mismatch occurs, shorten the prefix character by character.
// If the prefix becomes empty, return "".
// Implementation Without Built-in String Functions
// We'll avoid .substring(), .slice(), and .startsWith(), implementing everything manually.

function longestCommonPrefixHorizontal(strs: string[]): string {
  if (strs.length === 0) return "";

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    let j = 0;

    // Compare prefix with each string character by character
    while (
      j < prefix.length &&
      j < strs[i].length &&
      prefix[j] === strs[i][j]
    ) {
      j++;
    }

    // Manually trim the prefix by reassigning a new string
    let newPrefix = "";
    for (let k = 0; k < j; k++) {
      newPrefix += prefix[k];
    }
    prefix = newPrefix;

    if (prefix === "") return "";
  }
  return prefix;
}
// Given input:

// strs = ["flower", "flow", "flight"]
// Step 1️⃣: Start with the first word as the prefix:

// prefix = "flower"
// Step 2️⃣: Compare with the second word "flow"
// Character Index	                    flower	flow	Match?
//        0	                    f	f	✅
//        1	                    l	l	✅
//        2	                    o	o	✅
//        3	                    w	w	✅
//        4	                    e	-	❌
// Mismatch found at index 4, so we trim "flower" to "flow".

// prefix = "flow"
// Step 3️⃣: Compare with the third word "flight"
// Character Index	          flow	flight	Match?
//        0	          f	f	✅
//        1	          l	l	✅
//        2	          o	i	❌
// Mismatch found at index 2, so we trim "flow" to "fl".

// prefix = "fl"
// Final Answer: "fl"

// Time & Space Complexity Analysis
// Time Complexity:
// 𝑂(𝑁×𝑀)
// where:
// 𝑁 is the number of words.
// 𝑀 is the length of the longest word.
// Space Complexity: 𝑂(1)
// O(1), since we modify prefix in place.

// Approach 2: Vertical Scanning
// Idea
// Instead of comparing full words, scan column by column.
// Stop scanning when a mismatch is found.
// Implementation

function longestCommonPrefixVertical(strs: string[]): string {
  if (strs.length === 0) return "";

  for (let col = 0; col < strs[0].length; col++) {
    let char = strs[0][col];

    for (let row = 1; row < strs.length; row++) {
      if (col >= strs[row].length || strs[row][col] !== char) {
        // Build prefix manually
        let prefix = "";
        for (let k = 0; k < col; k++) {
          prefix += strs[0][k];
        }
        return prefix;
      }
    }
  }
  return strs[0];
}

// Given input:

// strs = ["flower", "flow", "flight"]
// Step 1️⃣: Start checking column by column
// Column (Index)	          flower	flow	flight	Matches?
// 0	                    f	f	f	✅
// 1	                    l	l	l	✅
// 2	                    o	o	i	❌
// Mismatch at column 2, so we stop and build the prefix manually:

// prefix = "fl"
// Final Answer: "fl"

// Time & Space Complexity Analysis
// Time Complexity:
// 𝑂(𝑁×𝑀)
// Space Complexity: 𝑂(1)

// Approach 3: Divide & Conquer
// Idea
// Recursively divide the array into two halves.
// Find LCP for each half.
// Merge results.
// Implementation

function longestCommonPrefixDC(strs: string[]): string {
  if (strs.length === 0) return "";
  return divideAndConquer(strs, 0, strs.length - 1);
}

function divideAndConquer(strs: string[], left: number, right: number): string {
  if (left === right) return strs[left];

  let mid = Math.floor((left + right) / 2);
  let leftPrefix = divideAndConquer(strs, left, mid);
  let rightPrefix = divideAndConquer(strs, mid + 1, right);

  return commonPrefix(leftPrefix, rightPrefix);
}

function commonPrefix(str1: string, str2: string): string {
  let minLen = Math.min(str1.length, str2.length);
  let result = "";

  for (let i = 0; i < minLen; i++) {
    if (str1[i] !== str2[i]) break;
    result += str1[i];
  }
  return result;
}

// Given input:

// strs = ["flower", "flow", "flight"]
// Step 1️⃣: Divide the array into two parts

// ["flower", "flow"]  and  ["flight"]
// Step 2️⃣: Recursively find LCP of each part
// Left side: ["flower", "flow"]

// LCP("flower", "flow") → "flow"
// Right side: ["flight"]

// Only one word, so LCP is "flight"
// Step 3️⃣: Merge results by computing the common prefix of "flow" and "flight"
// Character Index	          flow	flight	Match?
//        0	          f	f	✅
//        1	          l	l	✅
//        2	          o	i	❌
// Mismatch at index 2, so result = "fl".

// Final Answer: "fl"

// Time & Space Complexity Analysis
// Time Complexity:
// 𝑂(𝑁×𝑀)
// Space Complexity: 𝑂(log𝑁)
//  (recursive stack).
