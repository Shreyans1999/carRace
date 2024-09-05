// src/components/Game/Scene.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import FallingObjects from './FallingObjects';
import Vehicle from './Vehicle';
import { OrbitControls } from '@react-three/drei';

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Physics world */}
      <Physics gravity={[0, -9.81, 0]}>
        <FallingObjects />
        <Vehicle />
      </Physics>

      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
