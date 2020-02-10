// Creating variables to hold the number of wins, losses, guesses left, random Letter chosen, and an array to hold the list of guesses made.

var wins = 0;
var losses = 0;
var guessLeft = 9;
var guessArray = [];
var randomLetter = "";

// Create variables that hold references to the places in the HTML where we want to display things.
var userGuessText = document.getElementById("guessSoFar-Text");
var winsText = document.getElementById("wins-Text");
var lossesText = document.getElementById("losses-Text");
var guessLeftText = document.getElementById("guessLeft-Text");
var instructionText = document.getElementById("Instructions")

//Function for random letter generator.
function stringGen(len) {
  var text = "";
  var charset = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < len; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));

  return text;
}

//Initial Display Text
winsText.textContent = "Wins: 0";
lossesText.textContent = "Losses: 0";
guessLeftText.textContent = "Guesses left: " + guessLeft;
userGuessText.textContent = "Your guesses so far: ";
instructionText.textContent = "Push any letter to start game."

//Initializing the first random letter when the page loads
randomLetter = stringGen(1);
console.log(randomLetter);

//Start of the game
document.onkeypress = function (event) {
  //Deleting instructions and notifying player when new game begins
  instructionText.textContent = ""
  
  //Creating variables for use on keypress event
  var userGuess = event.key;
  var userGuessKey1 = event.keyCode;
  var userGuessKey2 = event.which;

  //Determine if user pressed lowercase letter
  if ((userGuessKey1 >= 97 || userGuessKey2 >= 97) && (userGuessKey1 <=122 || userGuessKey2 <= 122)){
    if(userGuess == randomLetter){
      //Variables are updated and new character selected
      wins++;
      guessLeft = 9;
      randomLetter = stringGen(1);
      guessArray = [];

      //Update Screen Text
      instructionText.textContent = "Push any letter to start game."
      winsText.textContent = "Wins: " + wins;
      lossesText.textContent = "Losses: " + losses;    
      guessLeftText.textContent = "Guesses left: " + guessLeft;
      userGuessText.textContent = "Your guesses so far: ";

    }else if (guessLeft <= 1){
      //Variable are updated and new charater is selected 
      losses++;
      guessLeft = 9;
      randomLetter = stringGen(1);
      guessArray = [];
      
      //Update Screen Text
      instructionText.textContent = "Push any letter to start game.";
      lossesText.textContent = "Losses: " + losses;
      winsText.textContent = "Wins: " + wins;
      guessLeftText.textContent = "Guesses left: " + guessLeft;
      userGuessText.textContent = "Your guesses so far: ";

    } else{
      //Variables and array are updated
      guessLeft--;
      guessArray.push(userGuess);

      //Update Screen Text
      guessLeftText.textContent = "Guesses left: " + guessLeft;
      userGuessText.textContent = "Your guesses so far : " + guessArray;
    } 
  }
}