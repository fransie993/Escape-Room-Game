//ESCAPE ROOM
//By Alexander Svanholm, Anne Gregersen & Frederik Ditlev

let clickCount = 0;
const timeLimit = 450; // 450 seconds, 7.5 minutes in seconds
let timeLeft = timeLimit;
let converted;
var extraDigit; //the zero in front of 1 digit numbers
let timerInterval;
// Canvas size
const canvasX = 1280;
const canvasY = 720;
// After starting the game, set started to true, to show the game and hide the start button
let started = false;
// After the game is won, set win to true, to show the victory text
let win = false;
let gameOver = false;
let howToPlayOpen = false;
// Colors for UI
const backgroundColor = 50;
const textBG = 40;
const menuBG = 35;
const textColor = "#3282FF"; //50,130,255
const hovered = 100;
// Variables to check mouse position over objects and buttons
let mouseOverStart = false;
let mouseOverHowtoPlay = false;
let mouseOverCircuitDoor = false;
let mouseOverRadiatoradiatorDoor = false;
let mouseOverStoragexitDoor = false;
let mouseOverExitDoor = false;
let mouseOverReturn = false;
// Keypad keys
let mouseOverOneKey = false;
let mouseOverTwoKey = false;
let mouseOverThreeKey = false;
let mouseOverFourKey = false;
let mouseOverFiveKey = false;
let mouseOverSixKey = false;
let mouseOverSevenKey = false;
let mouseOverEightKey = false;
let mouseOverNineKey = false;
let mouseOverZeroKey = false;
let mouseOverOkKey = false;
let mouseOverCancelKey = false;
// Variables for images
let imgHallway;
let imgCircuitRoom;
let imgRadiatorRoom;
let imgStorageRoom;
let imgReturnArrow;
let imgChest;
let imgKeypad;
let imgChestKey;
let imgKeycard;
let imgBackground;
// Locations
const locations = {
  "hallway": "hallway",
  "circuitRoom": "circuitRoom",
  "radiatorRoom": "radiatorRoom",
  "storageRoom": "storageRoom"
};
const labelHallway = "To the hallway";
const labelCircuitRoom = "To the circuit room";
const labelRadiatorRoom = "To the radiator room";
const labelStorageRoom = "To the storage room";
const labelExitDoor = "Exit door";

