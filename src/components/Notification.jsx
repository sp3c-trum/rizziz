import React, { useEffect, useState } from "react";

const Notification = ({ message, setMessage, type = "success", duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setMessage(""), 500);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, setMessage]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] max-w-lg p-4 text-white rounded-lg shadow-lg text-center transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-full opacity-0 scale-90"
      } ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
    >
      {message}
    </div>
  );
};

export default Notification;
