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
