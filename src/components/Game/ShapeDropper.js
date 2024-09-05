// src/components/Game/ShapeDropper.js
import React, { useState, useEffect } from 'react';
import { Box, Sphere, Cone } from '@react-three/drei';
import { useDrop } from '@react-three/cannon';

const Shape = ({ type, size, position, mass, onCollide }) => {
  let [ref] = useDrop(() => ({
    onCollide: () => onCollide(),
    mass
  }));

  const commonProps = {
    ref,
    position,
    args: [size, size, size],
    castShadow: true,
    receiveShadow: true
  };

  switch (type) {
    case 'box':
      return <Box {...commonProps} />;
    case 'sphere':
      return <Sphere {...commonProps} args={[size, 32, 32]} />;
    case 'cone':
      return <Cone {...commonProps} args={[size, size * 2, 32]} />;
    default:
      return null;
  }
};

const ShapeDropper = () => {
  const [shapes, setShapes] = useState([]);

  // Function to generate random speed for falling objects
  const randomSpeed = () => Math.random() * 2 + 1;

  useEffect(() => {
    const interval = setInterval(() => {
      const shapeType = ['box', 'sphere', 'cone'][Math.floor(Math.random() * 3)];
      const size = Math.random() * 1 + 0.5; // Random size between 0.5 and 1.5
      const mass = randomSpeed(); // Add random speed for more variety

      setShapes(prevShapes => [
        ...prevShapes,
        { type: shapeType, size, mass, position: [Math.random() * 10 - 5, 10, Math.random() * 10 - 5] }
      ]);
    }, 1000); // Faster dropping to increase difficulty

    return () => clearInterval(interval);
  }, []);

  const handleCollision = (index) => {
    setShapes(prevShapes => prevShapes.filter((_, i) => i !== index));
  };

  return (
    <>
      {shapes.map((shape, index) => (
        <Shape
          key={index}
          type={shape.type}
          size={shape.size}
          position={shape.position}
          mass={shape.mass}
          onCollide={() => handleCollision(index)}
        />
      ))}
    </>
  );
};

export default ShapeDropper;
