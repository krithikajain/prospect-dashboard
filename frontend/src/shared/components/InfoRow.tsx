import * as React from 'react';

/**
 * Props for the InfoRow component.
 */
interface InfoRowProps {
    /** Google Material Symbols icon name. */
    icon: string;
    /** 
     * Tailwind color classes for the icon container.
     * @default 'text-gray-500 bg-gray-50'
     */
    iconColor?: string;
    /** Main title text for the row. */
    title: string;
    /** Optional supporting description text. */
    description?: string;
    /** Optional element to display on the trailing (right) side of the row. */
    trailing?: React.ReactNode;
    /** Additional CSS classes for the container. */
    className?: string;
}

/**
 * A reusable row component with an icon circle on the left, title/description in the middle,
 * and an optional trailing element on the right.
 * Used for stakeholder lists, committee members, and metadata rows.
 * 
 * @param {InfoRowProps} props - The component props.
 * @returns {JSX.Element} The rendered InfoRow component.
 */
export function InfoRow({ icon, iconColor = 'text-gray-500 bg-gray-50', title, description, trailing, className = '' }: InfoRowProps) {
    return (
        <div className={`flex items-start justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/50 ${className}`}>
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${iconColor}`}>
                    <span className="material-symbols-outlined text-[16px]">{icon}</span>
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-800 leading-none">{title}</p>
                    {description && <p className="text-[10px] text-gray-500 mt-1">{description}</p>}
                </div>
            </div>
            {trailing && <div className="shrink-0">{trailing}</div>}
        </div>
    );
}
