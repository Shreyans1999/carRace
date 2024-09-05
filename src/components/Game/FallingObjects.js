// src/components/Game/FallingObjects.js
import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import { Box, Sphere, Pyramid } from '@react-three/drei';

const shapes = [
  { component: Box, args: [1, 1, 1], color: 'red' },
  { component: Sphere, args: [0.5, 32, 32], color: 'green' },
  { component: Pyramid, args: [1, 1, 1], color: 'blue' }
];

const FallingObject = ({ position }) => {
  const [ref] = useBox(() => ({
    mass: 1,
    position,
    angularVelocity: [0, 0, 0],
    linearVelocity: [0, 0, -1],
  }));

  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const ShapeComponent = shape.component;

  return (
    <ShapeComponent args={shape.args} ref={ref}>
      <meshStandardMaterial color={shape.color} />
    </ShapeComponent>
  );
};

const FallingObjects = () => {
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

  return (
    <>
      {objects.map((pos, index) => (
        <FallingObject key={index} position={[pos.x, pos.y, pos.z]} />
      ))}
    </>
  );
};

export default FallingObjects;
