import React, { useState, useEffect } from 'react';
import './NavBar.css';

function NavBar() {
  const [onlineCount, setOnlineCount] = useState(1);

  useEffect(() => {
    // Simulating the number of people online. In a real application, this would come from a server or WebSocket.
    const interval = setInterval(() => {
      // Update the count randomly (this is just for simulation purposes)
      setOnlineCount(Math.floor(Math.random() * 1000 + 1));
    }, 0.2 * 60 * 1000); // Updates every 20 minutes (20 * 60 * 1000 ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-left">
        {/* Making "OmegleSq" a clickable entity */}
        <a href="/" className="navbar-brand">
          OmegleSq
        </a>
      </div>
      <div className="navbar-right">
        <p>{onlineCount}+ people online</p>
      </div>
    </div>
  );
}

export default NavBar;
