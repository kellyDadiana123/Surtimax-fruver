import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

const FRUITS = ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬'];

export default function FloatingFruits() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    // Transform scroll to rotation and opacity for some parallax feel
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.5, 0.5, 0.3]);

    return (
        <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {[...Array(15)].map((_, i) => {
                const size = Math.random() * 60 + 40;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * -20;
                const fruit = FRUITS[Math.floor(Math.random() * FRUITS.length)];

                return (
                    <motion.div
                        key={i}
                        initial={{ x: 0, y: 0, rotate: 0 }}
                        animate={{
                            x: [0, (Math.random() - 0.5) * 200],
                            y: [0, (Math.random() - 0.5) * 200],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay
                        }}
                        style={{
                            position: 'absolute',
                            left: `${left}%`,
                            top: `${top}%`,
                            fontSize: `${size}px`,
                            opacity: 0.1,
                            filter: 'blur(4px)',
                            zIndex: -1,
                        }}
                    >
                        {fruit}
                    </motion.div>
                );
            })}

            {/* Larger, mouse-reactive elements could be added here */}
            <motion.div
                style={{ opacity, rotate }}
                className="absolute -right-20 -top-20 text-[300px] opacity-10 grayscale pointer-events-none blur-3xl select-none"
            >
                🌿
            </motion.div>
            <motion.div
                style={{ opacity, rotate: useTransform(scrollYProgress, [0, 1], [360, 0]) }}
                className="absolute -left-40 bottom-20 text-[400px] opacity-10 grayscale pointer-events-none blur-3xl select-none"
            >
                🍎
            </motion.div>
        </div>
    );
}
