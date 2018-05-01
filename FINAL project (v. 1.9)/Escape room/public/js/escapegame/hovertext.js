/*

Contains the function hoverText()

*/

// Hovering text
function hoverText() {
  push();
  // Text code
  textAlign(CENTER);
  textStyle(BOLD);
  fill(textColor);
  textSize(22);
  strokeWeight(4);
  stroke(10);
  // Calling functions
  if (confirmedHover == true && hoverEnable == true) {
  hallwayHover();
  storageHover();
  }
  pop();
}

function isItHovering() {
  if (currentLocation === locations.hallway){
    if (isMouseOver(exitDoorX,exitDoorY,exitDoorW,exitDoorH)
      || isMouseOver(hwRadiatorX,hwRadiatorY,hwRadiatorW,hwRadiatorH)
      || isMouseOver(hwWindowX,hwWindowY,hwWindowW,hwWindowH)
      || isMouseOver(hwBloodX,hwBloodY,hwBloodW,hwBloodH)
      || isMouseOver(hwLight1X,hwLight1Y,hwLight1W,hwLight1H)
      || isMouseOver(hwLight2X,hwLight2Y,hwLight2W,hwLight2H))
    {confirmedHover = true;
    } else {confirmedHover = false;}
  }
  if (currentLocation === locations.storageRoom){
    if (isMouseOver(chestX,chestY,chestW,chestH)
      || isMouseOver(sPL1X,sPL1Y,sPL1W,sPL1H)
      || isMouseOver(sPL2X,sPL2Y,sPL2W,sPL2H)
      || isMouseOver(sPL3X,sPL3Y,sPL3W,sPL3H)
      || isMouseOver(sJunkX,sJunkY,sJunkW,sJunkH))
      {confirmedHover = true;
      } else {confirmedHover = false;}
  }
}
//isItHovering ends

function hoverTimer() {
  if (confirmedHover == true) {
    if(hoverTime >=0 && hoverTime < 121){
      hoverEnable = true;
      hoverTime += 1;
    }
    if(hoverTime > 120){
      hoverEnable = false
    }
  }
  if (confirmedHover == false){
  hoverEnable = false;
  hoverTime = 120
  }
}
//hoverTimer ends

// Hallway texts
// Radiator
const hwRadiatorX = 540;
const hwRadiatorY = 320;
const hwRadiatorW = 40;
const hwRadiatorH = 100;
// Window
const hwWindowX = 535;
const hwWindowY = 0;
const hwWindowW = 40;
const hwWindowH = 50;
// Blood stain
const hwBloodX = 610;
const hwBloodY = 500;
const hwBloodW = 200;
const hwBloodH = 100;
// Light1
const hwLight1X = 550;
const hwLight1Y = 80;
const hwLight1W = 25;
const hwLight1H = 40;
// Light2
const hwLight2X = 460;
const hwLight2Y = 0;
const hwLight2W = 60;
const hwLight2H = 50;

// Code for hoverText in the hallway
function hallwayHover() {
  if (!exitKeyOwned && !showingKeypad && currentLocation === locations.hallway && isMouseOver(exitDoorX,exitDoorY,exitDoorW,exitDoorH)) {
    text("The exit door\nIt won't open", mouseX, mouseY-40);
  }
  if (!showingKeypad && currentLocation === locations.hallway && isMouseOver(hwRadiatorX,hwRadiatorY,hwRadiatorW,hwRadiatorH) ) {
    text("An old, broken radiator\nIt's cold to the touch", mouseX, mouseY-40);
  }
  if (!showingKeypad && currentLocation === locations.hallway && isMouseOver(hwWindowX,hwWindowY,hwWindowW,hwWindowH) ) {
    text("That window is too high\nfor me to reach", mouseX, mouseY+40);
  }
  if (!showingKeypad && currentLocation === locations.hallway && isMouseOver(hwBloodX,hwBloodY,hwBloodW,hwBloodH) ) {
    text("Looks like a blood stain\nSeems it's been there a while", mouseX, mouseY-40);
  }
  if (!showingKeypad && currentLocation === locations.hallway && isMouseOver(hwLight1X,hwLight1Y,hwLight1W,hwLight1H) ) {
    text("At least the lights are on", mouseX, mouseY-10);
  }
  if (!showingKeypad && currentLocation === locations.hallway && isMouseOver(hwLight2X,hwLight2Y,hwLight2W,hwLight2H) ) {
    text("At least the lights are on", mouseX, mouseY+40);
  }

}

