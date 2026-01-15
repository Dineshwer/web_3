'use client';
import styles from '../Dashboard.module.css';

export default function ThreatPanel() {
    return (
        <div className={styles.analyticsPanel} style={{ borderColor: '#ff2a2a' }}>
            <h2 style={{ borderBottomColor: 'rgba(255, 42, 42, 0.3)' }}>
                THREAT ANALYSIS
                <span style={{ color: '#ff2a2a' }}>CRITICAL</span>
            </h2>

            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={styles.dataRow} style={{ color: i === 1 ? '#ff2a2a' : 'inherit' }}>
                        <span>⚠ INTRUSION_ATTEMPT_{i}0{i}</span>
                        <span>BLOCKED</span>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(255,42,42,0.1)', border: '1px solid #ff2a2a' }}>
                FIREWALL STATUS: <b style={{ color: '#ff2a2a' }}>98% LOAD</b>
            </div>
        </div>
    );
}
