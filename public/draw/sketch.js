// Object to draw
let objectIndex = 0;
let spaceObjects = [
  { name: "monster", src: "monster.png", img: null },
  { name: "rocket", src: "rocket.png", img: null },
  { name: "saturn", src: "saturn.png", img: null },
  { name: "robot", src: "space-robot.png", img: null },
  { name: "technology", src: "technology.png", img: null },
  { name: "asteroid", src: "asteroid.png", img: null },
];

// Color configuration
const colors = [
  "white",
  "bisque",
  "yellow",
  "orange",
  "red",
  "blue",
  "skyblue",
  "lime",
  "green",
  "chocolate",
  "brown",
  "black",
];
let currentColor;

// DOM elements
const objectTitle = document.getElementById("object-title");
const colorTitle = document.getElementById("color-title");
const brushSizeTitle = document.getElementById("brush-size-title");
const brushSizeInput = document.getElementById("brush-size-input");

// Socket configuration
let socket;

// Other configuration
const imagePadding = 50;
let overlayGfx = null;
let drawGfx = null;

async function setup() {
  createCanvas(500, 500);
  noStroke();

  // drawGfx is the canvas to draw on
  drawGfx = createGraphics(width, height);
  drawGfx.noStroke();

  // overlayGfx is the canvas to draw the preview (cursor) on
  overlayGfx = createGraphics(width, height);
  overlayGfx.noStroke();

  generateHTMLButtons();

  // Set spaceObjects p5.image from their src
  for (const spaceObject of spaceObjects) {
    spaceObject.img = await loadImage(`../assets/template/${spaceObject.src}`);
  }

  // First render
  resetObject();
  changeBrushSize(brushSizeInput.value);

  // Sockets connection
  socket = io();
}

function draw() {
  transparentGrid();
  drawCursor();

  // The real draw
  if (mouseIsPressed && mouseButton.left) {
    drawGfx.stroke(currentColor);
    drawGfx.line(pmouseX, pmouseY, mouseX, mouseY);
  }

  image(drawGfx, 0, 0);
  image(overlayGfx, 0, 0);
}

// Draw preview cursor above drawGfx layer
function drawCursor() {
  overlayGfx.clear();

  let c = color(currentColor);
  c.setAlpha(100);

  overlayGfx.fill(c);
  overlayGfx.circle(mouseX, mouseY, drawGfx.strokeWeight());
}

// Predetermined color swatch button using colors array
function generateHTMLButtons() {
  for (const c of colors) {
    let button = createButton(null);
    button.parent("color-button-wrapper");
    button.class("color-button");
    button.style("background-color", c);
    button.style("margin", "0 0.125rem");
    button.mousePressed(() => changeColor(button.elt));

    // Set first color to draw to red
    if (c === "red") {
      changeColor(button.elt);
    }
  }
}

// Change object template to draw using Prev and Next button
function addIndexBy(n) {
  if (n < 0) n += spaceObjects.length;
  objectIndex = (objectIndex + n) % spaceObjects.length;
  resetObject();
}

// Draw object template using current objectIndex
function drawObjectTemplate(index) {
  const img = spaceObjects[index].img;

  drawGfx.image(
    img,
    imagePadding / 4,
    imagePadding / 4,
    width - imagePadding / 2,
    height - imagePadding / 2,
  );
  objectTitle.innerHTML = `Object: ${spaceObjects[index].name}`;
}

// Reset drawGfx layer
function resetObject() {
  drawGfx.clear();
  drawObjectTemplate(objectIndex);
}

// Draw transparent grid at the bottom of canvas
// This grid doesn't drawn in drawGfx layer
const GRID_SIZE = 10;
function transparentGrid() {
  for (let x = 0; x < width / GRID_SIZE; x++) {
    for (let y = 0; y < height / GRID_SIZE; y++) {
      let index = GRID_SIZE * y + x;
      if (GRID_SIZE % 2 == 0 && y % 2 == 1) index++;
      index %= 2;

      fill([255, 220][index]);
      rect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE);
    }
  }
}

// Change current color
function changeColor(button) {
  currentColor = button.style.backgroundColor;
  colorTitle.innerHTML = `Color: ${currentColor}`;
}

// Change brush size
function changeBrushSize(value) {
  drawGfx.strokeWeight(Number.parseFloat(value));
  brushSizeTitle.innerHTML = `Size: ${value}`;
}

// Emit draw event to server
function submit() {
  const imageData = drawGfx.elt.toDataURL("image/png");

  const data = {
    type: spaceObjects[objectIndex].name,
    imageData: imageData,
  };

  socket.emit("draw", data);
}
