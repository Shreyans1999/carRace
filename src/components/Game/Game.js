// src/components/Game/Game.js
import React, { useState, useEffect } from 'react';
import Scene from './Scene';
import FallingObjects from './FallingObjects'; // Import the FallingObjects component
import { supabase } from '../../lib/supabaseClient';

const Game = () => {
  const [score, setScore] = useState(0);

  // Function to save score to Supabase
  const saveScore = async (score) => {
    const { data, error } = await supabase
      .from('scores')
      .insert([{ score, timestamp: new Date().toISOString() }]);

    if (error) {
      console.error('Error saving score:', error);
    } else {
      console.log('Score saved:', data);
    }
  };

  // Increment score based on survival time or objects avoided
  useEffect(() => {
    const interval = setInterval(() => setScore(prev => prev + 1), 1000); // Increase score every second
    return () => clearInterval(interval);
  }, []);

  const handleGameEnd = () => {
    saveScore(score);
    alert(`Game Over! Your score is: ${score}`);
  };

  return (
    <div className="relative h-screen w-screen">
      <Scene />
      <FallingObjects onCollision={handleGameEnd} /> {/* Add FallingObjects component here */}
      <div className="absolute top-0 left-0 p-4">
        <h1 className="text-3xl font-bold text-white">Vehicle Game</h1>
        {/* Display score and call handleGameEnd when needed */}
        <p className="text-lg text-white">Score: {score}</p>
        <button onClick={handleGameEnd} className="mt-4 p-2 bg-blue-500 text-white rounded">End Game</button>
      </div>
    </div>
  );
};

export default Game;
