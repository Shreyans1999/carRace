// src/components/Game/ShapeDropper.js
import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cone } from '@react-three/drei';
import { useDrop, useSphere, useBox, useCone } from '@react-three/cannon';

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

  useEffect(() => {
    const interval = setInterval(() => {
      const shapeType = ['box', 'sphere', 'cone'][Math.floor(Math.random() * 3)];
      const size = Math.random() * 1 + 0.5; // Random size between 0.5 and 1.5
      const mass = Math.random() * 2 + 1; // Random mass between 1 and 3

      setShapes(prevShapes => [
        ...prevShapes,
        { type: shapeType, size, mass, position: [Math.random() * 10 - 5, 10, Math.random() * 10 - 5] }
      ]);
    }, 2000); // Drop a shape every 2 seconds

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