const startingLocation = locations.hallway;
let currentLocation = startingLocation;
// Keys
let chestKeyOwned = false;
let exitKeyOwned = false;
let circuitRoomOpened = false;
const circuitRoomCode = "3466"; // TREE
let showingKeypad = false;
let numberEntered = "";
const keypadNumbersLimit = 14;
/*
Buttons positions

X and Y are the coordinates of the button.
TX and TY are X and Y of the text.
W and H are width and height of the button.
*/
// Start Button
const startW = 210;
const startH = 60;
const startX = (canvasX/2) - (startW/2);
const startY = (canvasY/2) - (startH/2);
const startTX = 575;
const startTY = 370;
// How to play button
const htpW = 210;
const htpH = 60;
const htpX = (canvasX/2) - (htpW/2);
const htpY = (canvasY/2) - (htpH/2) + 100;
const htpTX = 575;
const htpTY = 470;
// # Hallway doors
// Circuit room door (Door on the left)
const circuitDoorX = 390;
const circuitDoorY = 60;
const circuitDoorW = 100;
const circuitDoorH = 500;
// Radiator room door (First on the right)
const radiatorDoorX = 760;
const radiatorDoorY = 130;
const radiatorDoorW = 60;
const radiatorDoorH = 300;
// Storage room door (Second on the right)
const storagexitDoorX = 850;
const storagexitDoorY = 20;
const storagexitDoorW = 120;
const storagexitDoorH = 550;
// Exit door (Door at the end of the hallway)
const exitDoorX = 600;
const exitDoorY = 150;
const exitDoorW = 120;
const exitDoorH = 250;
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
// Keypad screen
const keypadScreenX = 549;
const keypadScreenY = 180;
const keypadScreenW = 228;
const keypadScreenH = 70;
// Keypad numbers
// 1
const oneKeyX = 569;
const oneKeyY = 271;
const oneKeyW = 50;
const oneKeyH = 50;
// 2
const twoKeyX = 637;
const twoKeyY = 271;
const twoKeyW = 50;
const twoKeyH = 50;
// 3
const threeKeyX = 704;
const threeKeyY = 271;
const threeKeyW = 50;
const threeKeyH = 50;
// 4
const fourKeyX = 569;
const fourKeyY = 340;
const fourKeyW = 50;
const fourKeyH = 50;
// 5
const fiveKeyX = 637;
const fiveKeyY = 340;
const fiveKeyW = 50;
const fiveKeyH = 50;
// 6
const sixKeyX = 704;
const sixKeyY = 340;
const sixKeyW = 50;
const sixKeyH = 50;
// 7
const sevenKeyX = 569;
const sevenKeyY = 405;
const sevenKeyW = 50;
const sevenKeyH = 50;
// 8
const eightKeyX = 637;
const eightKeyY = 405;
const eightKeyW = 50;
const eightKeyH = 50;
// 9
const nineKeyX = 704;
const nineKeyY = 405;
const nineKeyW = 50;
const nineKeyH = 50;
// 0
const zeroKeyX = 637;
const zeroKeyY = 475;
const zeroKeyW = 50;
const zeroKeyH = 50;
// OK
const okKeyX = 569;
const okKeyY = 475;
const okKeyW = 50;
const okKeyH = 50;
// Cancel
const cancelKeyX = 704;
const cancelKeyY = 475;
const cancelKeyW = 50;
const cancelKeyH = 50;
// ChestKey
const chestKeyX = 340;
const chestKeyY = 520;
const chestKeyW = 60;
const chestKeyH = 60;
// Main menu
const mainMenuW = 200;
const mainMenuH = 60;
const mainMenuX = (canvasX/2) - (mainMenuW/2);
const mainMenuY = (canvasY/2) - (mainMenuH/2) + 70;
// How to play out
const htpOX = canvasX-62;
const htpOY = 20;
const htpOW = 40;
const htpOH = 40;
// Info text
const infoX = canvasX/2;
const infoY = canvasY - 50;
// Music
let basementMusic;
let dripMusic;
// Sound effects
let openDoor;
let openChest;
let pickKey;

/** Preload images */
function preload() {
  imgHallway = loadImage("public/images/hallway_final2.png");
  imgCircuitRoom = loadImage("public/images/circuit_room_final2.png");
  imgRadiatorRoom = loadImage("public/images/radiator_room_final2.png");
  imgStorageRoom = loadImage("public/images/storage_room_final2.png");
  imgReturnArrow = loadImage("public/images/returnArrow.png");
  imgChest = loadImage("public/images/chest.png");
  imgChestKey = loadImage("public/images/chestKey.png");
  imgKeypad = loadImage("public/images/keypad.png");
  imgKeycard = loadImage("public/images/keycard.png");
  imgBackground = loadImage("public/images/placeholderBackground.png");

  soundFormats("mp3", "wav");
  /** Preload music */
  basementMusic = loadSound("public/music/basement.mp3");
  dripMusic = loadSound("public/music/drip.mp3");
  // Sound effects
  openDoor = loadSound("public/music/openDoor.wav");
  closeDoor = loadSound("public/music/closeDoor.wav");
  lockedDoor = loadSound("public/music/lockedDoor.wav");
  soundKeypad = loadSound("public/music/keypad.wav");
  openChest = loadSound("public/music/openChest.wav");
  pickKey =  loadSound("public/music/pickKey.wav");

  openDoor.setVolume(0.5);
  closeDoor.setVolume(0.5);
  lockedDoor.setVolume(0.5);
  soundKeypad.setVolume(0.5);
  openChest.setVolume(0.5);
  pickKey.setVolume(0.5);
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
  fill(menuBG);
  rect(0,0,canvasX,canvasY);
  image(imgBackground, 0, 0, canvasX, canvasY);
  mouseOverStart = isMouseOver(startX,startY,startW,startH);
  mouseOverHowtoPlay = isMouseOver(htpX,htpY,htpW,htpH);
  fill(textBG);
  if (mouseOverStart) {
    fill(hovered);
  }
  rect(startX,startY,startW,startH);
  fill(textColor);
  textSize(26);
  text("Start game", startTX, startTY);
  // How to play
  fill(textBG);
  if (mouseOverHowtoPlay) {
    fill(hovered);
  }
  rect(htpX,htpY,htpW,htpH);
  fill(textColor);
  textSize(26);
  text("How to play", htpTX, htpTY);
}
//starScreen ends

