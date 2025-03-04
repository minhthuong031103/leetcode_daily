// Understanding the Problem
// We are given a binary tree and need to determine whether it is height-balanced.

// Definition: Height-Balanced Binary Tree
// A binary tree is height-balanced if:

// The left and right subtrees of every node differ in height by at most 1.
// Example Walkthrough
// Example 1

//         3
//        / \
//       9  20
//         /  \
//        15   7
// The left subtree (9) has height 1.
// The right subtree (20 → 15,7) has height 2.
// Since height difference ≤ 1, tree is balanced.
// Output: true

// Example 2

//         1
//        / \
//       2   2
//      / \
//     3   3
//    / \
//   4   4
// Left subtree has height 4 (due to 4 → 3 → 2 → 1).
// Right subtree has height 2.
// Since |4 - 2| > 1, tree is not balanced.
// Output: false

// Example 3

// []
// An empty tree is balanced.
// Output: true

//   Approach: Depth-First Search (DFS) for Checking Balanced Binary Tree

//  Concept & Algorithm
// Key Observations
// Tree Height:
// The height of a node is the maximum depth of its subtrees + 1.
// Balanced Condition:
// If any node has a height difference greater than 1 between its left and right subtrees, the tree is not balanced.
// Optimization using DFS:
// Instead of computing height separately for each node, we use DFS (postorder traversal).
// If we ever find an imbalanced subtree, we return -1 immediately, avoiding redundant height calculations.

// Algorithm Breakdown
// Base Case:

// If node === null, return height 0 (empty trees are balanced).
// Recursive Case:

// Compute the height of the left subtree.
// If it returns -1, it means the left subtree is already imbalanced, so return -1 immediately.
// Compute the height of the right subtree.
// If it returns -1, the right subtree is already imbalanced, so return -1.
// Check the height difference between the left and right subtree.
// If |leftHeight - rightHeight| > 1, return -1 (tree is unbalanced).
// Otherwise, return Math.max(leftHeight, rightHeight) + 1.
// Final Check:

// If checkHeight(root) !== -1, return true (balanced), otherwise false (unbalanced).

// Typescript implementation

// Example Walkthrough
// Example 1: Balanced Tree
// Input:

//         3
//        / \
//       9  20
//         /  \
//        15   7
// Step-by-Step Execution
// Compute left subtree height:
// 9 has no children → height 1
// Compute right subtree height:
// 20 → (15, 7) → max height 2
// Height difference: |1 - 2| = 1 (Balanced ✅)
// Return true.

// Example 2: Unbalanced Tree
// Input:

//         1
//        / \
//       2   2
//      / \
//     3   3
//    / \
//   4   4
// Step-by-Step Execution
// Compute left subtree height:
// 4 → 3 → 2 → 1 → height 4
// Compute right subtree height:
// 2 → height 2
// Height difference: |4 - 2| = 2 (>1, Unbalanced ❌)
// Return false.

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

function isBalanced(root: TreeNode | null): boolean {
  function checkHeight(node: TreeNode | null): number {
    if (!node) return 0; //Base case: empty tree has height 0

    //Recursively compute the left and right subtree heights
    let leftHeight = checkHeight(node.left);
    if (leftHeight === -1) return -1; //Left subtree is imbalanced

    let rightHeight = checkHeight(node.right);
    if (rightHeight === -1) return -1; // Right subtree is imbalanced

    //If height difference >1 return -1 (imbalanced)

    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    //Return the actual height

    return Math.max(leftHeight, rightHeight) + 1;
  }

  return checkHeight(root) !== -1;
}

// Time & Space Complexity
// Approach	Time Complexity	Space Complexity
// Optimized DFS	O(n)	O(h) = O(log n) (balanced) to O(n) (unbalanced)
// Time Complexity: O(n), since each node is visited once.
// Space Complexity: O(h), where h is the tree height:
// O(log n) for balanced trees.
// O(n) for skewed trees (linked-list-like).

// Alternative Approach: Naive Recursive (O(n²))
// Idea
// Compute height separately for left and right subtrees for every node.
// Implementation
// This approach checks if a tree is balanced by repeatedly computing the height of each subtree for every node.

// Height Calculation:

// The height of a node is the maximum depth of its left and right subtrees + 1.
// We use a helper function height(node) to compute this.
// Balance Check:

// A tree is balanced if for every node:
// |leftHeight - rightHeight| ≤ 1
// The left and right subtrees are also balanced.
// Recursive Nature:

// We recursively check the left and right subtrees.
// Each node makes two recursive calls (height(left) and height(right)), making this inefficient for large trees.

function isBalancedNaive(root: TreeNode | null): boolean {
  if (!root) return true;

  function height(node: TreeNode | null): number {
    if (!node) return 0;
    return Math.max(height(node.left), height(node.right)) + 1;
  }

  let leftHeight = height(root.left);
  let rightHeight = height(root.right);

  return (
    Math.abs(leftHeight - rightHeight) <= 1 &&
    isBalancedNaive(root.left) &&
    isBalancedNaive(root.right)
  );
}
