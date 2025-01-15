import React from 'react';

function Footer({ onReset }) {
  return (
    <footer className="footer">
      <button className="reset" onClick={onReset}>Сыграть ещё раз</button>
    </footer>
  );
}

export default Footer;