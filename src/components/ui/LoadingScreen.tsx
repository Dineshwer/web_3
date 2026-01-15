'use client';

export default function LoadingScreen() {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00f3ff',
            fontFamily: 'monospace'
        }}>
            INITIALIZING SYSTEM...
        </div>
    );
}
