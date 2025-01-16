import React from "react";

function WinnerModal({ winner, isDraw, onClose, onNewGame }) 
{
  if (!winner && !isDraw) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {isDraw ? (
          <h2>Ничья!</h2>
        ) : (
          <>
            <img alt = "" className="modal-trophy"/>
            <h2>{winner} победил!</h2>
          </>
        )}
        <div className="modal-buttons">
          <button onClick={onNewGame} className="modal-new-game">Новая игра</button>
          <button onClick={onClose} className="modal-exit">Выйти в меню</button>
        </div>
      </div>
    </div>
  );
}

export default WinnerModal;