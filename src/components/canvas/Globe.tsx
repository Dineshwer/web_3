'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

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
            {/* Wireframe Outer Sphere */}
            <mesh ref={outerRef} scale={[2, 2, 2]}>
                <icosahedronGeometry args={[1, 10]} />
                <meshBasicMaterial color="#00f3ff" wireframe transparent opacity={0.3} />
            </mesh>

            {/* Inner Core */}
            <mesh ref={innerRef} scale={[1.8, 1.8, 1.8]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color="#000000"
                    emissive="#001a1f"
                    roughness={0.1}
                    metalness={1}
                />
            </mesh>

            {/* Scanning Ring Effect could go here */}
        </group>
    );
}
