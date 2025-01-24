import React, { useState, useEffect } from 'react';
import WinnerModal from './WinnerModal';
import Timer from './Timer';

function GameBoard({ resetTrigger, currentPlayer, updateCurrentPlayer }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningLine, setWinningLine] = useState([]);
  const [ws, setWs] = useState(null);
  const [playerRole, setPlayerRole] = useState(null);

  const playerOName = localStorage.getItem('playerO') || 'Игрок O';
  const playerXName = localStorage.getItem('playerX') || 'Игрок X';
  const winnerName = winner === 'O' ? playerOName : winner === 'X' ? playerXName : null;

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('WebSocket подключен');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'role') {
        console.log(`Вам назначена роль: ${data.role}`);
        setPlayerRole(data.role);
      } else if (data.type === 'move') {
        handleIncomingMove(data);
      } else if (data.type === 'currentPlayer') {
        updateCurrentPlayer(data.currentPlayer);
      }
    };

    socket.onerror = (error) => {
      console.error('Ошибка WebSocket:', error);
    };

    socket.onclose = () => {
      console.warn('WebSocket отключён');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [updateCurrentPlayer]);

  const handleIncomingMove = (data) => {
    const { cellIndex, symbol, nextPlayer } = data;

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[cellIndex] = symbol;
      return newBoard;
    });

    // Обновляем текущего игрока
    if (nextPlayer) 
    {
      updateCurrentPlayer(nextPlayer);
    }

    setBoard((newBoard) => {
      const calculatedWinner = calculateWinner(newBoard);
      if (calculatedWinner) {
        setWinner(calculatedWinner.player);
        setWinningLine(calculatedWinner.line);
        setIsGameOver(true);
      } else if (newBoard.every((cell) => cell !== null)) {
        setIsDraw(true);
        setIsGameOver(true);
      }
      return newBoard;
    });
  };

  const sendMove = (cellIndex) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'move', cellIndex, symbol: playerRole }));
    }
  };

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;

    if (playerRole !== currentPlayer) {
      console.log(`Сейчас ходит другой игрок: ${currentPlayer}`);
      return;
    }

    sendMove(index);
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
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsGameOver(false);
    setIsDraw(false);
    setWinningLine([]);
    updateCurrentPlayer('O');
  };

  useEffect(() => {
    resetGame();
  }, [resetTrigger]);

  return (
    <>
      <Timer reset={resetTrigger} isGameOver={isGameOver} />
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
      <WinnerModal
        winner={winnerName}
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
