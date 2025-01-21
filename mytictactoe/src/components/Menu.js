import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() 
{
  const navigate = useNavigate();
  const [playerOName, setPlayerOName] = useState('');
  const [playerXName, setPlayerXName] = useState('');

  const handleStartClick = (e) => {
    e.preventDefault();

    // Сохраняем имена игроков в localStorage
    localStorage.setItem('playerO', playerOName);
    localStorage.setItem('playerX', playerXName);

    // Переходим на игровую страницу
    navigate('/game');
  };

  return (
    <div className="menu">
      <h1 className="menu-title">Добро пожаловать!</h1>
      <form className="player-form" onSubmit={handleStartClick}>
    <label>
    ФИО игрока O:
    <input
      type="text"
      value={playerOName}
      onChange={(e) => setPlayerOName(e.target.value)}
      placeholder="Имя O"
      className="styled-input"
    />
  </label>
  <label>
    ФИО игрока X:
    <input
      type="text"
      value={playerXName}
      onChange={(e) => setPlayerXName(e.target.value)}
      placeholder="Имя X"
      className="styled-input"
    />
  </label>
  <div className="menu-footer">
    <button className="start-button">Начать игру</button>
  </div>
  <p className="tint">Чтобы поиграть с самим собой, необязательно вводить имя</p>
</form>
    </div>
  );
}

export default Menu;