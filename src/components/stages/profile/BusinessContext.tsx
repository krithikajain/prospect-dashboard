import { Card, CardHeader } from '@/components/ui/Card';

/**
 * Props for the BusinessContext component.
 */
interface BusinessContextProps {
    /** Summary of recent publicly available news or events. */
    recentNews?: string;
    /** Summary of current pressures in the prospect's specific market. */
    marketPressures?: string;
    /** Qualitative assessment of the prospect's digital adoption levels. */
    digitalMaturity?: string;
}

/**
 * A card component that provides qualitative context on the prospect's business environment.
 * Highlights key external drivers like news, market trends, and internal maturity.
 * 
 * @param {BusinessContextProps} props - The component props.
 * @returns {JSX.Element} The rendered BusinessContext component.
 */
export function BusinessContext({ recentNews, marketPressures, digitalMaturity }: BusinessContextProps) {
    return (
        <Card padding="sm" className="h-full hover:shadow-2xl hover:border-slate-300 transition-all duration-300 group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
                <CardHeader icon="moving" title="Business Context" className="mb-2" />
                <div className="space-y-2 mt-2 flex-1 flex flex-col justify-center">
                    <ContextField label="Recent News" value={recentNews} />
                    <ContextField label="Market Pressures" value={marketPressures} />
                    <ContextField label="Digital Maturity" value={digitalMaturity} />
                </div>
            </div>
        </Card>
    );
}

/**
 * Internal auxiliary component for rendering an individual context data point.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.label - Small uppercase label for the context field.
 * @param {string} [props.value] - The qualitative text content.
 * @returns {JSX.Element} The rendered ContextField component.
 */
function ContextField({ label, value }: { label: string; value?: string }) {
    return (
        <div className="p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-300 rounded-lg border border-transparent hover:border-gray-200">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">{label}</p>
            <p className="text-xs text-gray-700 leading-snug line-clamp-2">{value || 'No data available'}</p>
        </div>
    );
}
