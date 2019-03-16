// get html objects 
var userGuess = document.getElementById("userGuess");
var wrongGuesses = document.getElementById("wrongGuesses");
var guessLeft = document.getElementById("guessLeft");
var userWin = document.getElementById("win");
var userLose = document.getElementById("lose");
//control variables
var u = 0; //holds the times the user wins
var c = 0; //holds the time the computer wins
var g = 9; // sets the number of opportunities thas a user have
var options = ["diana", "enrique", "jose", "alberto"];//set the options array
var guessSoFar = "";
var ug = [];//array for user guess
var cg = [];//array for compuer option
var ut = [];//array fro key press by user

// Randomly chooses a choice from the options array. This is the Computer's guess.
var computerGuess = options[Math.floor(Math.random() * options.length)];

//print the number of underscores to the userGuess li and puches the under scire and computer options 
function printUnder() {
    userGuess.textContent = "";
    for (i = 0; i < computerGuess.length; i++) {
        userGuess.textContent = userGuess.textContent + "_ ";
        ug.push("_");
        cg.push(computerGuess.charAt(i));
    }
}

//function to validate if the user win, lose or  can continue playing
function validate(userG, compG) {
    if (ut.includes(userG)) {
        return "skeep"//returns skeep because the user typed for a second time a letter
    } else if (compG.includes(userG)) {
        //ug.push(userG);
        addGuess(userG, compG);
        if (ug.toLocaleString() === cg.toString())
            return "win";//retuns win if the user match the letter choose by the computer
        else
            return "continue"; // returns continue if the user type a letter contain in the computerGues
    } else if (g === 1) {
        return "lose"; // returns lose if the user did match the computer guess in the last chance
    } else {
        ut.push(userG); //pushes the user guess to an array to keep the letters already typed
        return "next"; //returns next to get the next guess of the user
    }
}
//function to reset teh vales for a new game
function reset() {
    g = 9;
    ug = [];
    ut = [];
    cg = [];
    var oldCG = computerGuess;
    //chooses a new word for the next game
    do {
        computerGuess = options[Math.floor(Math.random() * options.length)];
    } while (oldCG === computerGuess)

    printUnder();

}

//function to print the guesses on screen
function printGuess() {
    userGuess.textContent = " ";
    for (i = 0; i < ug.length; i++) {
        userGuess.textContent = userGuess.textContent + ug[i] + " ";
    }
}

//funtion to add the user guess to the array
function addGuess(u, c) {

    for (i = 0; i < c.length; i++) {
        if (c[i] === u)
            ug[i] = u;
    }
    console.log(ug);
}
//function to print the values to the screen depending if the user win, lose or is his next turn
function print(result, value) {
    switch (result) {
        case "lose":
            userLose.textContent = c;
            userWin.textContent = u;
            wrongGuesses.textContent = "";
            guessLeft.textContent = 9;
            break;
        case "next":
            if (g === 8)
                wrongGuesses.textContent = wrongGuesses.textContent + value;
            else
                wrongGuesses.textContent = wrongGuesses.textContent + "," + value;

            guessLeft.textContent = g;
            break;
        case "win":
            userLose.textContent = c;
            userWin.textContent = u;
            wrongGuesses.textContent = "";
            guessLeft.textContent = 9;
            break;
        case "continue":
            printGuess();
            break;
    }
}
//funtion to validate if the key press is a letter
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

// print the under score for teh first game
printUnder();
// This function is run whenever the user presses a key.
document.onkeyup = function (event) {

    var userGuess = event.key; // Determines which key was pressed.
    userGuess = userGuess.toLowerCase();// set to lowercase the user guess

    //event key validation
    if (isLetter(userGuess)) {
        //we evalute the game scenario 
        switch (validate(userGuess, computerGuess)) {
            case "lose":
                c++;
                print("lose", userGuess);
                reset();
                break;
            case "next":
                g--;
                print("next", userGuess);
                break;
            case "win":
                u++;
                print("win", ug);
                reset();
                break;
            case "continue":
                print("continue", ug);
                break;
            case "skeep":
                console.log("skeep");
                break;

        }//switch ends
    }// ends key validation
};//end of the key event

