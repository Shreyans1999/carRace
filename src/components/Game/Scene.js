// src/components/Game/Scene.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Plane } from '@react-three/drei';
import Vehicle from './Vehicle';
import * as THREE from 'three';

const BackgroundPlane = () => {
  const texture = new THREE.TextureLoader().load('https://images.pexels.com/photos/1260727/pexels-photo-1260727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'); // URL of the background image

  return (
    <Plane args={[100, 100]} position={[0, 0, -10]}>
      <meshStandardMaterial attach="material" map={texture} />
    </Plane>
  );
};

const Scene = () => {
  return (
    <Canvas>
      <OrbitControls />
      <BackgroundPlane />
      <Vehicle />
    </Canvas>
  );
};

export default Scene;
