/*----------------------------Variables--------------------------------------------*/
// Creating variables for use in javascript
var completedgame = true;
var currentNamePos = 0;
var wins = 0;
var guessLeft = 12;
var guessArray = [];
var currentName = "";
var currentNameArray = [];
var characterNames = ["palpatine", "vader", "leia", "luke", "obiwan", "yoda", "hansolo", "chewbacca", "bobafett", "jabba"];

// Create variables that hold references to specific tags in the HTML where we want to display and change items.
var guessedLettersText = document.getElementById("guessedLetters-Text");
var winsText = document.getElementById("wins-Text");
var guessesRemainingText = document.getElementById("guessesRemaining-Text");
var instructionText = document.getElementById("Instructions");
var currentWordText = document.getElementById("currentWord-Text");
var mainImageText = document.getElementById('main-image');
var imageInstructionsText = document.getElementById("imageInstructions");
var musicElement = document.getElementById("music");

/*---------------- Functions ---------------------------------------------------*/
//Random Position Generator
function randomPosition() {
  var random = Math.floor(Math.random() * 10);
  console.log(random);
  return random;
}

// Function for placing selected letter in correct spot.
function fillcurrentNameArray(letter) {
  for (z = 0; z < currentNameArray.length; z++) {
    if (letter == currentName.charAt(z)) {
      currentNameArray[z] = currentName.charAt(z);
    }
  }
}

//Function for checking to see if selected letter was already used
function alreadyGuessed(letter) {
  for (y = 0; y < guessArray.length; y++) {
    if (letter == guessArray[y]) {
      return true;
    }
  }
  return false;
}

//Function for establishing the current name to be guessed and clearing the name array
function selectNewName(position) {
  currentName = characterNames[position];
  currentNameArray = [];
  for (x = 0; x < characterNames[position].length; x++) {
    currentNameArray.push("_");
  }
}

//Function for reseting the game to start
function newGame() {
  completedgame = true;
  guessLeft = 12;
  guessArray = [];
  currentNamePos = randomPosition(characterNames);
  selectNewName(currentNamePos);
  instructionText.textContent = " Guess the name of the Stars Wars character below.  Push any letter to start playing the game, or press the spacebar to start a new game";
  winsText.textContent = "Wins: " + wins;
  currentWordText.textContent = currentNameArray.join(" ");
  guessesRemainingText.textContent = "Guesses left: " + guessLeft;
  guessedLettersText.textContent = "";
  mainImageText.src = "assets/images/Starwarsposter.png";
  imageInstructionsText.textContent = "";
  updateAudio('assets/music/Theme-Song.mp3');
}

//Play audio for start of new game, when player wins, and when he loses
function updateAudio(audioFile) {
  var x = document.getElementById("audio");
  x.setAttribute("src", "assets/music/silence.mp3");
  musicElement.setAttribute("src", audioFile);
  musicElement.autoplay = true;
  musicElement.volume = 0.2;

}

/*---------------------------Inital Establishment of Game-----------------------------*/
newGame();


/*--------------------------Start of the game-------------------------------------*/
document.onkeypress = function (event) {
  //Deleting instructions and notifying player when new game begins
  instructionText.textContent = "";

  //Creating variables for use on keypress event
  var userGuess = event.key;
  var userGuessKey1 = event.keyCode;
  var userGuessKey2 = event.which;

  //Determine if user pressed lowercase letter
  if ((userGuessKey1 >= 97 || userGuessKey2 >= 97) && (userGuessKey1 <= 122 || userGuessKey2 <= 122)) {
    //Check to make sure current game has been completed and reset
    if (completedgame === true) {

      //Check to see if user has already guessed the letter, and if so do nothing, but if not then update the letters in the guessArray and guessLeft
      if (alreadyGuessed(userGuess) === false) {
        guessArray.push(userGuess);
        guessLeft--;
        fillcurrentNameArray(userGuess)
        //console.log(currentNameArray);
        //console.log(guessArray);

        //Check and see if they completed the word and if so update images, wins and play music
        if (currentNameArray.join("") === currentName) {
          completedgame = false;
          wins++;
          winsText.textContent = "Wins: " + wins;
          currentWordText.textContent = currentNameArray.join(" ");
          guessesRemainingText.textContent = "Guesses left: " + guessLeft;
          guessedLettersText.textContent = guessArray;
          mainImageText.src = "assets/images/yodacongrats.jpg";
          imageInstructionsText.textContent = "Congrats, you won!!!!!  To play again please press space bar";
          updateAudio("assets/music/Rebels.mp3");

          //If they don't complete the word, but have not reached the end of their choices        
        } else if (guessLeft > 0) {
          currentWordText.textContent = currentNameArray.join(" ");
          guessesRemainingText.textContent = "Guesses left: " + guessLeft;
          guessedLettersText.textContent = guessArray.join(", ");
        
        //They don't complete the word, and have run out of guesses  
        } else {
          completedgame = false;
          winsText.textContent = "Wins: " + wins;
          currentWordText.textContent = currentNameArray.join(" ");
          guessesRemainingText.textContent = "Guesses left: " + guessLeft;
          guessedLettersText.textContent = guessArray;
          mainImageText.src = "assets/images/Noooo.jpg";
          imageInstructionsText.textContent = "Sorry, You lose. Please try again. Press the space bar to start a new game";
          updateAudio("assets/music/nooo.mp3");
        }
      }

      //Make sure user hit space bar to start a new game otherwise put up alert to remind them to hit the spacebar to start again.
    } else {
      alert("You need to start a new game.  Please press the space bar to start a new game.");
    }
  } else if (userGuessKey1 == 32 || userGuessKey2 == 32) {
    newGame();
  } 
}