import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Navigation() 
{
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="logo"></div> {/* Логотип */}
      <ul className="nav-list">
        <li className={location.pathname === '/game' ? 'active' : ''}>
          Игровое поле
        </li>
        <li className={location.pathname === '/' ? 'active' : ''}>
          Меню
        </li>
      </ul>
      <ExitToMenuButton />
    </nav>
  );
}

// Кнопка "Выход в меню"
function ExitToMenuButton() 
{
  const navigate = useNavigate();
  
  return (
    <button onClick={() => navigate('/')} className="exitgame"></button>
  );
}

export default Navigation;