/** Shows endScreenText */
function endScreen(endScreenText){
  fill(menuBG);
  rect(0,0,canvasX,canvasY);
  // Text
  fill(textBG);
  const esW = 200;
  const esH = 60;
  const esX = (canvasX/2) - (esW/2);
  const esY = (canvasY/2) - (esH/2) - 30;
  rect(esX,esY,esW,esH);
  fill(textColor);
  textSize(26);
  if (endScreenText === "Game over") {
    text(endScreenText, 575, 340);
  }else {
    text(endScreenText, 590, 340);
  }
  // Main menu button
  fill(textBG);
  if (isMouseOver(mainMenuX,mainMenuY,mainMenuW,mainMenuH)) {
    fill(hovered);
  }
  rect(mainMenuX,mainMenuY,mainMenuW,mainMenuH);
  fill(textColor);
  text("Main menu", 575, 440);
  // Music stops
  dripMusic.stop();
  basementMusic.stop();
}
//endScreen ends

/** Enters number in keypad */
function enterNumber(newNumber) {
  if (numberEntered.length >= keypadNumbersLimit) {
    return;
  }
  numberEntered += newNumber.toString();
}
//enterNumber ends

/** Handle mouse clicks */
function mouseClicked() {
  if (!started && mouseOverStart) {
    started = true;
    timerInterval = setInterval(() => { timeLeft -= 1; }, 1000);
    // Dripping sound is lowered
    dripMusic.amp(0.02,0.02);
    // Basement music loops
    basementMusic.loop();
    // Basement music volume
    basementMusic.amp(0.1,0.1);
    return;
  }
  if (!started && !howToPlayOpen && mouseOverHowtoPlay) {
    howToPlayOpen = true;
    return;
  }
  if (howToPlayOpen) {
    // Close how to play
    if (isMouseOver(htpOX,htpOY,htpOW,htpOH)) {
      howToPlayOpen = false;
    }
  }
  if (!started) {
    return;
  }
  if (win || gameOver) {
    if ( isMouseOver(mainMenuX,mainMenuY,mainMenuW,mainMenuH) ) {
      console.log("To main menu");
      win = false;
      gameOver = false;
      chestKeyOwned = false;
      exitKeyOwned = false;
      circuitRoomOpened = false;
      showingKeypad = false;
      clickCount = 0;
      numberEntered = "";
      clearInterval(timerInterval);
      timeLeft = timeLimit;
      currentLocation = startingLocation;
      started = false;
    }
    return;
  }
  clickCount += 1;
  // Handle clicks on objects for each room after game starts
  if (currentLocation === locations.hallway) {
    if (showingKeypad) {
      // Keypad handling
      mouseOverOneKey = isMouseOver(oneKeyX,oneKeyY,oneKeyW,oneKeyH);
      mouseOverTwoKey = isMouseOver(twoKeyX,twoKeyY,twoKeyW,twoKeyH);
      mouseOverThreeKey = isMouseOver(threeKeyX,threeKeyY,threeKeyW,threeKeyH);
      mouseOverFourKey = isMouseOver(fourKeyX,fourKeyY,fourKeyW,fourKeyH);
      mouseOverFiveKey = isMouseOver(fiveKeyX,fiveKeyY,fiveKeyW,fiveKeyH);
      mouseOverSixKey = isMouseOver(sixKeyX,sixKeyY,sixKeyW,sixKeyH);
      mouseOverSevenKey = isMouseOver(sevenKeyX,sevenKeyY,sevenKeyW,sevenKeyH);
      mouseOverEightKey = isMouseOver(eightKeyX,eightKeyY,eightKeyW,eightKeyH);
      mouseOverNineKey = isMouseOver(nineKeyX,nineKeyY,nineKeyW,nineKeyH);
      mouseOverZeroKey = isMouseOver(zeroKeyX,zeroKeyY,zeroKeyW,zeroKeyH);
      mouseOverOkKey = isMouseOver(okKeyX,okKeyY,okKeyW,okKeyH);
      mouseOverCancelKey = isMouseOver(cancelKeyX,cancelKeyY,cancelKeyW,cancelKeyH);
      if (mouseOverOneKey) {
        enterNumber(1);
      }else if (mouseOverTwoKey) {
        enterNumber(2);
      }else if (mouseOverThreeKey) {
        enterNumber(3);
      }else if (mouseOverFourKey) {
        enterNumber(4);
      }else if (mouseOverFiveKey) {
        enterNumber(5);
      }else if (mouseOverSixKey) {
        enterNumber(6);
      }else if (mouseOverSevenKey) {
        enterNumber(7);
      }else if (mouseOverEightKey) {
        enterNumber(8);
      }else if (mouseOverNineKey) {
        enterNumber(9);
      }else if (mouseOverZeroKey) {
        enterNumber(0);
      }else if (mouseOverOkKey) {
        if (numberEntered === circuitRoomCode) {
          circuitRoomOpened = true;
          numberEntered = "";
          showingKeypad = false;
          currentLocation = locations.circuitRoom;
          soundKeypad.play();

        }else {
          numberEntered = "";
          showingKeypad = false;
        }
      }else if (mouseOverCancelKey) {
        numberEntered = "";
        showingKeypad = false;
      }
      return;
    }
    if (mouseOverCircuitDoor) {
      if (!circuitRoomOpened) {
        // Show keypad
        showingKeypad = true;
        return;
      }
      currentLocation = locations.circuitRoom;
      openDoor.play();
    }else if (mouseOverRadiatoradiatorDoor) {
      currentLocation = locations.radiatorRoom;
      openDoor.play();
    }else if (mouseOverStoragexitDoor) {
      currentLocation = locations.storageRoom;
      openDoor.play();
    }else if (mouseOverExitDoor) {
      if (exitKeyOwned) {
        win = true;
      }
      else {lockedDoor.play();}
    }
  }else if (currentLocation === locations.circuitRoom) {
    if ( isMouseOver(chestKeyX,chestKeyY,chestKeyW,chestKeyH) ) {
      if (!chestKeyOwned) {
        pickKey.play();
      }
      chestKeyOwned = true;
    }
  }else if (currentLocation === locations.storageRoom) {
    if ( isMouseOver(chestX,chestY,chestW,chestH) && chestKeyOwned ) {
      if (!exitKeyOwned) {
        openChest.play();
      }
      exitKeyOwned = true;
    }
  }else if (currentLocation === locations.radiatorRoom) {

  }
  if (mouseOverReturn && currentLocation != locations.hallway ) {
    currentLocation = locations.hallway;
    closeDoor.play();
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
  fill(textColor);// adding a zero in front of the seconds for numbers with 1 digit
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
    // rect(circuitDoorX,circuitDoorY,circuitDoorW,circuitDoorH);
    // rect(radiatorDoorX,radiatorDoorY,radiatorDoorW,radiatorDoorH);
    // rect(storagexitDoorX,storagexitDoorY,storagexitDoorW,storagexitDoorH);
    // rect(exitDoorX,exitDoorY,exitDoorW,exitDoorH);
    mouseOverCircuitDoor = isMouseOver(circuitDoorX,circuitDoorY,circuitDoorW,circuitDoorH);
    mouseOverRadiatoradiatorDoor = isMouseOver(radiatorDoorX,radiatorDoorY,radiatorDoorW,radiatorDoorH);
    mouseOverStoragexitDoor = isMouseOver(storagexitDoorX,storagexitDoorY,storagexitDoorW,storagexitDoorH);
    mouseOverExitDoor = isMouseOver(exitDoorX,exitDoorY,exitDoorW,exitDoorH);

    if (showingKeypad) {
      fill(menuBG);
      rect(keypadScreenX,keypadScreenY,keypadScreenW,keypadScreenH);
      image(imgKeypad, 550, 250, imgKeypad.width, imgKeypad.height);
      fill(999);
      text(numberEntered, keypadScreenX + 20, keypadScreenY + 50);
      // rect(oneKeyX,oneKeyY,oneKeyW,oneKeyH);
      // rect(twoKeyX,twoKeyY,twoKeyW,twoKeyH);
      // rect(threeKeyX,threeKeyY,threeKeyW,threeKeyH);
      // rect(fourKeyX,fourKeyY,fourKeyW,fourKeyH);
      // rect(fiveKeyX,fiveKeyY,fiveKeyW,fiveKeyH);
      // rect(sixKeyX,sixKeyY,sixKeyW,sixKeyH);
      // rect(sevenKeyX,sevenKeyY,sevenKeyW,sevenKeyH);
      // rect(eightKeyX,eightKeyY,eightKeyW,eightKeyH);
      // rect(nineKeyX,nineKeyY,nineKeyW,nineKeyH);
      // rect(zeroKeyX,zeroKeyY,zeroKeyW,zeroKeyH);
      // rect(okKeyX,okKeyY,okKeyW,okKeyH);
      // rect(cancelKeyX,cancelKeyY,cancelKeyW,cancelKeyH);

    }
  }else if (currentLocation === locations.circuitRoom) {
    image(imgCircuitRoom, 0, 0, canvasX, canvasY);
    if (!chestKeyOwned) {
      image(imgChestKey, 330, 520, imgChestKey.width/5.5, imgChestKey.height/5.5);
      // fill(999);
      // rect(chestKeyX,chestKeyY,chestKeyW,chestKeyH);
    }
  }else if (currentLocation === locations.storageRoom) {
    image(imgStorageRoom, 0, 0, canvasX, canvasY);

  if (!exitKeyOwned) {
    image(imgChest, 500, 450, imgChest.width/2, imgChest.height/2);
  }
  // rect(chestX,chestY,chestW,chestH);
  }else if (currentLocation === locations.radiatorRoom) {
    image(imgRadiatorRoom, 0, 0, canvasX, canvasY);
  }
  // Inventory
  fill(backgroundColor);
  rect(inventoryX,inventoryY,inventoryW,inventoryH);
  fill(menuBG);
  // Item slots
  rect(itemSlot1X,itemSlot1Y,itemSlot1W,itemSlot1H);
  if (chestKeyOwned) {
    image(imgChestKey, itemSlot1X + 10, itemSlot1Y + 10, imgChestKey.width/5, imgChestKey.height/5);
  }
  rect(itemSlot2X,itemSlot2Y,itemSlot2W,itemSlot2H);
  if (exitKeyOwned) {
    image(imgKeycard, itemSlot2X + 10, itemSlot2Y + 10, imgKeycard.width/3, imgKeycard.height/3);
  }
  if (isMouseOver(returnButtonX,returnButtonY,returnButtonW,returnButtonH)) {
    mouseOverReturn = true;
    fill(hovered);
  }else {
    mouseOverReturn = false;
  }
  rect(returnButtonX,returnButtonY,returnButtonW,returnButtonH);
  image(imgReturnArrow, returnButtonX, returnButtonY, imgReturnArrow.width/5.5, imgReturnArrow.height/5.5);
  fill(textColor);
  textSize(26);
  if (mouseOverReturn && currentLocation != locations.hallway) {
    text(labelHallway, infoX, infoY);

  }
  if (!showingKeypad && currentLocation === locations.hallway) {
    if (mouseOverExitDoor) {
      text(labelExitDoor, infoX, infoY);
    }
    if (mouseOverStoragexitDoor) {
      text(labelStorageRoom, infoX, infoY);
    }
    if (mouseOverRadiatoradiatorDoor) {
      text(labelRadiatorRoom, infoX, infoY);
    }
    if (mouseOverCircuitDoor) {
      text(labelCircuitRoom, infoX, infoY);
    }
  }
}
//mainGame ends

