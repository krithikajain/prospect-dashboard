import type { NavSection } from '@/config/navigation';

/**
 * Props for the Navbar component.
 */
interface NavbarProps {
    /** The complete navigation structure configuration. */
    config: readonly NavSection[];
    /** ID of the currently active main section. */
    activeSectionId: string;
    /** Callback triggered when a main section is clicked. */
    onSectionChange: (sectionId: string) => void;
}

/**
 * Top-mounted floating navigation component with glassmorphism styling.
 * Handles the persistent global navigation between high-level application sections.
 */
export function Navbar({ config, activeSectionId, onSectionChange }: NavbarProps) {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-6 pointer-events-none">
            {/* Main Floating Nav */}
            <nav className="glass-card px-2 py-2 flex items-center gap-1 pointer-events-auto border-none shadow-xl bg-white/80 backdrop-blur-xl rounded-[32px]">
                {config.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => onSectionChange(section.id)}
                        className={activeSectionId === section.id
                            ? "nav-pill-active text-sm font-medium flex items-center gap-2"
                            : "px-5 py-2 text-sm font-medium text-secondary-text hover:text-black transition-colors"
                        }
                    >
                        {activeSectionId === section.id && <span className="material-symbols-outlined text-sm">{section.icon}</span>}
                        {section.label}
                    </button>
                ))}
            </nav>
        </div>
    );
}
