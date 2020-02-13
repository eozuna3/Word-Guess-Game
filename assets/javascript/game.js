/*----------------------------Variables--------------------------------------------*/
// Creating variables to hold the number of wins, losses, guesses left, random Letter chosen, and an array to hold the list of guesses made.
var completedgame = true;
var currentNamePos = 0;
var wins = 0;
var guessLeft = 12;
var guessArray = [];
var currentName = "";
var currentNameArray = [];
var characterNames = ["palpatine", "vader", "leia", "luke", "obiwan", "yoda", "hansolo", "chewbacca", "bobafett", "jabba"];

// Create variables that hold references to the places in the HTML where we want to display things.
var guessedLettersText = document.getElementById("guessedLetters-Text");
var winsText = document.getElementById("wins-Text");
var guessesRemainingText = document.getElementById("guessesRemaining-Text");
var instructionText = document.getElementById("Instructions");
var currentWordText = document.getElementById("currentWord-Text");

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
  console.log(currentName);
}

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

      //Check to see if user has already guessed the letter, and if so do nothing, but if not then update the letters in the name
      if (alreadyGuessed(userGuess) === false) {
        guessArray.push(userGuess);
        guessLeft--;
        fillcurrentNameArray(userGuess)
        console.log(currentNameArray);
        console.log(guessArray);

        //Check and see if they completed the word
        if (currentNameArray.join("") === currentName) {
          completedgame = false;
          wins++;
          winsText.textContent = "Wins: " + wins;
          currentWordText.textContent = currentNameArray.join(" ");
          guessesRemainingText.textContent = "Guesses left: " + guessLeft;
          guessedLettersText.textContent = guessArray;
          alert("Congrats, you won!!!!!  To play again please press space bar");

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
          alert("Sorry, you lose. Please try again.  Press the space bar to start a new game");
        }
      }
    } else {
      alert("You need to restart a new game.  Please press the space bar to start a new game.");
    }
  } else if (userGuessKey1 == 32 || userGuessKey2 == 32) {
    newGame();
  } 
}