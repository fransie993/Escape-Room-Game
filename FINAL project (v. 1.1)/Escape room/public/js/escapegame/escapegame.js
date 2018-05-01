// Canvas size
const canvasX = 1280;
const canvasY = 720;
// After starting the game, set started to true, to show the game and hide the start button
let started = false;
// After the game is won, set win to true, to show the victory text
let win = false;
// Colors for UI
const backgroundColor = 50;
const textBG = 40;
const menuBG = 35;
const textColor = "#3282FF"; //50,130,255
const hovered = 100;
// Variables to check mouse position over objects and buttons
let mouseOverStart = false;
let mouseOverCDoor = false;
let mouseOverRDoor = false;
let mouseOverSDoor = false;
let mouseOverEDoor = false;
// Variables for images
let imgHallway;
let imgCircuitRoom;
let imgRadiatorRoom;
let imgStorageRoom;
// Locations
const locationsEnum = {
  "hallway": "hallway",
  "circuitRoom": "circuitRoom",
  "radiatorRoom": "radiatorRoom",
  "storageRoom": "storageRoom"
};
const startingLocation = locationsEnum.hallway;
let currentLocation = startingLocation;
/*
Buttons positions

X and Y are the coordinates of the button.
TX and TY are X and Y of the text.
W and H are width and height of the button.
*/
// Start Button
const startX = 530;
const startY = 300;
const startW = 210;
const startH = 60;
const startTX = 570;
const startTY = 340;
// # Hallway doors
// Circuit room door (Door on the left)
const cDoorX = 77;
const cDoorY = 160;
const cDoorW = 120;
const cDoorH = 400;
// Radiator room door (First on the right)
const rDoorX = 780;
const rDoorY = 0;
const rDoorW = 230;
const rDoorH = 710;
// Storage room door (Second on the right)
const sDoorX = 570;
const sDoorY = 80;
const sDoorW = 50;
const sDoorH = 400;
// Exit door (Door at the end of the hallway)
const eDoorX = 345;
const eDoorY = 110;
const eDoorW = 160;
const eDoorH = 310;


/** Preload images */
function preload() {
  imgHallway = loadImage("public/images/hallway.jpg");
  imgCircuitRoom = loadImage("public/images/circuit_room.jpg");
  imgRadiatorRoom = loadImage("public/images/radiator_room.jpg");
  imgStorageRoom = loadImage("public/images/storage_room.jpg");
}

/** Sets up canvas */
function setup() {
  let canvas = createCanvas(canvasX, canvasY);
  canvas.parent("sketch-holder");
  background(backgroundColor);
  frameRate(60);
}

/** Shows button to start the game */
function startScreen(){
  mouseOverStart = isMouseOver(startX,startY,startW,startH);
  const startLabel = "Start game";
  fill(textBG);
  if (mouseOverStart) {
    fill(hovered);
  }
  rect(startX,startY,startW,startH);
  fill(textColor);
  textSize(26);
  text(startLabel, startTX, startTY);
}

/** Shows "You won" */
function endScreen(){
  // Box background
  fill(menuBG);
  rect(0,0,canvasX,canvasY);
  // Text
  fill(textBG);
  rect(550,300,200,60);
  fill(textColor);
  textSize(26);
  text("You won", 600, 340);
}

/** Handle mouse clicks */
function mousePressed(){
  if (!started && mouseOverStart) {
    started = true;
  }
  if (!started) {
    return;
  }
  // Handle clicks on objects for each room after game starts
  if (currentLocation === locationsEnum.hallway) {
    mouseOverCDoor = isMouseOver(cDoorX,cDoorY,cDoorW,cDoorH);
    mouseOverRDoor = isMouseOver(rDoorX,rDoorY,rDoorW,rDoorH);
    mouseOverSDoor = isMouseOver(sDoorX,sDoorY,sDoorW,sDoorH);
    mouseOverEDoor = isMouseOver(eDoorX,eDoorY,eDoorW,eDoorH);
    if (mouseOverCDoor) {
      currentLocation = locationsEnum.circuitRoom;
    }else if (mouseOverRDoor) {
      currentLocation = locationsEnum.radiatorRoom;
    }else if (mouseOverSDoor) {
      currentLocation = locationsEnum.storageRoom;
    }else if (mouseOverEDoor) {
      win = true;
    }
  }else if (currentLocation === locationsEnum.circuitRoom) {

  }else if (currentLocation === locationsEnum.storageRoom) {

  }else if (currentLocation === locationsEnum.radiatorRoom) {

  }

}

/** Checks if the mouse is over given coordinates */
function isMouseOver(x,y,w,h){
  if (mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h) {
    return true;
  }else{
    return false;
  };
}

/** Main game logic. Looped in draw() function while playing */
function mainGame() {
  // Show matching image based on currentLocation
  if (currentLocation === locationsEnum.hallway) {
    image(imgHallway, 0, 0, canvasX, canvasY);
    // Temorarily draw rects over doors to show where to click
    // Will hide them later
    fill(999); // White
    rect(cDoorX,cDoorY,cDoorW,cDoorH);
    rect(rDoorX,rDoorY,rDoorW,rDoorH);
    rect(sDoorX,sDoorY,sDoorW,sDoorH);
    rect(eDoorX,eDoorY,eDoorW,eDoorH);

  }else if (currentLocation === locationsEnum.circuitRoom) {
    image(imgCircuitRoom, 0, 0, canvasX, canvasY);

  }else if (currentLocation === locationsEnum.storageRoom) {
    image(imgStorageRoom, 0, 0, canvasX, canvasY);

  }else if (currentLocation === locationsEnum.radiatorRoom) {
    image(imgRadiatorRoom, 0, 0, canvasX, canvasY);

  }
}

/** Debug function to log mouse position */
function showMouseCoords() {
  console.log("MouseX: ", mouseX, " MouseY: ", mouseY);
}

/** Draw loop */
function draw() {
  if(!started && !win){
    startScreen();
  }else if (win) {
    endScreen();
  }else {
    mainGame();
  };
  showMouseCoords();
}
