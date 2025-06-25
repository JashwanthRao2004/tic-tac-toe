const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let gameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  isDraw: false,
};

function checkWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }
  return null;
}

function checkDraw(board) {
  return board.every(cell => cell !== null);
}

app.get('/game', (req, res) => {
  res.json(gameState);
});

app.post('/move', (req, res) => {
  const { index } = req.body;
  if (
    index < 0 ||
    index > 8 ||
    gameState.board[index] !== null ||
    gameState.winner
  ) {
    return res.status(400).json({ error: 'Invalid move' });
  }

  gameState.board[index] = gameState.currentPlayer;
  const winner = checkWinner(gameState.board);
  if (winner) {
    gameState.winner = winner;
  } else if (checkDraw(gameState.board)) {
    gameState.isDraw = true;
  } else {
    gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
  }

  res.json(gameState);
});

app.post('/reset', (req, res) => {
  gameState = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
  };
  res.json(gameState);
});

app.listen(port, () => {
  console.log(`Tic Tac Toe backend listening at http://localhost:${port}`);
});
