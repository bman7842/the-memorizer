//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()


//Global constants
const clueHoldTime = 1000; //starting hold time for each clue's light (ms)
const minClueHoldTime = 400; //Minimum time the clue hold time can be
const cluePauseTime = 333; //How long to pause between clues
const nextClueWaitTime = 1000; //How long to wait before playing sequence
const maxNumButtons = 10; //Maximum of 10 buttons can be displayed
const maxPatternSize = 8; //Maximum length of a generated pattern
const maxNumOfErrors = 3;
const secondsToGuess = 10;

//Global Variables:
var pattern = [2, 2, 4, 3, 2, 1, 2, 4]
var progress = 0;
var guessCounter = 0;
var remainingErrors = 0;
var numberActiveButtons = 0;
var curClueHoldTime = clueHoldTime;
var volume = 0.5; //between 0.0-1.0
var gamePlaying = false;
var tonePlaying = false;
var cluePlaying = false;

function startup() {
  document.getElementById("numBoxesInput").setAttribute("max",maxNumButtons);
  generateButtons(4);
  
  g.connect(context.destination)
  g.gain.setValueAtTime(0,context.currentTime)
  o.connect(g)
  o.start(0)
}

function startGame() {
  //Initialize game variables
  clearButtons();
  progress = 0;
  remainingErrors = maxNumOfErrors;
  curClueHoldTime = clueHoldTime;
  gamePlaying = true;
  
  let numButtons = document.getElementById("numBoxesInput").value;
  if (numButtons > maxNumButtons) {
    numButtons = maxNumButtons;
  } else if (numButtons < 2) {
    numButtons = 2;
  }
  generateButtons(numButtons);
  generateRandomPattern();
  
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;
  
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  if (!document.getElementById("error").classList.contains("hidden")) {
      document.getElementById("error").classList.add("hidden");
  }
}

function loseGame() {
  playError();
  stopGame();
  alert("Game Over. You Lost.");
}

function winGame() {
  stopGame();
  alert("Game Over. You won!");
}

function countdown(time, curProgress) {
  let countdownElement = document.getElementById("countdown");
  if (gamePlaying && (progress == curProgress) && !cluePlaying) {
    if (countdownElement.classList.contains("hidden")) {
      countdownElement.classList.remove("hidden");
    }
    if (time == 0) {
      countdownElement.classList.add("hidden");
      loseGame();
    } else {
      countdownElement.innerHTML = "Hurry! You have " + time + " seconds remaining to guess!";
      
      setTimeout(countdown, 1000, time-1, curProgress)
    }
  } else {
    if (!countdownElement.classList.contains("hidden")) {
      countdownElement.classList.add("hidden");
    }
  }
}

const colorMap = {
  "lightgreen": "green",
  "lightblue": "blue",
  "pink": "red",
  "lightyellow": "yellow",
  "plum": "RebeccaPurple",
  "SandyBrown": "Sienna",
  "SeaShell": "Silver",
  "Khaki": "DarkKhaki",
  "GreenYellow": "Green",
  "CadetBlue": "CornflowerBlue"
}

function generateButtons(amount) {
  let buttonDiv = document.getElementById("gameButtonArea");
  
  for (let i = 1; i<= amount; i++) {
    var color = Object.keys(colorMap)[i-1];
    
    var tempButton = document.createElement("button");
    tempButton.id = "button"+i;
    tempButton.style.backgroundColor = color;
    tempButton.onclick= function() {guess(i)};
    tempButton.onmousedown=function() {lightButton(i, true)};
    tempButton.onmouseleave=function() {clearButton(i, true)};
    tempButton.onmouseup=function() {clearButton(i, true)};
    buttonDiv.appendChild(tempButton);
  }
  
  numberActiveButtons = amount;
}

function clearButtons() {
  var buttons = document.getElementById("gameButtonArea").children;
  
  let buttonCounter = 1;
  while (buttons.length > 0) {
    buttons[0].remove();
    stopTone(buttonCounter);
    buttonCounter++;
  }
  
  numberActiveButtons = 0;
}

