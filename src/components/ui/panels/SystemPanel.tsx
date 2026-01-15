'use client';
import styles from '../Dashboard.module.css';

export default function SystemPanel() {
    return (
        <div className={styles.analyticsPanel}>
            <h2>SYSTEM HEALTH <span>OPTIMAL</span></h2>

            <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
                <div style={{ flex: 1, textAlign: 'center', border: '1px solid #333', padding: '10px' }}>
                    <div style={{ fontSize: '2rem', color: '#00f3ff' }}>12%</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>CPU LOAD</div>
                </div>
                <div style={{ flex: 1, textAlign: 'center', border: '1px solid #333', padding: '10px' }}>
                    <div style={{ fontSize: '2rem', color: '#00f3ff' }}>42°C</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>CORE TEMP</div>
                </div>
            </div>

            <div className={styles.dataRow}>
                <span>MEMORY ALLOCATION</span>
                <span>64.0 GB / 128 GB</span>
            </div>
            <div className={styles.dataRow}>
                <span>STORAGE ARRAY</span>
                <span>RAID 0 [ACTIVE]</span>
            </div>
        </div>
    );
}
