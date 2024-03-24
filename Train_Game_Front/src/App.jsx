import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './SocketContext';
import Sketch from './components/Sketch';
import Login from './components/Login';
import WaitingScreen from './components/WaitingScreen';
import Profile from './components/Profile';
import GameIntro from './components/GameIntro';

function App() {
  return (
    <Router>
      <SocketProvider>
        <div className="App">
          <Routes>
            <Route path="/waiting" element={<WaitingScreen />} />
            <Route path="/game" element={<Sketch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<GameIntro />} />
          </Routes>
        </div>
      </SocketProvider>
    </Router>
  );
}

export default App;
