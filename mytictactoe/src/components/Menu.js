import React from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() 
{
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/game'); // Переход на страницу "Игровое поле"
  };

  return (
    <div className="menu">
      <h1 className="menu-title">Добро пожаловать!</h1>
      <div className="menu-footer">
        <button className="start-button" onClick={handleStartClick}> Начать игру </button>
      </div>
    </div>
  );
}

export default Menu;