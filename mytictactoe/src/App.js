import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Menu from './components/Menu.js';
import './styles.css';
import PlayerInfo from './components/PlayerInfo.js';
import Navigation from './components/Navigator.js';

function App() 
{
  return (
    <Router>
      <div className="app container">
      <Navigation />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

function Game() 
{
  const [currentPlayer, setCurrentPlayer] = React.useState('O'); // Текущий игрок
  const [reset] = React.useState(false); // Переключатель для сброса игры
  const [playerRole, setPlayerRole] = React.useState(null); // Роль игрока

  // Забираем имена игроков из localStorage
  const playerOName = localStorage.getItem('playerO') || 'Игрок O';
  const playerXName = localStorage.getItem('playerX') || 'Игрок X';
  const currentPlayerName = currentPlayer === 'O' ? playerOName : playerXName;

  return (
    <>
      <PlayerInfo playerOName={playerOName} playerXName={playerXName } playerRole={playerRole} />
      <GameBoard
        resetTrigger={reset}
        currentPlayer={currentPlayer}
        updateCurrentPlayer={setCurrentPlayer}
        updatePlayerRole={setPlayerRole} // Передаём функцию для обновления роли
      />
      <Header currentPlayer={currentPlayer} currentPlayerName={currentPlayerName} />
    </>
  );
}

export default App;
