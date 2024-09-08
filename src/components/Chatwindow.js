import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const ws = useRef(null);

  const connectToStranger = () => {
    setLoading(true);
    setIsConnected(false);

    if (ws.current) {
      ws.current.close();
    }

    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onopen = () => {
      setLoading(true);
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'match') {
        setIsConnected(true);
        setLoading(false);
        setMessages([{ text: 'Stranger found. You can now chat!', fromUser: false }]);
      } else if (message.type === 'chat') {
        setMessages((prevMessages) => [...prevMessages, { text: message.text, fromUser: false }]);
      } else if (message.type === 'disconnect') {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `${message.who} has disconnected the conversation.`, fromUser: false },
        ]);
        setIsConnected(false);
      }
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      setLoading(false);
    };

    ws.current.onerror = (err) => {
      console.error('WebSocket error:', err);
      setLoading(false);
    };
  };

  const handleNewConnection = () => {
    if (isConnected) {
      const confirmed = window.confirm('Are you sure you want to disconnect and search for a new stranger?');
      if (confirmed) {
        ws.current.send(JSON.stringify({ type: 'disconnect', who: 'User' }));
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'You have disconnected. Click "New" to search for another stranger.', fromUser: true },
        ]);
        ws.current.close();
        setIsConnected(false);
      }
    } else {
      setMessages([]);
      connectToStranger();
    }
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        handleNewConnection();
      }
    };

    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [handleNewConnection]);

  useEffect(() => {
    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() !== '' && isConnected) {
      const message = { type: 'chat', text: input, fromUser: true };
      setMessages([...messages, message]);
      ws.current.send(JSON.stringify(message));
      setInput('');
    }
  };

  return (
    <div className="chat-window">
      {loading && <div className="loading-screen">Connecting to a stranger...</div>}
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message-container">
            <div className="message-sender">
              {msg.fromUser ? 'User' : 'Stranger'}:
            </div>
            <div className={msg.fromUser ? 'message user' : 'message stranger'}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <form className="input-area" onSubmit={sendMessage}>
        <button
          type="button"
          className="new-btn"
          onClick={handleNewConnection}
          disabled={loading}
        >
          {isConnected ? 'Disconnect & Search New' : 'New'}
        </button>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!isConnected || loading}
        />
        <button type="submit" className="send-btn" disabled={!isConnected || loading}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
