export interface NavSection {
    id: string;
    label: string;
    icon: string;
    tabs?: NavTab[];
}

export interface NavTab {
    id: string;
    label: string;
    icon: string;
}

interface NavbarProps {
    config: readonly NavSection[];
    activeSectionId: string;
    activeTabId?: string;
    onSectionChange: (sectionId: string) => void;
    onTabChange: (tabId: string) => void;
}

/**
 * Floating glass-morphism navigation bar with main sections.
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
