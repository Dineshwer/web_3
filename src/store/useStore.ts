import { create } from 'zustand';

interface SentinelState {
    selectedBlock: string | null;
    selectBlock: (id: string | null) => void;
    isSystemReady: boolean;
    setSystemReady: (ready: boolean) => void;
}

export const useStore = create<SentinelState>((set) => ({
    selectedBlock: null,
    selectBlock: (id) => set({ selectedBlock: id }),
    isSystemReady: false,
    setSystemReady: (ready) => set({ isSystemReady: ready }),
}));
