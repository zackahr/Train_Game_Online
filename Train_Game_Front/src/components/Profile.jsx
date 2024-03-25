import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const [playerData, setPlayerData] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/'); // Replace '1' with the actual user ID
            if (response.ok) {
                const data = await response.json();
                console.log('User data:', data);
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

    const { username, score, win, lose} = playerData;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-picture">
                    <img src='https://cdn.vox-cdn.com/thumbor/Kf8TBWwGCKnzuXDyPjDBgGb27cw=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22519775/1318352350.jpg' alt="Profile" />
                </div>
                <div className="profile-info">
                    <h2>{username}</h2>
                    <p>Score: {score}</p>
                    <p>Wins: {win}</p>
                    <p>Losses: {lose}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
