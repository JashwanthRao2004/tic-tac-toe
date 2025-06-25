import React, { useState, useEffect } from 'react';
import './App.css';

const backendUrl = 'http://localhost:5000';

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ board, onSquareClick }) {
  return (
    <div>
      <div className="board-row">
        <Square value={board[0]} onClick={() => onSquareClick(0)} />
        <Square value={board[1]} onClick={() => onSquareClick(1)} />
        <Square value={board[2]} onClick={() => onSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={board[3]} onClick={() => onSquareClick(3)} />
        <Square value={board[4]} onClick={() => onSquareClick(4)} />
        <Square value={board[5]} onClick={() => onSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={board[6]} onClick={() => onSquareClick(6)} />
        <Square value={board[7]} onClick={() => onSquareClick(7)} />
        <Square value={board[8]} onClick={() => onSquareClick(8)} />
      </div>
    </div>
  );
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [error, setError] = useState(null);

  const fetchGameState = async () => {
    try {
      const response = await fetch(`${backendUrl}/game`);
      const data = await response.json();
      setBoard(data.board);
      setCurrentPlayer(data.currentPlayer);
      setWinner(data.winner);
      setIsDraw(data.isDraw);
      setError(null);
    } catch (err) {
      setError('Failed to fetch game state');
    }
  };

  useEffect(() => {
    fetchGameState();
  }, []);

  const handleSquareClick = async (index) => {
    if (winner || isDraw || board[index]) {
      return;
    }
    try {
      const response = await fetch(`${backendUrl}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Invalid move');
        return;
      }
      const data = await response.json();
      setBoard(data.board);
      setCurrentPlayer(data.currentPlayer);
      setWinner(data.winner);
      setIsDraw(data.isDraw);
      setError(null);
    } catch (err) {
      setError('Failed to make a move');
    }
  };

  const handleReset = async () => {
    try {
      const response = await fetch(`${backendUrl}/reset`, {
        method: 'POST',
      });
      const data = await response.json();
      setBoard(data.board);
      setCurrentPlayer(data.currentPlayer);
      setWinner(data.winner);
      setIsDraw(data.isDraw);
      setError(null);
    } catch (err) {
      setError('Failed to reset game');
    }
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${currentPlayer}`;
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <Board board={board} onSquareClick={handleSquareClick} />
      <div className="status">{status}</div>
      {error && <div className="error">{error}</div>}
      <button className="reset-button" onClick={handleReset}>Reset Game</button>
    </div>
  );
}

export default App;
