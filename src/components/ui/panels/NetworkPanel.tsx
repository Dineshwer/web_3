'use client';
import styles from '../Dashboard.module.css';

export default function NetworkPanel() {
    return (
        <div className={styles.analyticsPanel}>
            <h2>NETWORK TRAFFIC <span>LIVE</span></h2>

            <div className={styles.dataRow}>
                <span>Inbound</span>
                <span>45.2 TB/s</span>
            </div>
            <div className={styles.dataRow}>
                <span>Outbound</span>
                <span>12.8 TB/s</span>
            </div>

            <div className={styles.barChart}>
                {[40, 70, 30, 80, 50, 90, 60, 40, 85, 45].map((h, i) => (
                    <div key={i} className={styles.bar} style={{ height: `${h}%` }} />
                ))}
            </div>

            <div style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.7 }}>
                &gt; ENCRYPTED TUNNEL: ACTIVE <br />
                &gt; NODE_LATENCY: 4ms
            </div>
        </div>
    );
}
