function Header({ currentPlayer }) 
{
    return (
    <header className="header">
        <p className="current-player">
            Ходит <span className={'player ${currentPlayer}'}>&nbsp;{currentPlayer} </span>
        </p>
    </header>
    );
}

export default Header;