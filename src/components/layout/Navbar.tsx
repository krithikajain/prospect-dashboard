interface NavbarProps {
    stages: Array<{ id: string; label: string; icon: string }>;
    currentStage: number;
    onStageChange: (idx: number) => void;
}

/**
 * Floating glass-morphism navigation bar with pill-style active indicator.
 */
export function Navbar({ stages, currentStage, onStageChange }: NavbarProps) {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 pointer-events-none">
            <nav className="glass-card px-2 py-2 flex items-center gap-1 pointer-events-auto border-none shadow-xl bg-white/80 backdrop-blur-xl rounded-[32px]">
                {stages.map((stage, idx) => (
                    <button
                        key={idx}
                        onClick={() => onStageChange(idx)}
                        className={currentStage === idx
                            ? "nav-pill-active text-sm font-medium flex items-center gap-2"
                            : "px-5 py-2 text-sm font-medium text-secondary-text hover:text-black transition-colors"
                        }
                    >
                        {currentStage === idx && <span className="material-symbols-outlined text-sm">{stage.icon}</span>}
                        {stage.label}
                    </button>
                ))}
            </nav>
        </div>
    );
}
