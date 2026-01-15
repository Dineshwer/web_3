import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { soundManager } from '@/utils/SoundController';

export function useSound() {
    const { soundEnabled } = useStore();
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            // Browsers require interaction to start AudioContext
            const unlockAudio = () => {
                soundManager.init();
                soundManager.playAmbient();
                window.removeEventListener('click', unlockAudio);
                initialized.current = true;
            };
            window.addEventListener('click', unlockAudio);
            return () => window.removeEventListener('click', unlockAudio);
        }
    }, []);

    useEffect(() => {
        soundManager.toggleMute(!soundEnabled);
    }, [soundEnabled]);

    const playClick = () => {
        if (soundEnabled) soundManager.playClick();
    };

    const playHover = () => {
        if (soundEnabled) soundManager.playHover();
    };

    return { playClick, playHover };
}
