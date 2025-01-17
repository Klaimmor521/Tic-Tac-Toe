import React, { useState, useEffect } from 'react';

function Timer({ reset, isGameOver }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (isGameOver) {
      setTime(0); // Сбрасываем таймер при завершении игры
      return; // Не запускаем интервал
    }

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Очищаем интервал
  }, [isGameOver]);

  useEffect(() => {
    if (reset) {
      setTime(0); // Сбрасываем таймер при сбросе игры
    }
  }, [reset]);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return <p className="timer">{formatTime(time)}</p>;
}

export default Timer;
