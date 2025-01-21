import React from 'react';

function PlayerInfo({ playerOName, playerXName }) {
  return (
    <div className="player-info-container">
      <div className="player-info">
        <p>
          <span className="player-symbol player-o">O</span>
          <strong>{playerOName}</strong>
        </p>
        <p>
          <span className="player-symbol player-x">X</span>
          <strong>{playerXName}</strong>
        </p>
      </div>
    </div>
  );
}

export default PlayerInfo;
