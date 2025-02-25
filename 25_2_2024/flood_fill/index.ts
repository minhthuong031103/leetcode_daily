// Flood Fill Algorithm
// Understanding the Problem
// We are given a grid-based image (a 2D array) where each element represents a pixel with a color.
// Our task is to change the color of the given pixel and spread the change to all adjacent pixels (left, right, up, and down) that share the same original color.

// Rules of the Flood Fill Algorithm
// Start at (sr, sc), the given pixel in the image.
// Change its color to the new target color.
// Recursively (or iteratively) check the adjacent pixels:
// If an adjacent pixel has the same color as the starting pixel, change it to the new color.
// Continue the process until no adjacent pixels of the original color remain.
// Edge Cases:
// If the starting pixel's color is already the new color, return the image as is (no changes).
// If there are no adjacent pixels of the same color, only the starting pixel changes.
// Example Walkthrough
// Example 1
// Input:
// plaintext
// Copy
// Edit
// image = [
//     [1,1,1],
//     [1,1,0],
//     [1,0,1]
// ]
// sr = 1, sc = 1, color = 2
// Step-by-Step Execution
// Starting Pixel: (1,1), color = 1
// Change (1,1) to 2:

// [1,1,1]
// [1,2,0]
// [1,0,1]
// Spread to adjacent pixels ((0,1), (2,1), (1,0), (1,2)):
// (0,1) = 1 → Change to 2
// (1,0) = 1 → Change to 2
// (1,2) = 0 → Stop (different color)
// (2,1) = 0 → Stop (different color)

// [1,2,1]
// [2,2,0]
// [1,0,1]
// Continue spreading from (0,1) and (1,0):
// (0,0) = 1 → Change to 2
// (0,2) = 1 → Change to 2
// (2,0) = 1 → Change to 2

// [2,2,2]
// [2,2,0]
// [2,0,1]
// Final Output:

// [
//     [2,2,2],
//     [2,2,0],
//     [2,0,1]
// ]

// 🔹 Approach: Depth-First Search (DFS)
// The Flood Fill algorithm is similar to the "bucket fill" tool in image editing software. It recursively changes the color of adjacent pixels in all four directions (Up, Down, Left, Right).

// 🔹 Algorithm
// Base Case: If the pixel is out of bounds or doesn't match the original color, stop.
// Change the color of the current pixel.
// Recur in all four directions:
// Move up (x - 1, y)
// Move down (x + 1, y)
// Move left (x, y - 1)
// Move right (x, y + 1)
// Stop when all connected pixels are updated.

// 🔹 Code Implementation

function floodFill(
  image: number[][],
  sr: number,
  sc: number,
  color: number
): number[][] {
  const originalColor = image[sr][sc];

  // If the starting pixel already has the target color, return the image as is
  if (originalColor === color) return image;

  function dfs(x: number, y: number): void {
    // Base case: Out of bounds or different color
    if (
      x < 0 ||
      y < 0 ||
      x >= image.length ||
      y >= image[0].length ||
      image[x][y] !== originalColor
    ) {
      return;
    }

    // Change the color of the current pixel
    image[x][y] = color;

    // Recursively apply flood fill in all four directions
    dfs(x - 1, y); // Up
    dfs(x + 1, y); // Down
    dfs(x, y - 1); // Left
    dfs(x, y + 1); // Right
  }

  dfs(sr, sc); // Start the DFS
  return image;
}

// 🔹 Time & Space Complexity
// Complexity	Explanation
// Time Complexity: O(N × M)	Each pixel is visited once.
// Space Complexity: O(N × M)	Due to the recursive call stack in the worst case.

// 🔹 Approach: Breadth-First Search (BFS)
// Instead of recursion (DFS), this approach iteratively processes each pixel using a queue (FIFO structure).
// It ensures that all pixels at the same depth level are processed before moving deeper, preventing deep recursion and stack overflow issues.

// 🔹 Algorithm
// Edge Case: If the starting pixel already has the target color, return the image.
// Initialize a queue with the starting pixel [sr, sc].
// While the queue is not empty:
// Dequeue a pixel (x, y).
// Change its color to the target color.
// Push its adjacent pixels (Up, Down, Left, Right) into the queue if they match the original color.
// Repeat until the queue is empty.
// 🔹 Code Implementation

function floodFillBFS(
  image: number[][],
  sr: number,
  sc: number,
  color: number
): number[][] {
  const originalColor = image[sr][sc];

  // If the starting pixel already has the target color, return the image as is
  if (originalColor === color) return image;

  const queue: [number, number][] = [[sr, sc]]; // Initialize queue
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]; // Up, Down, Left, Right

  while (queue.length > 0) {
    const [x, y] = queue.shift()!; // Dequeue the first element
    image[x][y] = color;

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      // Check bounds and if it has the original color
      if (
        newX >= 0 &&
        newY >= 0 &&
        newX < image.length &&
        newY < image[0].length &&
        image[newX][newY] === originalColor
      ) {
        queue.push([newX, newY]);
      }
    }
  }

  return image;
}

// 🔹 Example Walkthrough
// Input:

// image = [
//   [1, 1, 1],
//   [1, 1, 0],
//   [1, 0, 1]
// ]

// sr = 1, sc = 1, color = 2
// Step-by-Step Execution
// Step	                                                  Queue	                                                            Image
// Start	                                        [(1,1)]	                                                            [[1,1,1],[1,1,0],[1,0,1]]
// Process (1,1)	                              [(0,1), (2,1), (1,0), (1,2)]	                                        [[1,2,1],[2,2,0],[1,0,1]]
// Process (0,1)	                              [(2,1), (1,0), (1,2), (0,0), (0,2)]	                              [[2,2,1],[2,2,0],[1,0,1]]
// Process (1,0)	                              [(2,1), (1,2), (0,0), (0,2), (2,0)]	                              [[2,2,1],[2,2,0],[2,0,1]]
// Process (2,1)	                              [(1,2), (0,0), (0,2), (2,0)]	No change (0 found)
// Process (1,2), (0,0), (0,2), (2,0)	          Queue is empty	                                                  Flood Fill complete
// Final Output:

// [
//   [2, 2, 2],
//   [2, 2, 0],
//   [2, 0, 1]
// ]
// 🔹 Time & Space Complexity
// Complexity	Explanation
// Time Complexity: O(N × M)	Each pixel is processed once.
// Space Complexity: O(N × M)	Queue storage in the worst case.

// 🔹 BFS vs. DFS
// Approach	          Stack/Queue	Space Complexity	          Best Use Case
// DFS (Recursion)	          Call Stack	O(N × M) (worst case)	When recursion depth is manageable
// BFS (Queue)	          Queue	          O(N × M) (worst case)	When deep recursion may cause stack overflow

// DFS can cause a stack overflow for large inputs.
// BFS avoids recursion and is better for handling large grids.
