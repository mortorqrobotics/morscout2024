import React, { useState, useEffect, useRef } from "react";

const Timer = ({ initialTime, isRunning, onStart, onStop }) => {
  const [time, setTime] = useState(initialTime);
  const intervalRef = useRef(null);

  const startTimer = () => {
    console.log("Timer started");
    onStart();
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    console.log("Timer stopped");
    clearInterval(intervalRef.current);
    intervalRef.current = null; // Reset the interval reference
    onStop(time); // Notify parent component about the stop event
  };

  const resetTimer = () => {
    console.log("Timer reset");
    clearInterval(intervalRef.current); // Clear any running interval
    intervalRef.current = null; // Reset the interval reference
    setTime(initialTime); // Reset the timer to initial time
  };

  useEffect(() => {
    if (!isRunning && intervalRef.current) {
      stopTimer(); // If timer is stopped externally, clear the interval
    } else if (isRunning && !intervalRef.current) {
      startTimer(); // If timer needs to be started and not already running
    }

    return () => {
      clearInterval(intervalRef.current); // Cleanup interval on unmount
    };
  }, [isRunning]);

  return (
    <div>
      <div>Time: {time} seconds</div>
      <div>
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
