
//Create a matrix/2D array to serve as a Grid
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10; //the size of the cells

function setup() {
  createCanvas(600, 400);
  cols = width / resolution;
  rows = height / resolution;

//Initial generation made up of randomly generated 0s and 1s
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);

//draw the grid and the cells (white if alive, black if dead)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  let next = make2DArray(cols, rows); //the grid for the next generation

  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count the number of neighbors that are alive
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);

      //Rules of the game
      if (state == 0 && neighbors == 3) {
        next[i][j] = 1; //If curernt cell has 3 neighbors than it will be alive in the next generation
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0; //If current cell has <2 or  >3 neighbors then it  will be dead in the next gen
      }
       else {
        next[i][j] = state; //otherwise it stays the same
      }

    }
  }

  grid = next;



}

//Count the number of neighbors of a cell
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];//so we do not count the current cell as a neighbor
  return sum;
}
