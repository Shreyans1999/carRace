// src/components/Game/Vehicle.js
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder } from '@react-three/drei';
import { useBox, useCylinder } from '@react-three/cannon';

const Vehicle = () => {
  const vehicleRef = useRef();
  const [moving, setMoving] = useState(false);
  const [velocity, setVelocity] = useState([0, 0, 0]);

  // Physics for the vehicle body
  const [bodyRef] = useBox(() => ({
    mass: 1,
    position: [0, 0.25, 0],
  }));

  // Physics for the wheels
  const [frontWheelRef] = useCylinder(() => ({
    mass: 1,
    position: [1, -0.25, 0],
    rotation: [Math.PI / 2, 0, 0],
  }));
  const [backWheelRef1] = useCylinder(() => ({
    mass: 1,
    position: [-1, -0.25, 0],
    rotation: [Math.PI / 2, 0, 0],
  }));
  const [backWheelRef2] = useCylinder(() => ({
    mass: 1,
    position: [0, -0.25, 0],
    rotation: [Math.PI / 2, 0, 0],
  }));

  // Movement logic
  useFrame(({ mouse }) => {
    if (bodyRef.current) {
      const speed = 5;
      const direction = moving ? 1 : 0; // 1 for moving, 0 for stop
      const rotationSpeed = 0.1; // Rotation speed for turning with cursor
      const angle = Math.atan2(mouse.x, mouse.y); // Angle based on mouse position
  
      // Move forward or backward based on key press
      if (moving) {
        bodyRef.current.position.z -= direction * velocity[2] * speed;
        bodyRef.current.position.x -= direction * velocity[0] * speed;
  
        // Rotate the vehicle based on mouse direction
        bodyRef.current.rotation.y = angle * rotationSpeed;
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
      <Box args={[2, 0.5, 1]} position={[0, 0.25, 0]} ref={bodyRef}>
        <meshStandardMaterial color="blue" />
      </Box>

      {/* Front wheel */}
      <Sphere args={[0.25, 32, 32]} position={[1, -0.25, 0]} ref={frontWheelRef}>
        <meshStandardMaterial color="black" />
      </Sphere>

      {/* Back wheels */}
      <Cylinder args={[0.2, 0.2, 0.5, 32]} position={[-1, -0.25, 0]} ref={backWheelRef1}>
        <meshStandardMaterial color="black" />
      </Cylinder>
      <Cylinder args={[0.2, 0.2, 0.5, 32]} position={[0, -0.25, 0]} ref={backWheelRef2}>
        <meshStandardMaterial color="black" />
      </Cylinder>
    </group>
  );
};

export default Vehicle;
