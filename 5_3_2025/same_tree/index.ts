// Understanding the Problem
// We are given the roots of two binary trees p and q, and we need to determine if they are identical.

// Definition: Identical Trees
// Two binary trees are considered the same if:

// Structure is identical → Both trees have the same shape.
// Values are identical → Corresponding nodes in both trees have the same values.
// Example Walkthrough
// Example 1

// Tree p:      Tree q:
//     1            1
//    / \          / \
//   2   3        2   3
// Both trees have the same structure.
// All corresponding nodes have the same values.
// ✅ Output: true

// Tree p:      Tree q:
//     1            1
//    /              \
//   2                2
// Structure is different (p has left child 2, q has right child 2).
// Values match but structure does not.
// ❌ Output: false

// Tree p:      Tree q:
//     1            1
//    / \          / \
//   2   1        1   2
// Structure is identical, but values at positions (p.left, q.left) and (p.right, q.right) do not match.
// ❌ Output: false

// 🔹 Key Observations

// Compare Nodes One-by-One (Top-Down Approach):
// If both nodes are null, they are identical at this level.
// If one node is null and the other is not, they are different.
// If the node values do not match, they are different.

// Recursive Check for Subtrees:
// Recursively check the left and right subtrees.
// If both subtrees are identical, the whole tree is identical.

// 🔹 Algorithm
// Base Case:
// If both p and q are null, return true (empty trees are identical).
// If one of them is null while the other is not, return false.
// If values of p and q are different, return false.
// Recursive Step:
// Recursively compare p.left with q.left.
// Recursively compare p.right with q.right.
// If both recursive calls return true, the trees are identical.

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// 🔹 Example Walkthrough
// Example 1: Identical Trees
// Input:

// Tree p:          Tree q:
//     1                1
//    / \              / \
//   2   3            2   3

// Step-by-Step Execution:

// Compare p = 1 and q = 1 → ✅ Equal
// Compare p.left = 2 and q.left = 2 → ✅ Equal
// Compare p.right = 3 and q.right = 3 → ✅ Equal
// Both subtrees are identical → ✅ Return true
// Output:
// true

// Example 2: Different Trees (Structure Mismatch)
// Input:
// Tree p:          Tree q:
//     1                1
//    /                  \
//   2                    2
// Step-by-Step Execution:
// Compare p = 1 and q = 1 → ✅ Equal
// Compare p.left = 2 and q.left = null → ❌ Different
// Return false immediately

// Example 3: Different Trees (Values Mismatch)
// Tree p:          Tree q:
//     1                1
//    / \              / \
//   2   1            1   2
// Step-by-Step Execution:
// Compare p = 1 and q = 1 → ✅ Equal
// Compare p.left = 2 and q.left = 1 → ❌ Different
// Return false immediately
// Output:
// false
// 🔹 Time & Space Complexity
// Approach	Time Complexity	Space Complexity
// Recursive DFS	O(n)	          (log n to n)
// Time Complexity: O(n)
// Each node is visited once, so in the worst case, all n nodes are checked.

// Space Complexity: O(h)
// The recursion stack uses space proportional to the height of the tree (h):

// Balanced Tree: O(log n)
// Skewed Tree: O(n)

// Alternative Approach: Iterative BFS (Using a Queue)
// Instead of using recursion, use an explicit queue (FIFO) to traverse both trees level-by-level.
// If at any point nodes do not match (either structure or values), return false.
// Algorithm Breakdown

// Initialize a queue with the root nodes of both trees (p and q).
// While the queue is not empty:
// Dequeue two nodes from the queue.
// If both are null, continue (identical at this level).
// If one is null while the other is not, return false.
// If their values differ, return false.
// Add their left and right children to the queue in a pairwise fashion (p.left, q.left and p.right, q.right).
// If all levels match, return true.

// TypeScript Implementation

function isSameTreeIterative(p: TreeNode | null, q: TreeNode | null): boolean {
  const queue: (TreeNode | null)[] = [p, q];

  while (queue.length > 0) {
    let node1 = queue.shift();
    let node2 = queue.shift();
    if (!node1 && !node2) continue;
    if (!node1 || !node2) return false;
    if (node1.val !== node2.val) return false;

    queue.push(node1.left, node2.left);
    queue.push(node1.right, node2.right);
  }

  return true;
}

//  Example Walkthrough
// Example 1: Identical Trees

// Tree p:          Tree q:
//     1                1
//    / \              / \
//   2   3            2   3
// Step-by-Step Execution:
// Step	Queue State (p, q pairs)	                              Action
// 1	[ (1,1) ]	                                                  Compare 1 == 1 ✅
// 2	[ (2,2), (3,3) ]	                                        Compare 2 == 2 ✅, Compare 3 == 3 ✅
// 3	[ (null,null), (null,null), (null,null), (null,null) ]	All are null, continue ✅
// 4	[] (Queue is empty)	✅ Return true

// Output:
// true

// Example 2: Different Structure
// Input:
// Tree p:          Tree q:
//     1                1
//    /                  \
//   2                    2
// Step-by-Step Execution:
// Step	Queue State (p, q pairs)	Action
// 1	[ (1,1) ]	                    Compare 1 == 1 ✅
// 2	[ (2,null), (null,2) ]	One node is null, return false ❌
// Output:
// false

// Example 3: Different Values
// Input:

// Tree p:          Tree q:
//     1                1
//    / \              / \
//   2   1            1   2
// Step-by-Step Execution:
// Step	Queue State (p, q pairs)	Action
// 1	[ (1,1) ]	                    Compare 1 == 1 ✅
// 2	[ (2,1), (1,2) ]	          Values differ! ❌ Return false
// Output:
// false

// 🔹 Comparison of Approaches
// Approach	                    Time Complexity	          Space Complexity	          Best For
// Recursive DFS	                    O(n)	                    O(h) (log n to n)	          Simplicity, recursion-based problems
// Iterative BFS (Queue-Based)	O(n)	O                   (n)	                    Handling large/deep trees without recursion limits

// When to Use Which?
// ✅ Use Recursive DFS when:
// The recursion depth is manageable (h ≤ log n).
// You want a clean and elegant recursive solution.
// ✅ Use Iterative BFS (Queue-Based) when:

// The tree is very deep and recursion might cause a stack overflow.
// You need a level-by-level traversal approach.
