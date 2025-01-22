import React from 'react';

function PlayerInfo({ playerOName, playerXName }) {
  return (
    <div className="player-info-container">
      <h3 className="player-info-title">Игроки</h3>
      <div className="player-info">
        <p>
          <span className="player-symbol player-o"></span>
          <strong>{playerOName}</strong>
        </p>
        <p>
          <span className="player-symbol player-x"></span>
          <strong>{playerXName}</strong>
        </p>
      </div>
    </div>
  );
}

export default PlayerInfo;
