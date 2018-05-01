//related to clicking
let clickCount = 0;
const clicksLimit = 50;

//related to timer
const timeLimit = 450; // 7.5 minutes in seconds
let timeLeft = timeLimit;
var converted; //seconds into minutes and seconds
var extraDigit; //the zero in front of 1 digit numbers

// Canvas size
const canvasX = 1280;
const canvasY = 720;

// After starting the game, set started to true, to show the game and hide the start button
let started = false;
// After the game is won, set win to true, to show the victory text
let win = false;
let gameOver = false;

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
let mouseOverReturn = false;

// Variables for images
let imgHallway;
let imgCircuitRoom;
let imgRadiatorRoom;
let imgStorageRoom;
let imgReturnArrow;
let imgChest;

// Locations
const locations = {
  "hallway": "hallway",
  "circuitRoom": "circuitRoom",
  "radiatorRoom": "radiatorRoom",
  "storageRoom": "storageRoom"
};
const startingLocation = locations.hallway;
let currentLocation = startingLocation;

// Keys
let chestKeyOwned = false;
let exitKeyOwned = false;
let circuitRoomOpened = false;
const circuitRoomCode = 3466; // TREE
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
const cDoorX = 390;
const cDoorY = 60;
const cDoorW = 100;
const cDoorH = 500;
// Radiator room door (First on the right)
const rDoorX = 760;
const rDoorY = 130;
const rDoorW = 60;
const rDoorH = 300;
// Storage room door (Second on the right)
const sDoorX = 850;
const sDoorY = 20;
const sDoorW = 120;
const sDoorH = 550;
// Exit door (Door at the end of the hallway)
const eDoorX = 600;
const eDoorY = 150;
const eDoorW = 120;
const eDoorH = 250;

// Inventory
const inventoryX = 0;
const inventoryY = 600;
const inventoryW = canvasX;
const inventoryH = 220;
// Item slot 1
const itemSlot1X = 20;
const itemSlot1Y = 610;
const itemSlot1W = 100;
const itemSlot1H = 100;
// Item slot 2
const itemSlot2X = 140;
const itemSlot2Y = 610;
const itemSlot2W = 100;
const itemSlot2H = 100;
// Return button
const returnButtonX = canvasX - 120;
const returnButtonY = 610;
const returnButtonW = 100;
const returnButtonH = 100;
// Chest
const chestX = 500;
const chestY = 450;
const chestW = 180;
const chestH = 100;

// Music
var basementMusic;
var dripMusic;

/** Preload images */
function preload() {
  imgHallway = loadImage("public/images/hallway_final2.png");
  imgCircuitRoom = loadImage("public/images/circuit_room_final2.png");
  imgRadiatorRoom = loadImage("public/images/radiator_room_final2.png");
  imgStorageRoom = loadImage("public/images/storage_room_final2.png");
  imgReturnArrow = loadImage("public/images/returnArrow.png");
  imgChest = loadImage("public/images/chest.png");

/** Preload music */
  basementMusic = loadSound("public/music/basement.mp3");
  dripMusic = loadSound("public/music/drip.mp3");
}
//preload ends

/** Sets up canvas */
function setup() {
  let canvas = createCanvas(canvasX, canvasY);
  canvas.parent("sketch-holder");
  background(backgroundColor);
  frameRate(60);

  // Dripping sound loops
  dripMusic.loop();
  // Dripping sound volume
  dripMusic.amp(0.04,0.04);

}
//setup ends

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
//starScreen ends

/** Shows endScreenText */
function endScreen(endScreenText){
  // Box background
  fill(menuBG);
  rect(0,0,canvasX,canvasY);
  // Text
  fill(textBG);
  rect(550,300,200,60);
  fill(textColor);
  textSize(26);
  text(endScreenText, 600, 340);
  // Music stops
  dripMusic.stop();
  basementMusic.stop();

}
//endScreen ends

/** Handle mouse clicks */
function mouseClicked() {
  if (!started && mouseOverStart) {
    started = true;
    setInterval(() => { timeLeft -= 1; }, 1000);
    // Dripping sound is lowered
    dripMusic.amp(0.02,0.02);
    // Basement music loops
    basementMusic.loop();
    // Basement music volume
    basementMusic.amp(0.1,0.1);
    return;
  }
  if (!started) {
    return;
  }
  // if (clickCount != clicksLimit) {
   clickCount += 1;
  // }
  if (clickCount >= clicksLimit) {
    gameOver = true;

    return;
  }
  // Handle clicks on objects for each room after game starts
  if (currentLocation === locations.hallway) {
    mouseOverCDoor = isMouseOver(cDoorX,cDoorY,cDoorW,cDoorH);
    mouseOverRDoor = isMouseOver(rDoorX,rDoorY,rDoorW,rDoorH);
    mouseOverSDoor = isMouseOver(sDoorX,sDoorY,sDoorW,sDoorH);
    mouseOverEDoor = isMouseOver(eDoorX,eDoorY,eDoorW,eDoorH);
    fill(textBG);

    if (mouseOverCDoor) {
      if (!circuitRoomOpened) {
        // TODO: Show numbers pad
        console.log("Numbers pad opened");
        return;
      }
      currentLocation = locations.circuitRoom;
    }else if (mouseOverRDoor) {
      currentLocation = locations.radiatorRoom;
    }else if (mouseOverSDoor) {
      currentLocation = locations.storageRoom;
    }else if (mouseOverEDoor) {
      if (exitKeyOwned) {
        win = true;
      }
    }
  }else if (currentLocation === locations.circuitRoom) {

  }else if (currentLocation === locations.storageRoom) {

  }else if (currentLocation === locations.radiatorRoom) {

  }
  if (mouseOverReturn) {
    currentLocation = locations.hallway;
  }
  console.log(clickCount);
}
//mousePressed ends

