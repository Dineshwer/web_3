'use client';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from '../Dashboard.module.css';

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string; // Allow passing external styles
}

export default function MagneticButton({ children, onClick, className }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();

        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        setPosition({ x: x * 0.2, y: y * 0.2 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            onClick={onClick}
            className={className || styles.actionButton} // Default to actionButton style if none provided
        >
            {children}
        </motion.div>
    );
}
