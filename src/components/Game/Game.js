// src/components/Game/Game.js
import React, { useState } from 'react';
import Scene from './Scene';
import { supabase } from '../lib/supabaseClient'; // Import Supabase client

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

  // Example of how to use saveScore (you should call this when the game ends)
  const handleGameEnd = () => {
    saveScore(score);
  };

  return (
    <div className="relative h-screen w-screen">
      <Scene />
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
