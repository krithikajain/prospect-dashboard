import React from 'react';
import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
    hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className,
    noPadding = false,
    hoverEffect = true,
    ...props
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={hoverEffect ? { y: -4, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" } : {}}
            className={cn(
                "bg-white/55 backdrop-blur-xl border border-white/40 shadow-soft rounded-[32px] overflow-hidden relative",
                noPadding ? "" : "p-6",
                className
            )}
            {...props}
        >
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};
