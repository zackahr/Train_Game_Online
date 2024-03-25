import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../SocketContext';
import './WaitingScreen.css';
const WaitingScreen = () => {
    const [waitingMessage, setWaitingMessage] = useState('Waiting for another player...');
    const socket = useSocket();
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) return;

        socket.on('startGame', () => {
            navigate('/game');
        });

        return () => {
            socket.off('startGame');
        };
    }, [socket, navigate]);

    return (
        <div className="waiting-screen">
            <h2 className="waiting-message">{waitingMessage}</h2>
            <div className="spinner"></div>
        </div>
    );
};

export default WaitingScreen;
