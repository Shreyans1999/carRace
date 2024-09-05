// src/components/Game/Vehicle.js
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';
import { usePhysics } from '@react-three/cannon'; // Assuming usePhysics from @react-three/cannon for physics

const Vehicle = () => {
  const vehicleRef = useRef();
  const [moving, setMoving] = useState(false);
  const [velocity, setVelocity] = useState([0, 0, 0]);

  // Movement logic
  useFrame(() => {
    if (vehicleRef.current) {
      const speed = 5; // Adjust speed as needed
      if (moving) {
        vehicleRef.current.position.z -= velocity[2];
        vehicleRef.current.position.x -= velocity[0];
      }
    }
  });

  // Key controls for vehicle movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'w') {
        setMoving(true);
        setVelocity([0, 0, 0.1]); // Forward velocity
      }
      if (e.key === 's') {
        setMoving(true);
        setVelocity([0, 0, -0.1]); // Backward velocity
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'w' || e.key === 's') {
        setMoving(false);
        setVelocity([0, 0, 0]); // Stop movement
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [velocity]);

  return (
    <group ref={vehicleRef}>
      {/* Vehicle body */}
      <Box args={[2, 0.5, 1]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color="blue" />
      </Box>

      {/* Front wheel */}
      <Sphere args={[0.25, 32, 32]} position={[1, -0.25, 0]} castShadow>
        <meshStandardMaterial color="black" />
      </Sphere>

      {/* Back wheels */}
      <Sphere args={[0.25, 32, 32]} position={[-1, -0.25, 0]} castShadow>
        <meshStandardMaterial color="black" />
      </Sphere>
      <Sphere args={[0.25, 32, 32]} position={[0, -0.25, 0]} castShadow>
        <meshStandardMaterial color="black" />
      </Sphere>
    </group>
  );
};

export default Vehicle;
