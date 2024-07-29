import { useState, useEffect } from 'react';

export default function Timer({ startTime, endTime }) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (startTime && !endTime) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  useEffect(() => {
    if (endTime) {
      setElapsedTime(Math.floor((new Date(endTime) - new Date(startTime)) / 1000));
    }
  }, [endTime]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-xl font-semibold">
      {formatTime(elapsedTime)}
    </div>
  );
}
