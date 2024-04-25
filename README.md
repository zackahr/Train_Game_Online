# Train_Game_Online
Create Game Online Using ReactJs and NestJS with the help of socket.io.

# Train Game

Welcome to the Train Game project! This repository contains both the backend and frontend code for the Train Game application.
This project utilizes a combination of technologies to create an interactive multiplayer game experience.

## Frontend
- **React.js**: Used for building the user interface and handling client-side interactions.
  
## Backend
- **NestJS**: Employed as the backend framework for building scalable and efficient server-side applications.
- **Socket.IO**: Implemented to facilitate real-time bidirectional communication between players, enabling matchmaking and gameplay synchronization.

## Overview
In this project, players are seamlessly connected through the integration of React.js for the frontend and NestJS for the backend. The Socket.IO library is leveraged to establish robust connections between players, facilitating real-time communication essential for matchmaking and gameplay synchronization.

### Matchmaking System
Players are placed in a queue upon entering the game, awaiting the arrival of another player. Once a sufficient number of players are queued, the matchmaking system pairs them together, establishing a connection for an immersive gaming experience.

### Gameplay
Upon successful matchmaking, players engage in gameplay where their actions are instantly relayed to each other through Socket.IO, ensuring a synchronized and seamless gaming experience. As players progress through the game, their scores and game state are efficiently managed by the NestJS backend, providing a smooth and responsive gaming environment.

## Prerequisites

Before running the code, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Setup

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/zackahr/Train_Game.git
    ```

2. Navigate to the backend folder:

    ```bash
    cd Train_Game_Back
    ```

3. Install backend dependencies:

    ```bash
    npm install
    ```

4. Start the backend server:

    ```bash
    npm run start:dev
    ```

5. Open a new terminal window/tab.

6. Navigate to the frontend folder:

    ```bash
    cd ../Train_Game_Front
    ```

7. Install frontend dependencies:

    ```bash
    npm install
    ```

8. Start the frontend development server:

    ```bash
    npm run dev
    ```

## Usage

You can access the Train Game application at [http://localhost:5173/login](http://localhost:5173/login).

### Login Page

![Login Page](https://github.com/zackahr/Train_Game_Online/assets/138884943/53260413-383e-4806-8a31-c4367fce9a66)

The application includes a login page where you can access the main features. Please note that this login page is for demonstration purposes only and has predefined fake user credentials:

- **User 1:**
  - Username: zakariae
  - Password: 123

- **User 2:**
  - Username: aymane
  - Password: 123

- **User 3:**
  - Username: hossame
  - Password: 123

- **User 4:**
  - Username: amine
  - Password: 123

Once logged in with one of the above user credentials, you will be able to explore the application.

### Home Page

![Home Page](https://github.com/zackahr/Train_Game_Online/assets/138884943/5f01a7cd-3f17-492d-9154-07c3ff4b79e0)

The home page features three buttons for navigating the application and on top of them there's game rule description:

1. **Play**: Start playing the Train Game.
2. **Player Profile**: Access your player profile.
3. **Log Out**: Log out of the Train Game application.

### Game Page

![Game Page](https://github.com/zackahr/Train_Game_Online/assets/138884943/c2918e81-0b30-4ee0-807f-3f7822fb5f08)

In the game page:
- If you are Player 1, you will be responsible for moving the train using the right arrow (➡️) icon.
- If you are Player 2, you will be responsible for adding the bridge that are not missed using the up arrow (⬆️) icon.

### Player Profile Page

![Player Profile Page](https://github.com/zackahr/Train_Game_Online/assets/138884943/013403fb-b43c-4cb2-8a31-683ccfce169e)

In the Player Profile Page

This page has player info like win, lose and score

## Troubleshooting

- If you encounter any issues during setup or while running the application, please make sure you have followed all the steps correctly and that your system meets the prerequisites mentioned above.

- For further assistance, feel free to open an issue on this repository.

Enjoy The Game!
