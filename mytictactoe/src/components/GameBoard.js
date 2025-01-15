import React, { useState, useEffect } from 'react';

function GameBoard({ onGameOver, resetTrigger, currentPlayer, updateCurrentPlayer }) {
  const [board, setBoard] = useState(Array(9).fill(null));

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      onGameOver(winner);
    } else {
      updateCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O');
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

  useEffect(() => {
    setBoard(Array(9).fill(null));
  }, [resetTrigger]);

  return (
    <div className="board">
      {board.map((value, index) => (
        <button 
          key={index} 
          className={`cell ${value === 'O' ? 'circle' : value === 'X' ? 'cross' : ''}`} 
          onClick={() => handleClick(index)}
        >
          {/* Убираем текст и `<img>` для кнопок */}
        </button>
      ))}
    </div>
  );
}

export default GameBoard;
