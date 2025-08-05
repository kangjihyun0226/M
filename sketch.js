const palettes = ['#60B5FF', '#AFDDFF', '#FFECDB', '#FF9149'];

const minSpeed = 3;
const maxSpeed = 5;
let r = 5;

let x = [];
let y = [];
let vx = [];
let vy = [];
let colour = [];
let ballNum = 0;

function createBall(_x, _y) {
  let newX = _x;
  let newY = _y;
  const randomSpeed = random(minSpeed, maxSpeed);
  const randomAngleDegrees = random(360);
  let newVx = cos(radians(randomAngleDegrees)) * randomSpeed;
  let newVy = sin(radians(randomAngleDegrees)) * randomSpeed;

  let randomIdx = floor(random(palettes.length));
  let newColour = palettes[randomIdx];

  x.push(newX);
  y.push(newY);
  vx.push(newVx);
  vy.push(newVy);
  colour.push(newColour);
  ballNum++;
}

function reset(_x, _y) {
  for (let idx = 0; idx < ballNum; idx++) {
    x[idx] = _x;
    y[idx] = _y;
    const randomSpeed = random(minSpeed, maxSpeed);
    const randomAngleDegrees = random(360);
    vx[idx] = cos(radians(randomAngleDegrees)) * randomSpeed;
    vy[idx] = sin(radians(randomAngleDegrees)) * randomSpeed;
  }
}

function setup() {
  createCanvas(4000, 3000);
  for (let n = 0; n < 100; n++) {
    createBall(width * 0.5, height * 0.5);

    reset(width * 0.5, height * 0.5);
  }
}
function updateBall() {
  for (let idx = 0; idx < ballNum; idx++) {
    x[idx] += vx[idx];
    y[idx] += vy[idx];

    if (x[idx] - r < 0 || x[idx] + r > width) {
      vx[idx] *= -1;
      x[idx] = constrain(x[idx], r, width - r);
    }
    if (y[idx] - r < 0 || y[idx] + r > height) {
      vy[idx] *= -1;
      y[idx] = constrain(y[idx], r, height - r);
    }
  }
}

function drawBall() {
  for (let idx = 0; idx < ballNum; idx++) {
    noStroke();
    fill(colour[idx]);
    ellipse(x[idx], y[idx], r * 2);
  }
}

function draw() {
  background('white');

  updateBall();

  drawBall();
}

function mousePressed() {
  reset(mouseX, mouseY);
}
