import React from "react";
import { useNavigate } from 'react-router-dom';

function WinnerModal({ winner, isDraw, onNewGame }) 
{
  const navigate = useNavigate();
  if (!winner && !isDraw) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {isDraw ? (
          <h2>Ничья!</h2>
        ) : (
          <>
            <div className="modal-trophy"/>
            <h2>{winner} победил!</h2>
          </>
        )}
        <div className="modal-buttons">
          <button onClick={onNewGame} className="modal-new-game">Сыграть ещё раз</button>
          <button onClick={() => navigate('/')} className="modal-exit">Выйти в меню</button>
        </div>
      </div>
    </div>
  );
}

export default WinnerModal;