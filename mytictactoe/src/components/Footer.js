import React from 'react';

function Footer({ onReset }) {
  return (
    <footer>
      <button onClick={onReset}>Сыграть ещё раз</button>
    </footer>
  );
}

export default Footer;