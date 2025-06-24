const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let cells = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
  board.innerHTML = '';
  cells.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  });
}

function handleClick(event) {
  const index = event.target.dataset.index;

  if (!gameActive || cells[index] !== "") return;

  cells[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    status.textContent = Player ${currentPlayer} Wins! 🎉;
    gameActive = false;
  } else if (!cells.includes("")) {
    status.textContent = "It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = Player ${currentPlayer}'s turn;
  }
}

function checkWinner() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],  // Rows
    [0,3,6], [1,4,7], [2,5,8],  // Columns
    [0,4,8], [2,4,6]            // Diagonals
  ];

  return winConditions.some(condition => {
    return condition.every(index => cells[index] === currentPlayer);
  });
}

resetBtn.addEventListener('click', () => {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = Player ${currentPlayer}'s turn;
  createBoard();
});

createBoard();