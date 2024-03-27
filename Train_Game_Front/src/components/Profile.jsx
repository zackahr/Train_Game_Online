import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const [playerData, setPlayerData] = useState(null);
    let userDetails = JSON.parse(localStorage.getItem('auth-user'));

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/${userDetails.id}`);
            if (response.ok) {
                const data = await response.json();
                setPlayerData(data);
            } else {
                console.error('Failed to fetch user data:', response.statusText);
                const errorText = await response.text();
                console.error('Error response:', errorText);
            }
        } catch (error) {
            console.error('Error occurred while fetching user data:', error);
        }
    };

    if (!playerData) {
        return <div>Loading...</div>;
    }

    const { username, score, win, lose, userImg } = playerData;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-picture">
                    <img src={userImg} alt="Profile" />
                </div>
                <div className="profile-info">
                    <h2>{username}</h2>
                    <p>S: {score}</p>
                    <p>W: {win}</p>
                    <p>L: {lose}</p>
                    <button className='home-button' onClick={() => window.location.href = '/home'}>Home</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
