import React from 'react';

function PlayerInfo({ playerOName, playerXName, playerRole }) {
  return (
    <div className="player-info-container">
      <h3 className="player-info-title">Игроки</h3>
      <div className="player-info">
        <p>
          <span className="player-symbol player-o"></span>
          {playerOName}
        </p>
        <p>
          <span className="player-symbol player-x"></span>
          {playerXName}
        </p>
        <p>
          <span className="player-role"></span>
          Ваша роль: {playerRole ? playerRole : "Назначается роль..."}
        </p>
      </div>
    </div>
  );
}

export default PlayerInfo;
