import { cn } from "@/lib/utils";
import { type HTMLMotionProps, motion } from "framer-motion";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: React.ReactNode;
    hoverEffect?: boolean;
    variant?: "default" | "cyber";
}

export function GlassCard({ className, children, hoverEffect = false, variant = "cyber", ...props }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={hoverEffect ? { y: -2, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.5)" } : undefined}
            className={cn(
                "backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300",
                // specific Glassmorphism technique from instructions
                "bg-slate-900/30 border border-white/20 ring-1 ring-white/10",
                // Asymmetric Borders (Cyber variant)
                variant === "cyber" && "rounded-tl-[40px] rounded-br-[40px] rounded-tr-[12px] rounded-bl-[12px]",
                variant === "default" && "rounded-3xl",
                hoverEffect && "hover:bg-white/4 hover:border-white/20 hover:ring-white/10",
                className
            )}
            {...props}
        >
            {children}
            {/* Decorative Corner Accent for Cyber feel */}
            {variant === "cyber" && (
                <>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr-[10px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/10 rounded-bl-[10px] pointer-events-none" />
                </>
            )}
        </motion.div>
    );
}
