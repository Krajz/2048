// Select HTML elements for grid, score, and result display
const gridDisplay = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const resultDisplay = document.getElementById('result');

// Define 4x4 grid width
const width = 4;

// Track score and store grid squares
let score = 0;
let squares = [];

// Create 4x4 game board
function createBoard() {
    // Generate 16 divs for the grid
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.innerHTML = '0'; // Initialize empty tile
        gridDisplay.appendChild(square);
        squares.push(square); // Store for manipulation
    }
    generate(); // Add first random tile (2)
    generate(); // Add second random tile (2)
}

// Place a new tile (value 2) in a random empty square
function generate() {
    const randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
        squares[randomNumber].innerHTML = 2; // Set empty square to 2
        checkForLose(); // Check if game is lost
    } else {
        generate(); // Retry if square is not empty
    }
}

// Shift tiles right, moving non-zero tiles to the right
function moveRight() {
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) { // Process each row
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + 1].innerHTML;
            let totalThree = squares[i + 2].innerHTML;
            let totalFour = squares[i + 3].innerHTML;
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
            
            let filteredRow = row.filter(num => num); // Remove zeros
            let missing = 4 - filteredRow.length;


// Count zeros to fill the row
            let zeros = Array(missing).fill(0);
            // Place zeros on the left, non-zero tiles on the right
            let newRow = zeros.concat(filteredRow);
            squares[i].innerHTML = newRow[0];
            squares[i + 1].innerHTML = newRow[1];
            squares[i + 2].innerHTML = newRow[2];
            squares[i + 3].innerHTML = newRow[3];
        }
    }
}

// Shift tiles left, moving non-zero tiles to the left
function moveLeft() {
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) { // Process each row
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + 1].innerHTML;
            let totalThree = squares[i + 2].innerHTML;
            let totalFour = squares[i + 3].innerHTML;
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
            
            let filteredRow = row.filter(num => num); // Remove zeros
            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill(0);
            // Place non-zero tiles on the left, zeros on the right
            let newRow = filteredRow.concat(zeros);
            squares[i].innerHTML = newRow[0];
            squares[i + 1].innerHTML = newRow[1];
            squares[i + 2].innerHTML = newRow[2];
            squares[i + 3].innerHTML = newRow[3];
        }
    }
}

// Shift tiles up, moving non-zero tiles to the top
function moveUp() {
    for (let i = 0; i < 4; i++) { // Process each column
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + width].innerHTML;
        let totalThree = squares[i + width * 2].innerHTML;
        let totalFour = squares[i + width * 3].innerHTML;
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
        
        let filteredColumn = column.filter(num => num); // Remove zeros
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill(0);
        // Place non-zero tiles at the top, zeros at the bottom
        let newColumn = filteredColumn.concat(zeros);
        squares[i].innerHTML = newColumn[0];
        squares[i + width].innerHTML = newColumn[1];
        squares[i + width * 2].innerHTML = newColumn[2];
        squares[i + width * 3].innerHTML = newColumn[3];
    }
}

// Shift tiles down, moving non-zero tiles to the bottom
function moveDown() {
    for (let i = 0; i < 4; i++) { // Process each column
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + width].innerHTML;
        let totalThree = squares[i + width * 2].innerHTML;
        let totalFour = squares[i + width * 3].innerHTML;
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
        
        let filteredColumn = column.filter(num => num); // Remove zeros
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill(0);
        // Place zeros at the top, non-zero tiles at the bottom
        let newColumn = zeros.concat(filteredColumn);
        squares[i].innerHTML = newColumn[0];
        squares[i + width].innerHTML = newColumn[1];
        squares[i + width * 2].innerHTML = newColumn[2];
        squares[i + width * 3].innerHTML = newColumn[3];
    }
}

// Combine adjacent equal tiles in rows, update score
function combineRow() {
    for (let i = 0; i < 15; i++) {
        if (squares[i].innerHTML === squares[i + 1].innerHTML) {
            let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
            squares[i].innerHTML = combineTotal; // Merge tiles
            squares[i + 1].innerHTML = 0; // Clear the second tile
            score += combineTotal; // Add to score
            scoreDisplay.innerHTML = score;
        }
    }
    checkForWin(); // Check for 2048 tile
}



