// src/pages/game.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Vehicle from '../components/Game/Vehicle';
import ShapeDropper from '../components/Game/ShapeDropper';

const Game = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Canvas className="w-full h-full">
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Vehicle />
          <ShapeDropper />
        </Canvas>
      </main>
      <Footer />
    </div>
  );
};

export default Game;
