/*

Contains the functions startScreen(), endScreen(), and showHowToPlay()

*/


/** Shows button to start the game */
function startScreen(){
  fill(menuBG);
  rect(0,0,canvasX,canvasY);
  image(imgStartScreen, 0, 0, canvasX, canvasY);
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
  image(imgEndScreen, 0, 0, canvasX, canvasY);
  // Text
  fill(textBG);
  // const esW = 225;
  // const esH = 60;
  // const esX = (canvasX/2) - (esW/2);
  // const esY = (canvasY/2) - (esH/2) - 30;
  // rect(esX,esY,esW,esH);
  fill(textColor);
  textSize(26);
  if (endScreenText === "Game over") {
    textAlign(CENTER);
    text(endScreenText, 575, 340);
  }else {
    text(endScreenText, 560, 340);
  }
  // Main menu button
  fill(textBG);
  if (isMouseOver(mainMenuX,mainMenuY+88,mainMenuW,mainMenuH)) {
    fill(hovered);
  }
  rect(mainMenuX,mainMenuY+88,mainMenuW,mainMenuH);
  fill(textColor);
  text("Main menu", 575, 528);
  // Music stops
  dripMusic.stop();
  basementMusic.stop();
}
//endScreen ends


/** How to play screen */
function showHowToPlay() {
  fill(menuBG);
  rect(0,0,canvasX,canvasY);
  image(imgAbout, 0, 0, canvasX, canvasY);
  fill(textColor);
  const howToPlayText = "Hello, Winnie Omelette du fromage, is it me you're looking for?";
  //text(howToPlayText, 350, canvasY/2);
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
