import React, { useState, useEffect } from 'react';

const GreenLightRedLight = ({ difficulty, onGameEnd, user }) => {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [boxColor, setBoxColor] = useState('red');

  const n = difficulty === 'Easy' ? 10 : difficulty === 'Medium' ? 15 : 25;
  const y = 41; // seconds
  const target = difficulty === 'Easy' ? 10 : difficulty === 'Medium' ? 15 : 25;

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimer(0);
    setBoxColor('red');

    // Start changing box color after 1-2 seconds
    const randomizeBoxColor = () => {
      setBoxColor((prevColor) => (prevColor === 'green' ? 'red' : 'green'));
    };
  
    // Start changing box color after 1-2 seconds
    const colorChangeInterval = setInterval(randomizeBoxColor, Math.floor(Math.random() * 1000) + 1000);

    // End the game after y seconds
    setTimeout(() => {
      clearInterval(colorChangeInterval);
      setIsGameOver(true);
      if (score === n) {
       
        onGameEnd(true); // Notify parent component of game end with a win
      } else {
        onGameEnd(false); // Notify parent component of game end without a win
      }
    }, y * 1000);
  };

  const [isGameOver, setIsGameOver] = useState(false);

  const handleBoxClick = () => {
    if (gameStarted) {
      if (boxColor === 'green') {
        setScore(score + 1);
        setBoxColor('red'); // Change color after a successful click

        if (score + 1 === n) {
          setIsGameOver(true);
          onGameEnd(true); // Notify parent component of game end with a win
        }
      } else {
        setIsGameOver(true);
        onGameEnd(false); // Notify parent component of game end without a win
      }
    }
  };

  useEffect(() => {
    if (gameStarted && !isGameOver) {
      const gameInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      return () => {
        clearInterval(gameInterval);
      };
    }
  }, [gameStarted, isGameOver]);

  return (
    <div style={styles.container}>
      {isGameOver ? (
        <div style={styles.gameOver}>
          {score === n ? <h2 style={styles.winText}>Congratulations! You won the game!</h2> : <h2 style={styles.gameOverText}><img src="https://i.ibb.co/ZSDGdkK/download.jpg" style={styles.sadImage} alt='sadImage'/> Game Over!!!</h2>}
          <p style={styles.score}>Your Score: {score}</p>
        </div>
      ) : (
        <>
          {user && (
            <div style={styles.registration}>
              <h2 style={styles.welcomeText}>Welcome, {user.name}!</h2>
            </div>
          )}
          {gameStarted && (
            <div style={{ ...styles.game, backgroundColor: boxColor }} onClick={handleBoxClick}>
              <div style={styles.box}></div>
            </div>
          )}
          <div style={styles.gameInfo}>
            <p>Time: {timer} seconds</p>
            <p>Target: {target}</p>
            <p>Score: {score}</p>
          </div>
          {!gameStarted && (
            <div style={styles.registration}>
              <button style={styles.startButton} onClick={startGame}>Start Game</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  welcomeText: {
    fontSize: '20px',
  },
  startButton: {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
  },
  score: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  game: {
    width: '200px',
    height: '200px',
    margin: '20px auto',
    cursor: 'pointer',
  },
  box: {
    width: '100%',
    height: '100%',
  },
  gameOver: {
    margin: '20px',
  },
  winText: {
    color: 'green',
  },
  sadImage:{
    height:'20px',
    marinRight:'10px'
  },
  gameOverText: {
    color: 'red',
  },
  gameInfo: {
    fontSize: '18px',
    marginTop: '20px',
  },
};

export default GreenLightRedLight;