import React, { useState } from 'react';

function GameBoard({ onGameOver }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('O');

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      onGameOver(winner);
    } else {
      setCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O');
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <div className="game-board">
      {board.map((value, index) => (
        <button key={index} onClick={() => handleClick(index)}>
          {value}
        </button>
      ))}
    </div>
  );
}

export default GameBoard;