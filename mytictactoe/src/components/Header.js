function Header({ currentPlayer, currentPlayerName }) 
{
    return (
      <header className="header">
        <p className="current-player">
          Ходит&nbsp;<span className={`player ${currentPlayer}`}>{currentPlayerName} ({currentPlayer})</span>
        </p>
      </header>
    );
  }
  
export default Header;