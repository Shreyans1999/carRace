// src/components/Game/Wheel.js
import React from 'react';
import { Cylinder } from '@react-three/drei';

const Wheel = ({ position }) => {
  return (
    <Cylinder args={[0.2, 0.2, 0.2, 32]} position={position}>
      <meshStandardMaterial color="black" />
    </Cylinder>
  );
};

export default Wheel;
