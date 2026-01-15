
import HUD from '@/components/ui/HUD';
import Scene from '@/components/canvas/Scene';

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div id="canvas-container" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Scene />
      </div>
      <div id="ui-layer" style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
        <HUD />
      </div>
    </main>
  );
}
