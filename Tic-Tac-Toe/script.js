let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let ai = "X"; // The computer is X
let human = "O"; // The human is O
let currentPlayer = human; // Place after computer
let w;
let h;

function setup() {
  createCanvas(400, 400); // Canvas width and height
  w = width / 3; // Column width
  h = height / 3; // Row width
  // bestMove(); // AI goes first
}

function equals3(a, b, c) {
  return a == b && b == c && a != ""; // Check equality
}

function checkWinner() {
  let winner = null;

  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      // Row-wise
      winner = board[i][0];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      // Column-wise
      winner = board[0][i];
    }
  }

  if (equals3(board[0][0], board[1][1], board[2][2])) {
    // Left-diagonal
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    // Right-diagonal
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        // Calculate number of free spaces
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return "tie"; // Return Tie if no free spots
  } else {
    return winner;
  }
}

function mousePressed() {
  if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == "") {
      board[i][j] = human; // Place O in the box
      currentPlayer = ai; // Pass control to Computer
      bestMove();
    }
  }
}

function draw() {
  background(255, 156, 0);
  strokeWeight(4);
  stroke(255);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP("");
    resultP.style("font-size", "32pt");
    resultP.style("color", "white");
    resultP.style("margin-left", "135px");
    if (result == "tie") {
      resultP.html("Tie!");
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}
