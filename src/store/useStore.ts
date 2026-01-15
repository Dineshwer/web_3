import { create } from 'zustand';

interface SentinelState {
    selectedBlock: string | null;
    selectBlock: (id: string | null) => void;
    activeView: 'OVERVIEW' | 'NETWORK' | 'THREATS' | 'SYSTEM';
    setActiveView: (view: 'OVERVIEW' | 'NETWORK' | 'THREATS' | 'SYSTEM') => void;
    isSystemReady: boolean;
    setSystemReady: (ready: boolean) => void;
}

export const useStore = create<SentinelState>((set) => ({
    selectedBlock: null,
    selectBlock: (id) => set({ selectedBlock: id }),
    activeView: 'OVERVIEW',
    setActiveView: (view) => set({ activeView: view }),
    isSystemReady: false,
    setSystemReady: (ready) => set({ isSystemReady: ready }),
}));