// Storage room texts
// Padlock 1, 2, and 3
const sPL1X = 866;
const sPL1Y = 454;
const sPL1W = 25;
const sPL1H = 50;

const sPL2X = 749;
const sPL2Y = 367;
const sPL2W = 15;
const sPL2H = 30;

const sPL3X = 681;
const sPL3Y = 314;
const sPL3W = 10;
const sPL3H = 20;
// Random junk
const sJunkX = 923;
const sJunkY = 319;
const sJunkW = 350;
const sJunkH = 280;

function storageHover() {
  if (confirmedHover == true) {
  if (!chestKeyOwned && currentLocation === locations.storageRoom && isMouseOver(chestX,chestY,chestW,chestH) ) {
    text("The chest has a large\npadlock on it", mouseX, mouseY-40);
  }
  if (currentLocation === locations.storageRoom && isMouseOver(sPL1X,sPL1Y,sPL1W,sPL1H) ) {
    text("These locks are all\ncompletely busted", mouseX, mouseY-40);
  }
  if (currentLocation === locations.storageRoom && isMouseOver(sPL2X,sPL2Y,sPL2W,sPL2H) ) {
    text("These locks are all\ncompletely busted", mouseX, mouseY-40);
  }
  if (currentLocation === locations.storageRoom && isMouseOver(sPL3X,sPL3Y,sPL3W,sPL3H) ) {
    text("These locks are all\ncompletely busted", mouseX, mouseY-40);
  }
  if (currentLocation === locations.storageRoom && isMouseOver(sJunkX,sJunkY,sJunkW,sJunkH) ) {
    text("A bunch of junk\nNot very useful", mouseX, mouseY-40);
  }
  }
}

// function mousePressed() {
//   if (!exitKeyOwned && !showingKeypad && currentLocation === locations.hallway && isMouseOver(exitDoorX,exitDoorY,exitDoorW,exitDoorH)) {
//     text("The exit door \n It won't open", mouseX, mouseY-40);
//   }
//   if (!showingKeypad && currentLocation === locations.hallway && isMouseOver(hwRadiatorX,hwRadiatorY,hwRadiatorW,hwRadiatorH)) {
//     text("An old, broken radiator \n It's ice cold", mouseX, mouseY-40);
//   }
//   if (currentLocation === locations.hallway && isMouseOver(hwWindowX,hwWindowY,hwWindowW,hwWindowH)) {
//     text("That window is too high \n for me to reach", mouseX, mouseY+40);
//   }
//   if (currentLocation === locations.hallway && isMouseOver(hwBloodX,hwBloodY,hwBloodW,hwBloodH)) {
//     text("It's old and faded", mouseX, mouseY-10);
//   }
// }



// textTrigger = 0; millisecond<5*1000 &&       millisecond = 0;


// if (started && currentLocation === locations.hallway && mouseX > circuitDoorX && mouseX < circuitDoorX+circuitDoorW && mouseY > circuitDoorY && mouseY < circuitDoorY+circuitDoorH) {
//
//   text('Circuit Room', mouseX, mouseY-10);
// }
// if (started && currentLocation === locations.hallway && mouseX > exitDoorX && mouseX < exitDoorX+circuitDoorW && mouseY > exitDoorY && mouseY < exitDoorY+exitDoorH) {
//   text('Exit', mouseX, mouseY-10);
// }
// if (started && currentLocation === locations.hallway && mouseX > storagexitDoorX && mouseX < storagexitDoorX+storagexitDoorW && mouseY > storagexitDoorY && mouseY < storagexitDoorY+storagexitDoorH) {
//   text('Storage Room', mouseX, mouseY-10);
// }
// if (started && currentLocation === locations.hallway && mouseX > radiatorDoorX && mouseX < radiatorDoorX+radiatorDoorW && mouseY > radiatorDoorY && mouseY < radiatorDoorY+radiatorDoorH) {
//   text('Radiator Room', mouseX, mouseY-10);
//
// }
