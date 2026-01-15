'use client';

import styles from './Dashboard.module.css';
import { useStore } from '@/store/useStore';

export default function Navigation() {
    const { activeView, setActiveView } = useStore();

    const navItems = [
        { id: 'OVERVIEW', icon: '⌖', label: 'Home' },
        { id: 'NETWORK', icon: '⚡', label: 'Net' },
        { id: 'THREATS', icon: '⚠', label: 'Threats' },
        { id: 'SYSTEM', icon: '⚙', label: 'Sys' },
    ] as const;

    return (
        <nav className={styles.sidebar}>
            {navItems.map((item) => (
                <div
                    key={item.id}
                    className={activeView === item.id ? styles.navItemActive : styles.navItem}
                    onClick={() => setActiveView(item.id)}
                    title={item.label}
                >
                    {item.icon}
                </div>
            ))}
        </nav>
    );
}
