import { Card } from './Card';

/**
 * Props for the SkeletonCard component.
 */
interface SkeletonCardProps {
    /** 
     * Optional height class for the skeleton card. 
     * @default 'h-full min-h-[400px]'
     */
    className?: string;
    /** 
     * Specific padding for the inner card. 
     * @default 'md'
     */
    padding?: 'sm' | 'md' | 'lg' | 'none';
}

/**
 * A standard loading skeleton component structured like a dashboard card.
 * Integrates an animated pulse effect to provide UI feedback during data fetching.
 * 
 * @param {SkeletonCardProps} props - The component props.
 * @returns {JSX.Element} The rendered SkeletonCard component.
 */
export function SkeletonCard({ className = 'h-full min-h-[400px]', padding = 'md' }: SkeletonCardProps) {
    return (
        <Card padding={padding} className={`w-full flex flex-col bg-white ${className}`}>
            {/* Header Skeleton */}
            <div className="flex items-center gap-3 mb-8 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
                <div className="h-5 bg-slate-200 rounded-md w-1/3" />
            </div>

            {/* Content Skeleton (Grid) */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse mt-2">
                <div className="space-y-3">
                    <div className="h-3 bg-slate-200 rounded w-1/4" />
                    <div className="h-8 bg-slate-200 rounded w-3/4" />
                </div>
                <div className="space-y-3">
                    <div className="h-3 bg-slate-200 rounded w-1/4" />
                    <div className="h-8 bg-slate-200 rounded w-2/3" />
                </div>

                {/* Full Width Row */}
                <div className="col-span-1 md:col-span-2 space-y-3 pt-4">
                    <div className="h-3 bg-slate-200 rounded w-1/5" />
                    <div className="h-20 bg-slate-200 rounded w-full" />
                </div>
            </div>
        </Card>
    );
}
