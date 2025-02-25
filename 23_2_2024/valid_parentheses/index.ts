//Solution 1: Stack-Based Approach (Most Efficient)
function isValid(s: string): boolean {
  // Stack to keep track of opening brackets
  const stack: string[] = [];

  // Map of closing to opening brackets
  const bracketMap: Record<string, string> = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  // Loop through each character in the string
  for (let char of s) {
    if (char in bracketMap) {
      // Pop the last opening bracket from the stack
      const topElement = stack.pop() || "#"; // If stack is empty, use a dummy value
      if (topElement !== bracketMap[char]) {
        return false; // Mismatched closing bracket
      }
    } else {
      // If it's an opening bracket, push to stack
      stack.push(char);
    }
  }

  // If stack is empty, all brackets were matched correctly
  return stack.length === 0;
}
// ✅ Time Complexity: O(n) (Each character is pushed/popped once)
// ✅ Space Complexity: O(n) (Stack stores at most n/2 elements)

//Solution 2: Using an Array Instead of Stack
function isValid1(s: string): boolean {
  const stack: string[] = [];
  const open = "({[";
  const close = ")}]";

  for (const char of s) {
    const closeIndex = close.indexOf(char);
    if (closeIndex !== -1) {
      // If it's a closing bracket, check the last element in stack
      if (stack.pop() !== open[closeIndex]) return false;
    } else {
      // Otherwise, push to stack
      stack.push(char);
    }
  }

  return stack.length === 0;
}
// (O(n)).
