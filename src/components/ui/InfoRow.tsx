import * as React from 'react';

interface InfoRowProps {
    icon: string;
    iconColor?: string;
    title: string;
    description?: string;
    trailing?: React.ReactNode;
    className?: string;
}

/**
 * A row with an icon circle, title + description, and an optional trailing element.
 * Used for stakeholder lists, committee members, urgency items, etc.
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
