import React from 'react';

function Header({ currentPlayer }) {
  return (
    <header>
      <nav>
        <h1>Крестики-Нолики</h1>
        <ul>
          <li>Игровое поле</li>
          <li>Рейтинг</li>
          <li>Активные игроки</li>
        </ul>
      </nav>
      <p>Сейчас ходит: {currentPlayer}</p>
    </header>
  );
}

export default Header;