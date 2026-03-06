import { motion, HTMLMotionProps } from 'motion/react';

interface CrazyButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
}

/**
 * Botón "Loco" (CrazyButton)
 * 
 * Un componente de botón altamente animado que utiliza Framer Motion
 * para efectos de hover, tap y brillo dinámico.
 */
export default function CrazyButton({ children, variant = 'primary', className = '', ...props }: CrazyButtonProps) {
    const variants = {
        primary: 'bg-emerald-500 text-white shadow-emerald-200 hover:bg-emerald-600',
        secondary: 'bg-rose-500 text-white shadow-rose-200 hover:bg-rose-600',
        accent: 'bg-amber-500 text-white shadow-amber-200 hover:bg-amber-600',
        ghost: 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20',
    };

    return (
        <motion.button
            whileHover={{
                scale: 1.05,
                rotate: [0, -1, 1, -1, 0],
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-black tracking-tight shadow-lg transition-colors overflow-hidden ${variants[variant]} ${className}`}
            {...props}
        >
            <motion.span
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="relative z-10 flex items-center gap-2"
            >
                {children}
            </motion.span>

            {/* Dynamic Shine effect */}
            <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            />
        </motion.button>
    );
}
