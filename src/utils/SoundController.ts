export class SoundController {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private ambientOscillators: OscillatorNode[] = [];

    constructor() {
        if (typeof window !== 'undefined') {
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            this.ctx = new AudioContextClass();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.3; // Master volume
            this.masterGain.connect(this.ctx.destination);
        }
    }

    public init() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    public playClick() {
        if (!this.ctx || !this.masterGain) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(2000, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, this.ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    public playHover() {
        if (!this.ctx || !this.masterGain) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    public playAmbient() {
        if (!this.ctx || !this.masterGain || this.ambientOscillators.length > 0) return;

        // Drone 1
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.connect(gain1);
        gain1.connect(this.masterGain);
        osc1.type = 'sine';
        osc1.frequency.value = 50;
        gain1.gain.value = 0.1;
        osc1.start();

        // Drone 2 (Harmony)
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(this.masterGain);
        osc2.type = 'sine';
        osc2.frequency.value = 52; // Binaural beat effect
        gain2.gain.value = 0.1;
        osc2.start();

        this.ambientOscillators.push(osc1, osc2);
    }

    public toggleMute(muted: boolean) {
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(muted ? 0 : 0.3, this.ctx!.currentTime);
        }
    }
}

export const soundManager = new SoundController();
