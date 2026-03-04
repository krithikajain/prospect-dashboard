/**
 * Represents a top-level section in the navigation system.
 */
export interface NavSection {
    /** Unique identifier for the section. */
    id: string;
    /** Human-readable label for the navigation item. */
    label: string;
    /** Google Material Symbols icon name. */
    icon: string;
    /** Optional array of sub-tabs within this section. */
    tabs?: NavTab[];
}

/**
 * Represents a sub-tab within a navigation section.
 */
export interface NavTab {
    /** Unique identifier for the tab. */
    id: string;
    /** Human-readable label for the tab. */
    label: string;
    /** Google Material Symbols icon name. */
    icon: string;
}

/**
 * Props for the Navbar component.
 */
interface NavbarProps {
    /** The complete navigation structure configuration. */
    config: readonly NavSection[];
    /** ID of the currently active main section. */
    activeSectionId: string;
    /** ID of the currently active sub-tab (calculated from parent). */
    activeTabId?: string;
    /** Callback triggered when a main section is clicked. */
    onSectionChange: (sectionId: string) => void;
    /** Callback triggered when a sub-tab is clicked. */
    onTabChange: (tabId: string) => void;
}

/**
 * Top-mounted floating navigation component with glassmorphism styling.
 * Handles the persistent global navigation between high-level application sections.
 * 
 * @param {Omit<NavbarProps, 'activeTabId' | 'onTabChange'>} props - The component props.
 * @returns {JSX.Element} The rendered Navbar component.
 */
export function Navbar({ config, activeSectionId, onSectionChange }: Omit<NavbarProps, 'activeTabId' | 'onTabChange'>) {
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
