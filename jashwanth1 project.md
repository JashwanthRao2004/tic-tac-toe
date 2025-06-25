# Tic Tac Toe Combined Project

This project contains both the frontend React app and the backend Node.js server for the Tic Tac Toe game.

## Folder Structure

- `server/` - Node.js backend server with Express
- `src/` - React frontend app source code

## Setup and Run

### Backend

1. Navigate to the server folder:
   ```
   cd tic-tac-toe-combined/server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the backend server:
   ```
   npm start
   ```
   The backend server will run on http://localhost:5000

### Frontend

1. Navigate to the root folder (tic-tac-toe-combined)
2. Install dependencies (if not already installed):
   ```
   npm install
   ```
3. Start the React app:
   ```
   npm start
   ```
   The frontend will run on http://localhost:3000

## Usage

Open http://localhost:3000 in your browser to play the Tic Tac Toe game. The frontend communicates with the backend server to manage game state.

## Notes

- Ensure the backend server is running before starting the frontend app.
- The backend server handles game logic and state management.
- The frontend provides the game UI and user interaction.

Enjoy playing Tic Tac Toe!
