'use client';

import { useBox } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { useMemo, useState } from 'react';
import { Mesh, Color, MeshStandardMaterial } from 'three';
import { useStore } from '@/store/useStore';

function Block({ id, position, initialColor }: { id: string, position: [number, number, number], initialColor: string }) {
    const { selectedBlock, selectBlock } = useStore();
    const isSelected = selectedBlock === id;

    const [ref, api] = useBox<Mesh>(() => ({
        mass: 1,
        position,
        args: [0.5, 0.5, 0.5],
        linearDamping: 0.5,
        angularDamping: 0.5,
    }));


    const color = useMemo(() => new Color(initialColor), [initialColor]);
    const [hovered, setHover] = useState(false);

    // Gentle impulse
    useFrame((state) => {
        if (!isSelected && Math.random() > 0.99) {
            api.applyImpulse(
                [(Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2],
                [0, 0, 0]
            )
        }

        if (ref.current) {
            const material = (ref.current as Mesh).material as MeshStandardMaterial;

            if (material && 'emissive' in material) {
                if (isSelected) {
                    const t = state.clock.getElapsedTime();
                    const pulse = (Math.sin(t * 10) + 1) / 2;
                    material.emissive.setHex(0xff0000);
                    material.emissiveIntensity = pulse * 2;
                } else if (hovered) {
                    material.emissive.setHex(0x00f3ff);
                    material.emissiveIntensity = 1.2;
                } else {
                    // Subtle edge glow for visibility
                    material.emissive.setHex(0x003344);
                    material.emissiveIntensity = 0.3;
                }
            }
        }
    });

    return (
        <mesh
            ref={ref}
            onClick={(e) => {
                e.stopPropagation();
                selectBlock(isSelected ? null : id);
            }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <boxGeometry args={[0.5, 0.5, 0.5]} />

            <meshStandardMaterial
                color={color}
                transparent
                opacity={0.95}
                roughness={0.3}
                metalness={0.9}
                emissive="#003344"
                emissiveIntensity={0.3}
            />
        </mesh>
    );
}

export default function FloatingData({ count = 20 }) {
    const blocks = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            id: `DATA_BLOCK_${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            position: [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            ] as [number, number, number],
            color: Math.random() > 0.5 ? '#00f3ff' : '#1a1a1a' // Dark gray with subtle visibility
        }));
    }, [count]);

    return (
        <group>
            {blocks.map((data, i) => (
                <Block key={i} id={data.id} position={data.position} initialColor={data.color} />
            ))}
        </group>
    );
}
