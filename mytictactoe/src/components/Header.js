import littleO from "../assets/littleO.svg";
import littleX from "../assets/littleX.svg";

function Header({ currentPlayer, currentPlayerName }) {
  const symbol = currentPlayer === 'O' ? littleO : littleX;

  return (
    <header className="header">
      <p className="current-player">
        Ходит&nbsp;
        <span className="player-container">
          <img
            src={symbol}
            alt={currentPlayer}
            className="player-symbol-img"
          />
          <span className="player-name">{currentPlayerName}</span>
        </span>
      </p>
    </header>
  );
}
export default Header;