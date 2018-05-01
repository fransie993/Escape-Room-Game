/*

Contains the function mainGame()

*/

/** Main game logic. Looped in draw() function while playing */
function mainGame() {
  fill(999); // White

  locationManager();
  inventory();
  bottomHoverText();
}
//mainGame ends

function locationManager() {
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
    image(imgChest, 480, 420, imgChest.width/2, imgChest.height/2);
  }
  // rect(chestX,chestY,chestW,chestH);
  }else if (currentLocation === locations.radiatorRoom) {
    image(imgRadiatorRoom, 0, 0, canvasX, canvasY);
  }
}

function inventory() {
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
}

function bottomHoverText() {
  push();
  fill(textColor);
  textSize(30);
  textAlign(CENTER);
  strokeWeight(4);
  stroke(10);
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
  pop();
}
