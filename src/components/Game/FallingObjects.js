// src/components/Game/FallingObjects.js

import React, { useState, useEffect } from 'react';
import { useBox } from '@react-three/cannon';
import { Box, Sphere, Cone } from '@react-three/drei';

const shapes = [
  { component: Box, args: [1, 1, 1], color: 'red' },
  { component: Sphere, args: [0.5, 32, 32], color: 'green' },
  { component: Cone, args: [0.5, 1, 32], color: 'blue' },
];

const FallingObject = ({ position, onCollide }) => {
  const [ref] = useBox(() => ({
    mass: 1,
    position,
    angularVelocity: [0, 0, 0],
    linearVelocity: [0, 0, -1],
    onCollide: () => {
      if (onCollide) onCollide();
    },
  }));

  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const ShapeComponent = shape.component;

  return (
    <ShapeComponent args={shape.args} ref={ref}>
      <meshStandardMaterial color={shape.color} />
    </ShapeComponent>
  );
};

const FallingObjects = ({ onCollision }) => {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const x = Math.random() * 10 - 5;
      const y = Math.random() * 10 + 10;
      const z = Math.random() * 10 - 5;
      setObjects((prevObjects) => [...prevObjects, { x, y, z }]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCollision = () => {
    onCollision();
  };

  return (
    <>
      {objects.map((pos, index) => (
        <FallingObject key={index} position={[pos.x, pos.y, pos.z]} onCollide={handleCollision} />
      ))}
    </>
  );
};

export default FallingObjects;
