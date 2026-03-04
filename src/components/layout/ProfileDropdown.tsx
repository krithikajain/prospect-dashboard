import { useState } from 'react';

/**
 * Top-right fixed user profile component.
 * Displays the current user's avatar and provides a dropdown menu for profile-related actions.
 * 
 * @returns {JSX.Element} The rendered ProfileDropdown component.
 */
export function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-8 right-12 flex items-center gap-4 z-[60]">
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm hover:shadow-md transition-all p-0.5 bg-white flex items-center justify-center cursor-pointer pointer-events-auto"
                >
                    <img
                        className="w-full h-full object-cover rounded-full bg-slate-100"
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan"
                        alt="Profile"
                    />
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[60] pointer-events-auto">
                        <DropdownItem icon="bookmark" label="Saved Prospects" />
                        <DropdownItem icon="person" label="Your Profile" />
                        <div className="my-1.5 border-t border-gray-100" />
                        <DropdownItem icon="logout" label="Sign Out" danger />
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * A reusable action item within the profile dropdown menu.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.icon - Google Material Symbols icon name.
 * @param {string} props.label - Text to display in the menu.
 * @param {boolean} [props.danger] - Whether to use red 'danger' styling for the item.
 * @returns {JSX.Element} The rendered DropdownItem component.
 */
function DropdownItem({ icon, label, danger = false }: { icon: string; label: string; danger?: boolean }) {
    return (
        <button className={`w-full text-left px-5 py-2.5 text-sm flex items-center gap-3 transition-colors ${danger
            ? 'text-red-600 hover:bg-red-50'
            : 'text-gray-700 hover:bg-slate-50 hover:text-black'
            }`}>
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
            {label}
        </button>
    );
}
