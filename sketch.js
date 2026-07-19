let ballX = [];
let ballY = [];
let ballR = [];
let ballG = [];
let ballB = [];
let ballSpeed = [];
let ballSize = [];

let playerX = 250;
let playerY = 470;
let playerW = 40;
let playerH = 40;
let score = 0;
let goalScore = 50;
let extraSpeed = 0;
let gameOver = false;
let gameWon = false;
let shipImg;

function preload() {
  shipImg = loadImage('Images/Ship.png');
}

function setup() {
  createCanvas(500, 500);
  noStroke();

  for (let i = 0; i < 8; i++) {
    let isGrey = random(1);

    if (isGrey < 0.5) {
      let shade = random(120, 255);
      ballR.push(shade);
      ballG.push(shade);
      ballB.push(shade);
    } else {
      ballR.push(random(90, 160));
      ballG.push(0);
      ballB.push(0);
    }

    ballX.push(random(0, 500));
    ballY.push(random(-500, 0));
    ballSpeed.push(random(2, 5));
    ballSize.push(random(25, 50));
  }
}

function draw() {
  background(0);

  let gameIsRunning = true;
  if (gameOver == true) {
    gameIsRunning = false;
  }
  if (gameWon == true) {
    gameIsRunning = false;
  }

  if (gameIsRunning) {
    if (keyIsDown(LEFT_ARROW)) {
      playerX = playerX - 6;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      playerX = playerX + 6;
    }
    if (playerX < playerW / 2) {
      playerX = playerW / 2;
    }
    if (playerX > width - playerW / 2) {
      playerX = width - playerW / 2;
    }
  }

  imageMode(CENTER);
  image(shipImg, playerX, playerY, playerW, playerH);

  for (let i = 0; i < ballX.length; i++) {
    fill(ballR[i], ballG[i], ballB[i]);
    ellipse(ballX[i], ballY[i], ballSize[i], ballSize[i]);

    if (gameIsRunning) {
      ballY[i] = ballY[i] + ballSpeed[i] + extraSpeed;

      let dx = playerX - ballX[i];
      let dy = playerY - ballY[i];
      let d = sqrt(dx * dx + dy * dy);
      if (d < ballSize[i] / 2 + playerW / 2) {
        gameOver = true;
      }

      if (ballY[i] > 525) {
        ballY[i] = random(-100, 0);
        ballX[i] = random(0, 500);
        score = score + 1;
        extraSpeed = extraSpeed + 0.2;
      }
    }
  }

  if (gameIsRunning && score >= goalScore) {
    gameWon = true;
  }

  fill(255);
  textSize(20);
  text("Dodged: " + score + " / " + goalScore, 10, 25);

  if (gameOver) {
    textSize(32);
    textAlign(CENTER, CENTER);
    text("GAME OVER\nPress R to restart", width / 2, height / 2);
    textAlign(LEFT, BASELINE);
  }

  if (gameWon) {
    textSize(32);
    textAlign(CENTER, CENTER);
    text("YOU WIN!\nPress R to restart", width / 2, height / 2);
    textAlign(LEFT, BASELINE);
  }
}

function keyPressed() {
  if (key == 'r' || key == 'R') {
    if (gameOver || gameWon) {
      score = 0;
      extraSpeed = 0;
      gameOver = false;
      gameWon = false;
      for (let i = 0; i < ballX.length; i++) {
        ballY[i] = random(-500, 0);
        ballX[i] = random(0, 500);
      }
    }
  }
}