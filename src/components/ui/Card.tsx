import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: 'sm' | 'md' | 'lg' | 'none';
}

export function Card({ className, padding = 'md', ...props }: CardProps) {
    const paddingClass = {
        'none': '',
        'sm': 'p-6',
        'md': 'p-8',
        'lg': 'p-10'
    }[padding];

    return (
        <div className={`glass-card ${paddingClass} ${className || ''}`} {...props} />
    )
}

export function CardHeader({ icon, title, action, className }: { icon?: string, title: string, action?: React.ReactNode, className?: string }) {
    return (
        <div className={`flex items-center justify-between border-b border-border-light pb-4 mb-4 ${className || ''}`}>
            <div className="flex items-center gap-2">
                {icon && <span className="material-symbols-outlined text-secondary-text">{icon}</span>}
                <h3 className="text-sm font-bold tracking-widest uppercase">{title}</h3>
            </div>
            {action && <div>{action}</div>}
        </div>
    )
}

export function DataInsight({ label, value, highlight = false, className }: { label: string, value: React.ReactNode, highlight?: boolean, className?: string }) {
    return (
        <div className={className}>
            <p className="text-[10px] text-secondary-text font-bold uppercase tracking-wider mb-1">{label}</p>
            <p className={`text-sm ${highlight ? 'font-semibold text-emerald-600' : 'font-medium'}`}>{value}</p>
        </div>
    )
}
