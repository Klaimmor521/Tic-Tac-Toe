function Header({ currentPlayer }) 
{
    return (
        <header className="header">
            <nav>
                <h1 className="title">Крестики-Нолики</h1>
                <ul>
                    <li>Игровое поле</li>
                </ul>
            </nav>
            <p className="current-player">
                Ходит <span className={` player ${currentPlayer}`}>{currentPlayer}</span>
            </p>
        </header>
    );
}

export default Header;