'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import HologramMaterial from './materials/HologramMaterial';

export default function Globe() {
    const outerRef = useRef<Mesh>(null);
    const innerRef = useRef<Mesh>(null);

    useFrame((state, delta) => {
        if (outerRef.current) {
            outerRef.current.rotation.y += delta * 0.2;
            outerRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
        if (innerRef.current) {
            innerRef.current.rotation.y -= delta * 0.1;
        }
    });

    return (
        <group>
            {/* Wireframe Outer Sphere with Hologram Shader */}
            <mesh ref={outerRef} scale={[2, 2, 2]}>
                <icosahedronGeometry args={[1, 10]} />
                <HologramMaterial color="#00a8b8" opacity={0.25} />
            </mesh>

            {/* Inner Core with Hologram Shader */}
            <mesh ref={innerRef} scale={[1.8, 1.8, 1.8]}>
                <sphereGeometry args={[1, 32, 32]} />
                <HologramMaterial color="#001a1f" opacity={0.4} />
            </mesh>

            {/* Emissive center point for god rays */}
            <mesh scale={[0.5, 0.5, 0.5]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color="#00f3ff" transparent opacity={0} />
            </mesh>
        </group>
    );
}
