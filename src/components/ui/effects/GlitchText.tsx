'use client';
import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

interface GlitchProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
}

export default function GlitchText({ text, speed = 50, delay = 0, className }: GlitchProps) {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isHovering = useRef(false);

    const scramble = () => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 2; // Decrypts 1 char every 2 frames
        }, speed);
    };

    useEffect(() => {
        // Initial scramble on mount
        setTimeout(scramble, delay);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text]);

    return (
        <span
            className={className}
            onMouseEnter={() => { isHovering.current = true; scramble(); }}
            style={{ display: 'inline-block', fontFamily: 'monospace' }}
        >
            {displayText}
        </span>
    );
}
