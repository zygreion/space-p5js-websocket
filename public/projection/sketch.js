// Random Seed
// Easter egg (5e)
const SEED = 7_20_13_0_8_5_24_12_20_8_25_25_24;

// Data structures
let earth;
let stars = [];
let drawnObjects = [];

// Socket configuration
let socket;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  randomSeed(SEED);
  imageMode(CENTER);

  // Background object
  earth = await loadImage("../assets/worldwide_colored.png");
  earth.resize(600, 0);

  generateStars(100);

  // Sockets connection
  socket = io.connect("http://localhost:3000");
  socket.on("draw", newDrawing);
}

function draw() {
  background("#12003d");

  drawStars();
  drawSun(0, 0);
  drawEarth(width / 2, height);

  drawObjects();
}

// Sun and earth
function drawSun(x, y) {
  for (let i = 2; i >= 0; i--) {
    fill(255, 165, 0, 255 / 2 ** i);
    circle(x, y, 250 + 50 * i);
  }
}

function drawEarth(x, y) {
  push();
  translate(x, y);
  rotate(-frameCount / 3000);
  image(earth, 0, 0);
  pop();
}

// Star creation
function generateStars(n) {
  for (let i = 0; i < n; i++) {
    stars.push({
      pos: createVector(random(), random()),
      size: random(0, 1.5),
      cycleOffset: random(100 * 5),
    });
  }
}

function drawStars() {
  fill("white");

  for (const star of stars) {
    const newSize =
      0.5 + sin((frameCount + star.cycleOffset) / 100) * star.size;
    circle(star.pos.x * width, star.pos.y * height, newSize);
  }
}

// Hand drawn objects from socket
async function newDrawing(data) {
  const newImage = await loadImage(data.imageData);
  newImage.resize(100, 0);

  const newObject = {
    pos: createVector(random(), random()),
    dir: createVector(random(-0.1, 0.1), random(-0.1, 0.1)),
    img: newImage,
    rotation: random(0, TWO_PI),
    offsetCycle: random(500),
  };
  newObject.dir.normalize();

  drawnObjects.push(newObject);
}

const SPEED = 0.001;
const BOUNCE_PADDING = 0.25;
function drawObjects() {
  for (const object of drawnObjects) {
    push();

    translate(object.pos.x * width, object.pos.y * height);
    scale(sin(frameCount / 100) / 8 + 1 / 8 + 0.75);
    rotate(object.rotation + (frameCount + object.offsetCycle) / 700);

    const newHeight = sin(frameCount / 200) * object.height * 10;
    image(object.img, 0, 0, object.width, newHeight);

    // Update position
    const nextPos = getObjectNextPos(object);
    let isColliding = true;

    // drawnObject has x and y values between 0 and 1
    if (abs(nextPos.x - 0.5) >= 0.5 + BOUNCE_PADDING) {
      object.dir.x *= -1;
      isColliding = false;
    }
    if (abs(nextPos.y - 0.5) >= 0.5 + BOUNCE_PADDING) {
      object.dir.y *= -1;
      isColliding = false;
    }

    object.pos = isColliding ? getObjectNextPos(object) : nextPos;

    pop();
  }
}

function getObjectNextPos(object) {
  return p5.Vector.add(object.pos, p5.Vector.mult(object.dir, SPEED));
}

// kalo ada error dijelasin (5d)

// Utility functions
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function doubleClicked() {
  let fs = fullscreen();
  fullscreen(!fs);
}
