'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  uniform float uTime;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vUv = uv;
    
    // Subtle vertex displacement for glitch effect
    vec3 pos = position;
    float glitch = sin(position.y * 10.0 + uTime * 2.0) * 0.01;
    pos += normal * glitch;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  
  void main() {
    // Fresnel effect (rim lighting)
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
    
    // Scanlines
    float scanline = sin(vUv.y * 100.0 + uTime * 2.0) * 0.5 + 0.5;
    scanline = smoothstep(0.3, 0.7, scanline);
    
    // Holographic interference
    float interference = sin(vPosition.x * 5.0 + uTime) * 
                        sin(vPosition.y * 5.0 + uTime * 1.3) * 
                        sin(vPosition.z * 5.0 + uTime * 0.7);
    interference = interference * 0.1 + 0.9;
    
    // Combine effects
    vec3 color = uColor;
    color += fresnel * 0.5;
    color *= scanline * interference;
    
    float alpha = (fresnel * 0.7 + 0.3) * uOpacity;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

interface HologramMaterialProps {
    color?: string;
    opacity?: number;
}

export default function HologramMaterial({
    color = '#00f3ff',
    opacity = 0.6
}: HologramMaterialProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    return (
        <shaderMaterial
            ref={materialRef}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={{
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(color) },
                uOpacity: { value: opacity }
            }}
            transparent
            side={THREE.DoubleSide}
        />
    );
}
