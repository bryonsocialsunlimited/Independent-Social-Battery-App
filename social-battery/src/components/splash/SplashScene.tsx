"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function BatteryCore() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.3;

    nodesRef.current.forEach((node, i) => {
      if (!node) return;
      const angle = (i / 6) * Math.PI * 2 + t * 0.5;
      const radius = 1.2 + Math.sin(t + i) * 0.15;
      node.position.x = Math.cos(angle) * radius;
      node.position.z = Math.sin(angle) * radius;
      node.position.y = Math.sin(t * 1.5 + i * 0.8) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[0.6, 1.0, 0.3]} />
        <meshStandardMaterial color="#a855f7" emissive="#7c3aed" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.45, 0, 0]}>
        <boxGeometry args={[0.12, 0.35, 0.2]} />
        <meshStandardMaterial color="#c084fc" emissive="#a855f7" emissiveIntensity={0.4} />
      </mesh>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) nodesRef.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#22d3ee" : "#f472b6"}
            emissive={i % 2 === 0 ? "#0891b2" : "#db2777"}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function SplashScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 2, 2]} intensity={1} color="#a855f7" />
      <pointLight position={[-2, -1, 1]} intensity={0.5} color="#22d3ee" />
      <BatteryCore />
    </Canvas>
  );
}
