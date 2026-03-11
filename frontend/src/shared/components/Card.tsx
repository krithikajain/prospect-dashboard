import * as React from "react"

/**
 * Props for the Card component.
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 
     * Padding size for the card.
     * @default 'md'
     */
    padding?: 'sm' | 'md' | 'lg' | 'none';
}

/**
 * A reusable container component with glassmorphism styling.
 * 
 * @param {CardProps} props - The component props.
 * @returns {JSX.Element} The rendered Card component.
 */
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

/**
 * Standard header for Card components, includes an optional icon and action.
 * 
 * @param {Object} props - The component props.
 * @param {string} [props.icon] - Google Material Symbols icon name.
 * @param {string} props.title - Title text for the card.
 * @param {React.ReactNode} [props.action] - Optional element to display on the right side.
 * @param {string} [props.className] - Additional CSS classes.
 * @returns {JSX.Element} The rendered CardHeader component.
 */
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

/**
 * Displays a single labeled data point within a card grid.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.label - Small uppercase label for the data point.
 * @param {React.ReactNode} props.value - The value to display.
 * @param {boolean} [props.highlight] - Whether to highlight the value with emerald color.
 * @param {string} [props.className] - Additional CSS classes.
 * @returns {JSX.Element} The rendered DataInsight component.
 */
export function DataInsight({ label, value, highlight = false, className }: { label: string, value: React.ReactNode, highlight?: boolean, className?: string }) {
    return (
        <div className={className}>
            <p className="text-[10px] text-secondary-text font-bold uppercase tracking-wider mb-1">{label}</p>
            <div className={`text-sm ${highlight ? 'font-semibold text-emerald-600' : 'font-medium'}`}>{value}</div>
        </div>
    )
}
