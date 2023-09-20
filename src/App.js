import React, { useState } from 'react';
import './App.css';
import UserRegistrationForm from './Components/UserRegistrationForm';
import GreenLightRedLight from './Components/GreenLightRedLight';

function App() {
  const [gameDifficulty, setGameDifficulty] = useState(null);
  const [isGameWon, setIsGameWon] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleGameStart = (difficulty, user) => {
    setGameDifficulty(difficulty);
    setIsGameWon(false)
    setUserData(user);
  };


  const handleGameEnd = (gameResult) => {
  
    setIsGameWon(gameResult.score > 0); // Check if the score is greater than 0
   
  };
  

  return (
    <div className="App">
      <h1 className='main-heading'><span className='green-color'>GreenLight</span><span className='red-color'>RedLight</span>Game</h1>
      {!gameDifficulty ? (
        <UserRegistrationForm onStartGame={handleGameStart} />
      ) : (
        <GreenLightRedLight difficulty={gameDifficulty} onGameEnd={handleGameEnd} user={userData}/>
      )}
      {isGameWon && <p></p>}
    </div>
    
  );
}

export default App;