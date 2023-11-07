import React, { useState, useEffect } from "react";

const Timer = ({ startTime, timeFrame }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Calculate the remaining time and set it as the initial time for the countdown timer
    const currentTime = new Date().getTime();
    const startTimestamp = new Date(startTime).getTime();
    const timeDifference = startTimestamp - currentTime;
    const remainingSeconds = Math.ceil(timeDifference / 1000);
    setTimeLeft(remainingSeconds);

    // Timer logic
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, [startTime]);

  return (
    <div
      style={{
        borderRadius: "5px",
        padding: "10px",
        backgroundColor: "#f0f0f0",
      }}
    >
      Time Left: {timeLeft} seconds
    </div>
  );
};

export default Timer;