/** Checks if the mouse is over given coordinates */
function isMouseOver(x,y,w,h){
  if (mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h) {
    return true;
  }else{
    return false;
  };
}
//isMouseOver ends


/** Shows timer when the game starts */
function showTimer() {
  fill(textBG);
  rect(canvasX-250,8,200,50);
  fill(textColor);
// adding a zero in front of the seconds for numbers with 1 digit
  if (timeLeft % 60 < 10) {
    extraDigit = 0
  } else {extraDigit = "" }

  converted = floor(timeLeft/60) + ":" + extraDigit + (timeLeft % 60);
  text("Time left: " + converted,1050,40);
  if (timeLeft <= 0) {
    gameOver = true;
  }
}

/** Main game logic. Looped in draw() function while playing */
function mainGame() {
  fill(999); // White
  // Show matching image based on currentLocation
  if (currentLocation === locations.hallway) {
    image(imgHallway, 0, 0, canvasX, canvasY);
    // Temorarily draw rects over doors to show where to click
    rect(cDoorX,cDoorY,cDoorW,cDoorH);
    rect(rDoorX,rDoorY,rDoorW,rDoorH);
    rect(sDoorX,sDoorY,sDoorW,sDoorH);
    rect(eDoorX,eDoorY,eDoorW,eDoorH);

  }else if (currentLocation === locations.circuitRoom) {
    image(imgCircuitRoom, 0, 0, canvasX, canvasY);

  }else if (currentLocation === locations.storageRoom) {
    image(imgStorageRoom, 0, 0, canvasX, canvasY);
    const storageRoomCypher = "N=0\n\
B=1\n\
A=2\n\
T=3\n\
R=4\n\
S=5\n\
E=6\n\
O=7\n\
I=8\n\
G=9"
  fill(0);
  textSize(20);
  text(storageRoomCypher, 580, 180);
  image(imgChest, 500, 450, imgChest.width/2, imgChest.height/2);
  // TODO: Make chest clickable
  // rect(chestX,chestY,chestW,chestH);
  }else if (currentLocation === locations.radiatorRoom) {
    image(imgRadiatorRoom, 0, 0, canvasX, canvasY);
    fill(0);
    const radiatorRiddle = "“Reaching stiffly for the sky,\nI bare my fingers when its cold.\nIn warmth I wear an emerald glove\nand in between I dress in gold.”";
    text(radiatorRiddle, 300, 180);
  }
  // Inventory
  fill(backgroundColor);
  rect(inventoryX,inventoryY,inventoryW,inventoryH);
  fill(menuBG);
  // Item slots
  if (chestKeyOwned) {
    fill(999); // Making slot white for now, if key is owned
  }
  rect(itemSlot1X,itemSlot1Y,itemSlot1W,itemSlot1H);
  fill(menuBG);
  if (exitKeyOwned) {
    fill(999); // Making slot white for now, if key is owned
  }
  rect(itemSlot2X,itemSlot2Y,itemSlot2W,itemSlot2H);
  fill(menuBG);
  if (isMouseOver(returnButtonX,returnButtonY,returnButtonW,returnButtonH)) {
    mouseOverReturn = true;
    fill(hovered);
  }else {
    mouseOverReturn = false;
  }
  rect(returnButtonX,returnButtonY,returnButtonW,returnButtonH);
  image(imgReturnArrow, returnButtonX, returnButtonY, imgReturnArrow.width/5.5, imgReturnArrow.height/5.5);
}
//mainGame ends

/** Debug function to log mouse position */
function showMouseCoords() {
  console.log("MouseX: ", mouseX, " MouseY: ", mouseY);
}
//showMouseCoords ends

/** Draw loop */
function draw() {
  if(!started && !win){
    startScreen();
  }else if (win) {
    endScreen("You won");
  }else if (gameOver) {
    endScreen("Game over");
  }else {
    mainGame();
    showTimer();
  };
  showMouseCoords();

  if(started) {
    fill(textBG);
    rect(30,8,200,50);
    fill(textColor);
    text(clickCount + " Clicks made",40,40);
  }

}
//draw ends
