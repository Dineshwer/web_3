'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import styles from './HUD.module.css';
import dashboardStyles from './Dashboard.module.css';
import Navigation from './Navigation';
import OperationsPanel from './OperationsPanel';
import NetworkPanel from './panels/NetworkPanel';
import ThreatPanel from './panels/ThreatPanel';
import SystemPanel from './panels/SystemPanel';

export default function HUD() {
    const [time, setTime] = useState('');
    const [dataStream, setDataStream] = useState<string[]>(['INITIALIZING...']);
    const { selectedBlock, activeView } = useStore();

    useEffect(() => {
        // Clock
        const tick = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        }, 1000);

        // Fake Data Stream
        const dataInterval = setInterval(() => {
            const hex = Math.random().toString(16).substr(2, 8).toUpperCase();
            setDataStream(prev => [`> PACKET_${hex} RECEIVED`, ...prev].slice(0, 5));
        }, 2000);

        return () => {
            clearInterval(tick);
            clearInterval(dataInterval);
        };
    }, []);

    return (
        <>
            <div className={styles.scanline} />

            {/* Dashboard Layout Container */}
            <div className={dashboardStyles.dashboardContainer}>
                <Navigation />

                <div className={dashboardStyles.contentArea}>
                    {/* Header */}
                    <div className={styles.header} style={{ width: '100%', marginBottom: 'auto' }}>
                        <div className="pointer-events-auto">
                            <h1 className={styles.title}>SENTINEL</h1>
                            <div className={styles.subtitle}>SECURE_DASHBOARD // V.3.3.0 // VIEW: {activeView}</div>
                        </div>
                        <div className={styles.panel}>
                            <div>SYS.TIME: {time}</div>
                            <div>NET.LATENCY: 12ms</div>
                        </div>
                    </div>

                    {/* Dynamic Panels */}
                    {activeView === 'NETWORK' && <NetworkPanel />}
                    {activeView === 'THREATS' && <ThreatPanel />}
                    {activeView === 'SYSTEM' && <SystemPanel />}

                    {/* Block Selection Modal (Overlay) */}
                    {selectedBlock && activeView === 'OVERVIEW' && (
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(0, 0, 0, 0.8)',
                            border: '1px solid #00f3ff',
                            padding: '20px',
                            width: '300px',
                            color: '#00f3ff',
                            fontFamily: 'monospace',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 0 20px rgba(0, 243, 255, 0.2)',
                            pointerEvents: 'auto'
                        }}>
                            <h2 style={{ borderBottom: '1px solid #00f3ff', paddingBottom: '10px', marginBottom: '10px' }}>
                                DATA BLOCK DECRYPTED
                            </h2>
                            <p>ID: {selectedBlock}</p>
                            <p>STATUS: <span style={{ color: '#ff2a2a' }}>COMPROMISED</span></p>
                            <div style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.7 }}>
                                ANALYZING CONTENT... [99%]
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className={styles.footer} style={{ width: '100%', marginTop: 'auto' }}>
                        <div className={styles.panel}>
                            <div className={styles.status}>
                                <div className={styles.indicator} />
                                <span>SYSTEM ONLINE</span>
                            </div>
                            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
                                {dataStream.map((msg, i) => (
                                    <div key={i} style={{ opacity: 1 - i * 0.2 }}>{msg}</div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.panel} style={{ textAlign: 'right' }}>
                            <div>SECTOR: A-7</div>
                            <div>SECURITY LEVEL: MAX</div>
                        </div>
                    </div>
                </div>

                {/* Right Operations Panel */}
                <OperationsPanel />
            </div>
        </>
    );
}
