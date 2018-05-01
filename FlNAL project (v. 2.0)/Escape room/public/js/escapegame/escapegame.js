//ESCAPE ROOM
//By Alexander Svanholm, Anne Gregersen & Frederik Ditlev

/*

Contains the functions setup(), enterNumber(), isMouseOver(), showMouseCoords(), and draw()

*/

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


/** Enters number in keypad */
function enterNumber(newNumber) {
  if (numberEntered.length >= keypadNumbersLimit) {
    return;
  }
  numberEntered += newNumber.toString();
}
//enterNumber ends

/** Checks if the mouse is over given coordinates */
function isMouseOver(x,y,w,h){
  if (mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h) {
    return true;
  }else{
    return false;
  };
}
//isMouseOver ends



/** Debug function to log mouse position */
function showMouseCoords() {
  console.log("MouseX: ", mouseX, " MouseY: ", mouseY);
}
//showMouseCoords ends

/** Draw loop */
function draw() {
  if(!started && !win && !gameOver && !howToPlayOpen){
    startScreen();
  }else if (howToPlayOpen) {
    showHowToPlay();
  }else if (win) {
    endScreen("You got away in " + "time left" + "\n" + " with a total of " + clickCount + " clicks used!");
  }else if (gameOver) {
    endScreen("Game over");
  }else {
    mainGame(); // located in maingame.js
    showTimer(); // located in timer.js
    isItHovering(); // loacated in hovertext.js
    hoverTimer(); // located in hovertext.js
    hoverText(); // located in hoverText.js


  };
  // showMouseCoords();
  if(started && !win && !gameOver) {
    textAlign(LEFT);
    fill(textBG);
    rect(30,8,200,50);
    fill(textColor);
    text(clickCount + " Clicks made",40,40);
  }

}
//draw ends
