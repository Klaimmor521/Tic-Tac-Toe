import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() 
{
  const navigate = useNavigate();
  const [playerOName, setPlayerOName] = useState('');
  const [playerXName, setPlayerXName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStartClick = (e) => {
    e.preventDefault();

      // Проверяем условие, если одно поле заполнено, то второе должно быть заполнено
      if ((playerOName && !playerXName) || (!playerOName && playerXName)) 
      {
        setErrorMessage('Оба имени должны быть заполнены или оставлены пустыми!');
        return;
      }

      // Проверяем условие, если одно поле заполнено, то второе должно быть заполнено
      if ((playerOName.length > 35) || (playerXName.length > 35)) 
      {
        setErrorMessage('Имя слишком длинное!');
        return;
      }

    // Сбрасываем сообщение об ошибке
    setErrorMessage('');

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
        <div className="input-group">
          <label className="label-text" htmlFor="playerO">ФИО игрока O:</label>
          <input
            id="playerO"
            type="text"
            value={playerOName}
            onChange={(e) => setPlayerOName(e.target.value)}
            placeholder="Имя для O..."
            className="styled-input"
          />
        </div>
        <div className="input-group">
          <label className="label-text" htmlFor="playerX">ФИО игрока X:</label>
          <input
            id="playerX"
            type="text"
            value={playerXName}
            onChange={(e) => setPlayerXName(e.target.value)}
            placeholder="Имя для X..."
            className="styled-input"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="menu-footer">
          <button className="start-button">Начать игру</button>
        </div>
        <p className="tint">Чтобы поиграть с самим собой, необязательно вводить имя &#128521;</p>
      </form>
    </div>
  );
}

export default Menu;