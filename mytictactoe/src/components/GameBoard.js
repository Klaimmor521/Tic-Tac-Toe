import React, { useState, useEffect } from 'react';
import WinnerModal from './WinnerModal';
import Timer from './Timer';

function GameBoard({ resetTrigger, currentPlayer, updateCurrentPlayer }) 
{
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningLine, setWinningLine] = useState([]);

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const calculatedWinner = calculateWinner(newBoard);
    if (calculatedWinner) {
      setWinner(calculatedWinner.player);
      setWinningLine(calculatedWinner.line);
      setIsGameOver(true); // Завершение игры
    } else if (newBoard.every((cell) => cell !== null)) {
      setIsDraw(true);
      setIsGameOver(true); // Завершение игры
    } else {
      updateCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O');
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { player: squares[a], line };
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null)); // Сбрасываем игровое поле
    setWinner(null); // Сбрасываем победителя
    setIsGameOver(false); // Сбрасываем состояние завершения игры
    setIsDraw(false); // Сбрасываем ничью
    setWinningLine([]); // Сбрасываем победную линию
    updateCurrentPlayer('O'); // Устанавливаем первого игрока
  };

  useEffect(() => {
    resetGame(); // Сброс при срабатывании внешнего триггера
  }, [resetTrigger]);

  return (
    <>
      {/* Таймер */}
      <Timer reset={resetTrigger} isGameOver={isGameOver} />

      {/* Игровое поле */}
      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            className={`cell ${
              winningLine.includes(index) ? (value === 'X' ? 'winning-x' : 'winning-o') : ''
            } ${value === 'O' ? 'circle' : value === 'X' ? 'cross' : ''}`}
            onClick={() => handleClick(index)}
          >
            { }
          </button>
        ))}
      </div>
      {/* Модальное окно при завершении игры */}
      <WinnerModal
        winner={winner}
        isDraw={isDraw}
        onClose={() => {
          setWinner(null);
          setIsDraw(false);
        }}
        onNewGame={resetGame}
      />
    </>
  );
}

export default GameBoard;