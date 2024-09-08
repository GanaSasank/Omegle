import React, { useState } from 'react';
import './NotRobotPage.css'; // Add custom styles for the CAPTCHA page

function NotRobotPage({ onVerify }) {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    setIsVerified(true);
    onVerify(); // Notify parent that user has verified the CAPTCHA
  };

  return (
    <div className="not-robot-page">
      <h2>Please verify that you are not a robot</h2>
      <div className="captcha-container">
        <input
          type="checkbox"
          id="robotCheck"
          checked={isVerified}
          onChange={handleVerify}
        />
        <label htmlFor="robotCheck">I'm not a robot</label>
      </div>
    </div>
  );
}

export default NotRobotPage;