/** How to play screen */
function showHowToPlay() {
  fill(menuBG);
  rect(0,0,canvasX,canvasY);
  fill(textColor);
  const howToPlayText = "Hello, Winnie Omelette du fromage, is it me you're looking for?";
  text(howToPlayText, 350, canvasY/2);
  // Exit from how to play
  fill(menuBG);
  if (isMouseOver(htpOX,htpOY,htpOW,htpOH)) {
    fill(hovered);
  }
  rect(htpOX,htpOY,htpOW,htpOH);
  fill(textColor);
  text("X", canvasX-50, 50);
}
//showHowToPlay ends

/** Debug function to log mouse position */
function showMouseCoords() {
  console.log("MouseX: ", mouseX, " MouseY: ", mouseY);
}
//showMouseCoords ends

function hoverText() {
  //textSize(22);
  push();
  textAlign(CENTER);
  fill(textColor);
  strokeWeight(4);
  stroke(10);

  if (started && currentLocation === locations.hallway && mouseX > circuitDoorX && mouseX < circuitDoorX+circuitDoorW && mouseY > circuitDoorY && mouseY < circuitDoorY+circuitDoorH) {
    text('Circuit Room', mouseX, mouseY-10);
  }
  if (started && currentLocation === locations.hallway && mouseX > exitDoorX && mouseX < exitDoorX+circuitDoorW && mouseY > exitDoorY && mouseY < exitDoorY+exitDoorH) {
    text('Exit', mouseX, mouseY-10);
  }
  if (started && currentLocation === locations.hallway && mouseX > storagexitDoorX && mouseX < storagexitDoorX+storagexitDoorW && mouseY > storagexitDoorY && mouseY < storagexitDoorY+storagexitDoorH) {
    text('Storage Room', mouseX, mouseY-10);
  }
  if (started && currentLocation === locations.hallway && mouseX > radiatorDoorX && mouseX < radiatorDoorX+radiatorDoorW && mouseY > radiatorDoorY && mouseY < radiatorDoorY+radiatorDoorH) {
    text('Radiator Room', mouseX, mouseY-10);

  }
pop();
}

/** Draw loop */
function draw() {
  if(!started && !win && !gameOver && !howToPlayOpen){
    startScreen();
  }else if (howToPlayOpen) {
    showHowToPlay();
  }else if (win) {
    endScreen("You won");
  }else if (gameOver) {
    endScreen("Game over");
  }else {
    mainGame();
    showTimer();
    hoverText();
  };
  // showMouseCoords();
  if(started) {
    textAlign(LEFT);
    fill(textBG);
    rect(30,8,200,50);
    fill(textColor);
    text(clickCount + " Clicks made",40,40);
  }

}
//draw ends
