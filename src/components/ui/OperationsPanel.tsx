'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './Dashboard.module.css';
import MagneticButton from './effects/MagneticButton';

export default function OperationsPanel() {
    const [logs, setLogs] = useState<string[]>(['> SYSTEM_INIT_COMPLETE', '> LISTENING_ON_PORT_8080']);
    const endRef = useRef<HTMLDivElement>(null);

    const addLog = (msg: string) => {
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
        setLogs(prev => [...prev, `[${timestamp}] ${msg}`].slice(-15));
    };

    useEffect(() => {
        // Auto scroll
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    useEffect(() => {
        // Random background chatter
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const msgs = [
                    'PING_SUCCESS 192.168.0.1',
                    'PACKET_LOSS DETECTED',
                    'GARBAGE_COLLECTION_RUNNING',
                    'SYNCING_DB_SHARDS',
                    'HEARTBEAT_ACK'
                ];
                addLog(msgs[Math.floor(Math.random() * msgs.length)]);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <aside className={styles.opsPanel}>
            <div className={styles.opsSection}>
                <div className={styles.opsTitle}>LIVE_TERMINAL</div>
                <div className={styles.terminal}>
                    {logs.map((log, i) => (
                        <div key={i}>{log}</div>
                    ))}
                    <div ref={endRef} />
                </div>
            </div>

            <div className={styles.opsSection}>
                <div className={styles.opsTitle}>QUICK_ACTIONS</div>
                <div className={styles.actionGrid}>
                    <MagneticButton className={styles.actionButton} onClick={() => addLog('> INITIATING_DEEP_SCAN...')}>SCAN_NET</MagneticButton>
                    <MagneticButton className={styles.actionButton} onClick={() => addLog('> PURGING_CACHE...')}>PURGE_LOGS</MagneticButton>
                    <MagneticButton className={styles.actionButton} onClick={() => addLog('> REBOOT_SEQUENCE_ARMED')}>REBOOT</MagneticButton>
                    <MagneticButton className={`${styles.actionButton} ${styles.danger}`} onClick={() => addLog('> ! LOCKDOWN_INITIATED !')}>LOCKDOWN</MagneticButton>
                </div>
            </div>

            <div className={styles.opsSection} style={{ marginTop: 'auto' }}>
                <div className={styles.opsTitle}>SESSION_INFO</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                    USER: ADMIN_01<br />
                    ROLE: ROOT_ACCESS<br />
                    UPTIME: 04:22:19
                </div>
            </div>
        </aside>
    );
}
