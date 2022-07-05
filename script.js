// creating a constant variable for our x and o characters.
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const workingBoard = document.getElementById('workingBoard')
const displaymessageElement = document.getElementById('display-message')
const restartButton = document.getElementById('restartButton')
const displaymessageTextElement = document.querySelector('[data-display-message-text]')
let circleTurn

initializeGame()

restartButton.addEventListener('click', initializeGame)

// Creating a function for starting the game called initializeGame().
// We set one player as false, meaning the first to play will be the other character. 
function initializeGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  hoverEffect()
  display-messageElement.classList.remove('show')
}

// Handles mouse click events for the cells in the board.
function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  attainedMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapPlayers()
    hoverEffect()
  }
}

// It is the function that ends the game. 
// The function can either display a winner message which specifies which character won or a message
// that states there is no winner it is a draw, depending on the outcome of the if statement. 
function endGame(draw){ 
  if (draw) {
    displaymessageTextElement.innerText = 'Draw!'
  } else {
    displaymessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  display-messageElement.classList.add('show')
}

// This one just returns a boolean value in case there is a draw,
// meaning that neither of the players has won.
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

// The attainedMark() places the character in the cell, currentClass being either an X or an O depending on whose turn it is. 
function attainedMark(cell, currentClass) {  
cell.classList.add(currentClass)
}
// The second function is the one which swaps the turns after the character is placed in a cell.
function swapPlayers() {
  circleTurn = !circleTurn
}

// Sets the cursor hovering effect onto the board. This will make it easier for 
// the player to aim at the cells. It also helps in creating responsiveness in the game
function hoverEffect() {
  workingBoard.classList.remove(X_CLASS)
  workingBoard.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    workingBoard.classList.add(CIRCLE_CLASS)
  } else {
    workingBoard.classList.add(X_CLASS)
  }
}
// the function checkWin() is called to check if the board matches any of the winning combinations.
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}