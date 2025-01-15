import React, { useState, useEffect } from 'react';

function Timer({ reset }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTime(0);
  }, [reset]);

  return <p className="timer">Таймер: {time} сек</p>;
}

export default Timer;