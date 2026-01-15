'use client';

import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Vector3 } from 'three';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';

export default function CameraRig() {
    const { camera } = useThree();
    const { activeView, isSystemReady } = useStore();

    useEffect(() => {
        // Initial Position (Boot)
        if (!isSystemReady) {
            camera.position.set(0, 0, 50);
            return;
        }

        const targetPos = new Vector3(0, 0, 14);

        // Define camera positions for each view
        switch (activeView) {
            case 'NETWORK':
                targetPos.set(0, 2, 8); // Closer, top-down-ish
                break;
            case 'THREATS':
                targetPos.set(-6, 0, 10); // Left angle
                break;
            case 'SYSTEM':
                targetPos.set(6, 0, 10); // Right angle
                break;
            case 'OVERVIEW':
            default:
                targetPos.set(0, 0, 14);
                break;
        }

        // Animate position
        gsap.to(camera.position, {
            x: targetPos.x,
            y: targetPos.y,
            z: targetPos.z,
            duration: 2.5, // Slower fly-in for drama
            ease: 'power3.inOut' // Cinematic ease
        });

    }, [activeView, isSystemReady, camera]);

    return null; // This component handles logic only, renders nothing
}