function generateRandomPattern() {
  var tempPattern = [];
  
  for (let i = 0; i < maxPatternSize; i++ ) {
    tempPattern[i] = Math.floor(Math.random()*numberActiveButtons) + 1;
  }
  
  pattern = tempPattern;
  //console.log(tempPattern); for testing
}

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying || cluePlaying) {
    return;
  }
  
  if (pattern[guessCounter] != btn) {
    incorrectGuess(btn);
  } else {
    if (guessCounter < progress) {
      guessCounter++;
    } else {
      if (progress == pattern.length-1) {
          winGame();
      } else {
        progress++;
        if (curClueHoldTime < minClueHoldTime) {
           curClueHoldTime = minClueHoldTime
        } else if (curClueHoldTime > minClueHoldTime) {
          curClueHoldTime -= 100;
        }
        playClueSequence();
      }
    }
  }
}

function incorrectGuess(btn) {
  if (remainingErrors <= 1) {
    loseGame();
  } else {
    remainingErrors--;
    cluePlaying = true;
    playError();
    
    if (document.getElementById("error").classList.contains("hidden")) {
      document.getElementById("error").classList.remove("hidden");
    }
    let errorMsg = document.getElementById("errorMsg");
    errorMsg.innerHTML = "You have " + remainingErrors + " try(s) remaining.";
    
    var refButton = document.getElementById("button"+btn);
    refButton.style.backgroundImage = "url('https://cdn.glitch.com/40e4a275-1fa3-46aa-9d93-fdb2a4748ad4%2FinvalidTile.png?1616367247773')";
    setTimeout(clearButton, curClueHoldTime, btn, false);
    setTimeout(playClueSequence, curClueHoldTime);
    
  }
}

function playClueSequence() {
  guessCounter = 0;
  let delay = nextClueWaitTime; //Delay = initial wait time
  console.log(curClueHoldTime);
  cluePlaying = true; //Prevents users simply just clicking buttons as they are displayed
  for (let i = 0; i <= progress; i++) { //For # of clues revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]) // set a timeout to play that clue
    
    delay += curClueHoldTime;
    delay += cluePauseTime;
  }
  setTimeout(function(){
    cluePlaying = false;
    countdown(secondsToGuess, progress);
  }, delay-cluePauseTime);
}

function playSingleClue(btn) {
  if(gamePlaying){
    lightButton(btn, false);
    setTimeout(clearButton,curClueHoldTime,btn);
  }
}

function lightButton(btn, fromMouse) {
  if (fromMouse && cluePlaying) {
    console.log("nonnoo");
    return;
  }

    var refButton = document.getElementById("button"+btn);
    refButton.style.backgroundColor = colorMap[Object.keys(colorMap)[btn-1]];
    refButton.style.backgroundImage = "url('https://cdn.glitch.com/40e4a275-1fa3-46aa-9d93-fdb2a4748ad4%2Ftile.png?1616309376605')";
  
    startTone(btn);
}

function clearButton(btn, fromMouse) {
  if (fromMouse && cluePlaying) {
    return;
  }
  
  var refButton = document.getElementById("button"+btn);
  refButton.style.backgroundImage = "none";
  refButton.style.backgroundColor = Object.keys(colorMap)[btn-1];
  
  stopTone(btn, clueHoldTime);
}

// Sound Synthesis Functions
const freqMap = {
  1: 200,
  2: 230,
  3: 261.6,
  4: 329.6,
  5: 392,
  6: 466.2,
  7: 500,
  8: 532,
  9: 680,
  10: 630
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}
function playError() {
  let audio = new Audio('https://cdn.glitch.com/40e4a275-1fa3-46aa-9d93-fdb2a4748ad4%2FwindowsErrorFin.mp3?v=1616370252274');
  audio.play();
}