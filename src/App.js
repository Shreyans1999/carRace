// src/App.js

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import FallingObjects from './components/Game/FallingObjects';

const App = () => (
  <Canvas>
    <Physics>
      {/* Other components like lights, camera */}
      <FallingObjects />
    </Physics>
  </Canvas>
);

export default App;
