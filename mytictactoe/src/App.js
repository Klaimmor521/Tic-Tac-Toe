import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Menu from './components/Menu.js';
import './styles.css';

function App() 
{
  return (
    <Router>
      <div className="app container">
        {/* Шапка с навигацией */}
        <nav className="navigation">
          <ul className="nav-list">
            <li>
              <Link to="/game">Игровое поле</Link>
            </li>
            <li>
              <Link to="/">Меню</Link>
            </li>
          </ul>
        </nav>
        {/* Основное содержимое */}
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

  return (
    <>
    <nav className="navigation">
  <div className="logo"></div> {/* Логотип */}
  <ul className="nav-list">
    <li>
      <Link to="/game">Игровое поле</Link>
    </li>
    <li>
      <Link to="/">Меню</Link>
    </li>
  </ul>
</nav>
      {/* Компоненты текущей игры */}
      <GameBoard
        resetTrigger={reset}
        currentPlayer={currentPlayer}
        updateCurrentPlayer={setCurrentPlayer}
      />
      <Header currentPlayer={currentPlayer} />
    </>
  );
}

export default App;