//equal tiles in columns, update score
function combineColumn() {
    for (let i = 0; i < 12; i++) {
        if (squares[i].innerHTML === squares[i + width].innerHTML) {
            let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
            squares[i].innerHTML = combineTotal; // Merge tiles
            squares[i + width].innerHTML = 0; // Clear the second tile
            score += combineTotal; // Add to score
            scoreDisplay.innerHTML = score;
        }
    }
    checkForWin(); // Check for 2048 tile
}

// Handle arrow key inputs for movement
function control(e) {
    if (e.key === 'ArrowLeft') {
        keyLeft();
    } else if (e.key === 'ArrowRight') {
        keyRight();
    } else if (e.key === 'ArrowUp') {
        keyUp();
    } else if (e.key === 'ArrowDown') {
        keyDown();
    }
}

// Execute left movement: move, combine, move again, generate new tile
function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generate();
}

// Execute right movement: move, combine, move again, generate new tile
function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generate();
}

// Execute up movement: move, combine, move again, generate new tile
function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generate();
}

// Execute down movement: move, combine, move again, generate new tile
function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generate();
}

// Check for 2048 tile to declare a win
function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 2048) {
            resultDisplay.innerHTML = 'You Win!';
            document.removeEventListener('keydown', control); // Disable controls
            setTimeout(clear, 3000); // Clear timer after 3 seconds
        }
    }
}

// Check for loss: no empty tiles and no possible merges
function checkForLose() {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 0) {
            zeros++;
        }
    }
    let canCombine = false;
    for (let i = 0; i < squares.length; i++) {
        if (i % 4 !== 3 && squares[i].innerHTML === squares[i + 1].innerHTML && squares[i].innerHTML != 0) {
            canCombine = true; // Check horizontal merges
        }
        if (i < 12 && squares[i].innerHTML === squares[i + width].innerHTML && squares[i].innerHTML != 0) {
            canCombine = true; // Check vertical merges
        }
    }
    if (zeros === 0 && !canCombine) {
        resultDisplay.innerHTML = 'You Lose!';
        document.removeEventListener('keydown', control); // Disable controls
        document.getElementById('reset-button').style.display = 'block'; // Show reset button
        setTimeout(clear, 3000); // Clear timer after 3 seconds
    }
}

// Reset the game to start over
function resetGame() {
    squares.forEach(square => {
        square.innerHTML = 0; // Clear all tiles
    });
    score = 0; // Reset score
    scoreDisplay.innerHTML = score;
    resultDisplay.innerHTML = ''; // Clear result message
    document.getElementById('reset-button').style.display = 'none'; // Hide reset button
    document.addEventListener('keydown', control); // Re-enable controls
    generate(); // Add two new tiles
    generate();
    addColours(); // Update tile colors
}

// Stop the color update timer
function clear() {
    clearInterval(myTimer);
}

// Apply background colors based on tile values
function addColours() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 0) squares[i].style.background = '#afa192';
        else if (squares[i].innerHTML == 2) squares[i].style.background = '#eee4da';
        else if (squares[i].innerHTML == 4) squares[i].style.background = '#ede0c8';
        else if (squares[i].innerHTML == 8) squares[i].style.background = '#f2b179';
        else if (squares[i].innerHTML == 16) squares[i].style.background = '#ffcea4';
        else if (squares[i].innerHTML == 32) squares[i].style.background = '#e8c064';
        else if (squares[i].innerHTML == 64) squares[i].style.background = '#ffab6e';
        else if (squares[i].innerHTML == 128) squares[i].style.background = '#fd9982';
        else if (squares[i].innerHTML == 256) squares[i].style.background = '#ead79c';
        else if (squares[i].innerHTML == 512) squares[i].style.background = '#76daff';
        else if (squares[i].innerHTML == 1024) squares[i].style.background = '#beeaa5';
        else if (squares[i].innerHTML == 2048) squares[i].style.background = '#d7d4f0';
    }
}

// Initialize colors and set up continuous color updates
addColours();
let myTimer = setInterval(addColours, 50);

// Attach event listeners for reset button and keyboard controls
document.getElementById('reset-button').addEventListener('click', resetGame);
document.addEventListener('keydown', control);

// Start the game
createBoard();