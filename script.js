// Define the secret word
let secretWord = "hello";
let attemptsLeft = 5;

// Get elements
let gridItems = document.querySelectorAll(".grid-item");
let guessButton = document.getElementById("guess-button");
let guessFeedback = document.getElementById("guess-feedback");
let undoButton = document.getElementById("undo-button");

// Function to add character to the input
function addCharacter(character) {
    let guessInput = document.getElementById("guess-input");
    let currentGuess = guessInput.value.toLowerCase();

    if (currentGuess.length < 5) {
        guessInput.value = currentGuess + character;
        fillGrid();
    }
}

// Function to undo the last character in the input
function undo() {
    let guessInput = document.getElementById("guess-input");
    let currentGuess = guessInput.value.toLowerCase();

    if (currentGuess.length > 0) {
        let updatedGuess = currentGuess.slice(0, -1);
        guessInput.value = updatedGuess;
        fillGrid();
    }
}

// Function to fill the grid with the guess
function fillGrid() {
    let guessInput = document.getElementById("guess-input");
    let guess = guessInput.value.toLowerCase();

    for (let i = 0; i < secretWord.length; i++) {
        gridItems[(5 - attemptsLeft) * secretWord.length + i].textContent = guess[i] || "";
    }
}

// Get virtual keyboard buttons
let keyboardButtons = document.querySelectorAll(".keyboard-button");

// Add event listeners to virtual keyboard buttons
keyboardButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        let character = this.textContent;
        addCharacter(character);
    });
});

// Function to check the guess
function checkGuess() {
    if (attemptsLeft === 0) {
        guessFeedback.textContent = "Game over! You ran out of attempts.";
        guessButton.disabled = true;
        return;
    }

    let guessInput = document.getElementById("guess-input");
    let guess = guessInput.value.toLowerCase();

    // Validate the guess
    if (guess.length !== secretWord.length) {
        guessFeedback.textContent = "Guess should be " + secretWord.length + " characters long.";
        return;
    }

    // Check the guess against the secret word
    let matchedPositions = 0;

    for (let i = 0; i < secretWord.length; i++) {
        if (guess[i] === secretWord[i]) {
            gridItems[(5 - attemptsLeft) * secretWord.length + i].style.backgroundColor = "green";
            matchedPositions++;
        } else if (!secretWord.includes(guess[i])) {
            gridItems[(5 - attemptsLeft) * secretWord.length + i].style.backgroundColor = "grey";
        } else if (secretWord.includes(guess[i])) {
            gridItems[(5 - attemptsLeft) * secretWord.length + i].style.backgroundColor = "yellow";
        } else {
            gridItems[(5 - attemptsLeft) * secretWord.length + i].style.backgroundColor = "white";
        }
        
    }

    // Provide feedback to the player
    if (matchedPositions === secretWord.length) {
        guessFeedback.textContent = "Congratulations! You guessed the word.";
        guessButton.disabled = true;
        undoButton.disabled = true;
        keyboardButtons.forEach(function(button) {
            button.disabled = true;
        });
    } else {
        attemptsLeft--;
        guessFeedback.textContent = "Matched positions: " + matchedPositions + " | Attempts left: " + attemptsLeft;

        if (attemptsLeft === 0) {
            guessButton.disabled = true;
        }
    }

    // Clear the guess input
    guessInput.value = "";
}