import React, { useState } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Timer from './components/Timer';
import Footer from './components/Footer';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState('O');
  const [reset, setReset] = useState(false);

  const handleGameOver = (winner) => {
    alert(`Победитель: ${winner}`);
    setReset((prev) => !prev);
  };

  return (
    <div className="app">
      <Header currentPlayer={currentPlayer} />
      <Timer reset={reset} />
      <GameBoard onGameOver={handleGameOver} />
      <Footer onReset={() => setReset((prev) => !prev)} />
    </div>
  );
}

export default App;