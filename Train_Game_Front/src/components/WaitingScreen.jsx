import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../SocketContext';

const WaitingScreen = () => {
    const [waitingMessage, setWaitingMessage] = useState('Waiting for another player...');
    const socket = useSocket();
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) return;

        socket.on('startGame', () => {
            navigate('/game');
        });

        socket.on('disconnect', () => {
            setWaitingMessage('The other player disconnected. Waiting for a new player...');
        });

        return () => {
            socket.off('startGame');
            socket.off('disconnect');
        };
    }, [socket, navigate]);

    return (
        <div className="waiting-screen">
            <h2>{waitingMessage}</h2>
        </div>
    );
};

export default WaitingScreen;
