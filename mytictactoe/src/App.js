import React, { useState } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Timer from './components/Timer';
import Footer from './components/Footer';
import './styles.css';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState('O');
  const [reset, setReset] = useState(false);

  const handleGameOver = (winner) => {
    alert(`Победитель: ${winner}`);
    setReset((prev) => !prev);
  };

  const handleReset = () => {
    setReset((prev) => !prev);
    setCurrentPlayer('O');
  };

  return (
    <div className="app container">
      <Header currentPlayer={currentPlayer} />
      <Timer reset={reset} />
      <GameBoard
        onGameOver={handleGameOver}
        resetTrigger={reset}
        currentPlayer={currentPlayer}
        updateCurrentPlayer={setCurrentPlayer}
      />
      <Footer onReset={handleReset} />
    </div>
  );
}

export default App;