/**
 * Props for the ChecklistItem component.
 */
interface ChecklistItemProps {
    /** The main text to display for the item. */
    label: string;
    /** Optional supporting text or description. */
    description?: string;
    /** 
     * Whether the item is checked. 
     * @default true
     */
    checked?: boolean;
    /** Additional CSS classes for the container. */
    className?: string;
}

/**
 * A checklist-style row with a check/unchecked icon, label, and sub-description.
 * Used in Urgency Drivers, buying process steps, etc.
 * 
 * @param {ChecklistItemProps} props - The component props.
 * @returns {JSX.Element} The rendered ChecklistItem component.
 */
export function ChecklistItem({ label, description, checked = true, className = '' }: ChecklistItemProps) {
    return (
        <div className={`flex items-start gap-3 ${!checked ? 'opacity-50' : ''} ${className}`}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${checked ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                <span className="material-symbols-outlined text-[12px]">
                    {checked ? 'check' : 'close'}
                </span>
            </div>
            <div>
                <p className={`text-sm font-semibold ${checked ? 'text-slate-800' : 'text-gray-500 line-through'}`}>{label}</p>
                {description && <p className="text-[10px] text-gray-500 mt-0.5">{description}</p>}
            </div>
        </div>
    );
}
