'use client';
import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { useSound } from '@/hooks/useSound';

const BOOT_LOGS = [
    'BIOS CHECK... OK',
    'LOADING KERNEL MODULES...',
    'MOUNTING FILE SYSTEM... READ-ONLY',
    'INITIATING SECURE HANDSHAKE...',
    'CONNECTING TO SATELLITE UPLINK [SAT-09]...',
    'DOWNLOADING THREAT SIGNATURES...',
    'DECRYPTING USER PROFILE...',
    'SYSTEM READY.'
];

export default function BootSequence() {
    const [logs, setLogs] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const { setSystemReady } = useStore();
    const { playClick } = useSound();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let index = 0;

        const nextLog = () => {
            if (index >= BOOT_LOGS.length) {
                // Boot Complete
                setProgress(100);
                setTimeout(() => {
                    setIsVisible(false);
                    setSystemReady(true);
                }, 300); // Fast exit
                return;
            }

            setLogs(prev => [...prev, BOOT_LOGS[index]]);
            setProgress(p => Math.min(p + (100 / BOOT_LOGS.length), 100));
            playClick();
            index++;
            // Much faster: 30ms to 80ms delay
            timer = setTimeout(nextLog, Math.random() * 50 + 30);
        };

        timer = setTimeout(nextLog, 200); // Quick start

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#050505', // Slightly off-black for premium feel
            color: '#00f3ff',
            fontFamily: 'monospace',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'auto'
        }}>
            <div style={{
                fontSize: '5rem',
                fontWeight: '300', // Thinner, classier font
                letterSpacing: '15px',
                marginBottom: '4rem',
                color: '#fff',
                textShadow: '0 0 20px rgba(0, 243, 255, 0.5)', // Softer glow
                animation: 'pulse 3s infinite ease-in-out'
            }}>
                SENTINEL<span style={{ color: '#00f3ff', opacity: 0.8 }}>{"}"}</span>
            </div>

            <div style={{
                width: '400px',
                height: '2px',
                background: 'rgba(255,255,255,0.1)',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: `${progress}%`,
                    background: '#00f3ff',
                    boxShadow: '0 0 10px #00f3ff',
                    transition: 'width 0.1s linear'
                }} />
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '150px',
                overflow: 'hidden',
                fontSize: '0.85rem',
                color: 'rgba(0, 243, 255, 0.7)',
                letterSpacing: '2px'
            }}>
                {logs.slice(-5).map((log, i) => ( // Only show last 5 logs for cleanliness
                    <div key={i} style={{ marginBottom: '8px', opacity: (i + 1) / 5 }}>
                        {log}
                    </div>
                ))}
            </div>

            <button
                onClick={() => { setIsVisible(false); setSystemReady(true); }}
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: '0.7rem',
                    letterSpacing: '2px',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                }}
            >
                [ Click to Skip ]
            </button>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.8; text-shadow: 0 0 15px rgba(0, 243, 255, 0.3); }
                    50% { opacity: 1; text-shadow: 0 0 25px rgba(0, 243, 255, 0.6); }
                }
            `}</style>
        </div>
    );
}
