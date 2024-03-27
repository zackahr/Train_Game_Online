let userDetails = JSON.parse(localStorage.getItem('auth-user'));

export const sendWinPostRequest = async () => {
    try {
        const response = await fetch(`http://localhost:3000/user/win/${userDetails.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error('Failed to send win request');
        }
    } catch (error) {
        console.error('Error sending win request:', error);
    }
};

export const sendLosePostRequest = async () => {
    try {
        const response = await fetch(`http://localhost:3000/user/lose/${userDetails.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error('Failed to send lose request');
        }
    } catch (error) {
        console.error('Error sending lose request:', error);
    }
};
