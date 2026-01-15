'use client';

import dynamic from 'next/dynamic';
import HUD from '@/components/ui/HUD';
import BootSequence from '@/components/ui/BootSequence';
import { useStore } from '@/store/useStore';

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false });

export default function Home() {
  const { isSystemReady } = useStore();

  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <BootSequence />

      <div id="ui-layer" style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
        opacity: isSystemReady ? 1 : 0,
        transition: 'opacity 2s ease'
      }}>
        <HUD />
      </div>

      <div id="canvas-container" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Scene />
      </div>
    </main>
  );
}
