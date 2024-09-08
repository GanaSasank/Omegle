import React, { useState } from 'react';
import ChatWindow from './components/Chatwindow'; // Ensure the correct case for file import
import NavBar from './components/NavBar';
import NotRobotPage from './components/NotRobotPage'; // Import the CAPTCHA component
import './App.css';

function App() {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerification = () => {
    setIsVerified(true); // Mark as verified once the CAPTCHA is completed
  };

  const resetChat = () => {
    // Logic to reset the chat can be handled here if needed
  };

  return (
    <div className="App">
      {!isVerified ? (
        <NotRobotPage onVerify={handleVerification} />
      ) : (
        <>
          <NavBar />
          <div className="main-content">
            <div className="left-half">
              {/* This area is intentionally left empty */}
            </div>
            <div className="right-half">
              <ChatWindow onNewConnection={resetChat} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
