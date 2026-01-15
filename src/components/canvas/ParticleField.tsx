'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField({ count = 2000 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 2 * Math.PI;
            const p = Math.random() * 2 * Math.PI;
            const r = 8 + Math.random() * 4;

            temp.push({
                position: new THREE.Vector3(
                    r * Math.sin(t) * Math.cos(p),
                    r * Math.sin(t) * Math.sin(p),
                    r * Math.cos(t)
                ),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                ),
                scale: Math.random() * 0.05 + 0.02
            });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;
        const matrix = new THREE.Matrix4();

        particles.forEach((particle, i) => {
            // Fluid drift motion
            particle.position.x += Math.sin(time * 0.5 + i * 0.1) * 0.001;
            particle.position.y += Math.cos(time * 0.3 + i * 0.15) * 0.001;
            particle.position.z += Math.sin(time * 0.4 + i * 0.12) * 0.001;

            // Keep particles in bounds
            const dist = particle.position.length();
            if (dist > 15 || dist < 5) {
                particle.position.normalize().multiplyScalar(10);
            }

            matrix.setPosition(particle.position);
            matrix.scale(new THREE.Vector3(particle.scale, particle.scale, particle.scale));
            meshRef.current!.setMatrixAt(i, matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial
                color="#00f3ff"
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </instancedMesh>
    );
}
