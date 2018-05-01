/*

Contains the code for the timer. 

*/

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
