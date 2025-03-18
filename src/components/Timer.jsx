import React, { useState, useEffect } from "react";

const Timer = ({ initialTime, onTimeUp }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time <= 0) {
      onTimeUp();
      return;
    }
    const timer = setInterval(() => setTime(time - 1), 1000);
    return () => clearInterval(timer);
  }, [time, onTimeUp]);

  return <div class="mb-3">Pozostały czas: {time}s</div>;
};

export default Timer;