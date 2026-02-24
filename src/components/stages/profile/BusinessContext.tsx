import { Card, CardHeader } from '@/components/ui/Card';

interface BusinessContextProps {
    recentNews?: string;
    marketPressures?: string;
    digitalMaturity?: string;
}

/**
 * Business context card showing recent news, market pressures, and digital maturity.
 */
export function BusinessContext({ recentNews, marketPressures, digitalMaturity }: BusinessContextProps) {
    return (
        <Card className="h-full hover:shadow-2xl hover:border-slate-300 transition-all duration-300 group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative z-10">
                <CardHeader icon="moving" title="Business Context" />
                <div className="space-y-3">
                    <ContextField label="Recent News" value={recentNews} />
                    <ContextField label="Market Pressures" value={marketPressures} />
                    <ContextField label="Digital Maturity" value={digitalMaturity} />
                </div>
            </div>
        </Card>
    );
}

function ContextField({ label, value }: { label: string; value?: string }) {
    return (
        <div>
            <p className="text-[10px] text-secondary-text font-bold uppercase tracking-wider mb-1">{label}</p>
            <p className="text-xs text-secondary-text leading-snug line-clamp-2">{value || 'No data available'}</p>
        </div>
    );
}
