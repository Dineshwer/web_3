'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

import Globe from './Globe';
import FloatingData from './FloatingData';

// Placeholder for a loading state component
function Loader() {
    return null;
}

export default function Scene() {
    return (
        <Canvas
            shadows
            dpr={[1, 2]}
            gl={{ antialias: false, stencil: false, depth: true }} // Antialias off for postprocessing usually better, or handle carefully
            camera={{ position: [0, 0, 12], fov: 45 }}
        >
            <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={50} />
            <OrbitControls makeDefault enableZoom={true} maxDistance={20} minDistance={5} />

            <color attach="background" args={['#050505']} />
            <fog attach="fog" args={['#050505', 5, 30]} />

            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#00f3ff" castShadow />
            <pointLight position={[-10, -5, -10]} intensity={1} color="#ff2a2a" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <Physics gravity={[0, 0, 0]}>
                <Suspense fallback={<Loader />}>
                    <Environment preset="city" />
                    <Globe />
                    <FloatingData count={30} />
                </Suspense>
            </Physics>

            <EffectComposer>
                <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.4} />
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </Canvas>
    );
}
