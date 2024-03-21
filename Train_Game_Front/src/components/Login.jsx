import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useSocket } from '../SocketContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const socket = useSocket();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        socket.emit('authenticate', data);
        console.log('Connected to server via WebSocket');
        // Redirect to waiting screen after successful login
        navigate('/waiting');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }

    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-header">Log into Game</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="login-input"
              placeholder="Username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="login-input"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
