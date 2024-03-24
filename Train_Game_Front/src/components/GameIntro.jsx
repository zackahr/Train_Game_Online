import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GameIntro.css';

const GameIntro = () => {
    const navigate = useNavigate();

    const handlePlayButtonClick = () => {
        // Redirect the player to the game page when the play button is clicked
        // navigate('/game');
    };

    return (
        <div className="game-container">
            <div className="game-intro">
                <h2>Welcome to the Game</h2>
                <p>Here are the game rules:</p>
                <ul>
                    <li>1 - Player 1 controls the bridge </li>
                    <li>2 -	Player 2 controls the train </li>
                    <li>3 -	Player 2 has to move the train into position to be  able to move to the next level </li>
                    <li>4 -	Player 1 has to move the bridge to allow player 2 to move </li>
                    <li>5 -	Player 1 cannot advance independently; they must wait player 2 actions to proceed the next move </li>
                    <li>6 -	Player 2 cannot advance independently; they must wait player 1 actions to proceed the next move </li>
                </ul>
                <button onClick={handlePlayButtonClick}>Play</button>
            </div>
        </div>
    );
};

export default GameIntro;
