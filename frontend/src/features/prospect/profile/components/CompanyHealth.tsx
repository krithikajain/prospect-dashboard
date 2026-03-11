import { Card, CardHeader, DataInsight } from '@/shared/components/Card';
import { useProspecting } from '@/context/ProspectingContext';

/**
 * A layout component that presents a high-level summary of the company's vital signs.
 * Reads live data from the LLM response in the SSoT (useProspecting).
 * All fields have safe fallbacks — no crash if data is not yet loaded.
 */
export function CompanyHealth() {
    const { prospectingData } = useProspecting();
    const llm = prospectingData.insights?.profile;
    const ch = llm?.companyHealth;

    // Format market share from decimal (0.15) → "15%", or null
    const marketShare = ch?.marketShare != null
        ? `${(ch.marketShare * 100).toFixed(0)}%`
        : null;

    const hiringVelocity = ch?.hiringVelocity ?? null;
    const employees = ch?.employees != null ? `${ch.employees.toLocaleString()}+` : null;

    // Parse industry to show top level and hover for the rest
    // Expected format from LLM: "Diversified Technology — Cloud Computing, Software, AI"
    const industryParts = ch?.industry?.split(/[-—–]/) || [];
    let mainIndustry = industryParts[0]?.trim() || '—';
    let subIndustries = industryParts.slice(1).join('—').trim() || null;

    // Fallback if LLM just used commas instead of dashes
    if (!subIndustries && mainIndustry.includes(',')) {
        const parts = mainIndustry.split(',');
        mainIndustry = parts[0].trim();
        subIndustries = parts.slice(1).join(', ').trim();
    }

    // We can use the native title attribute or a custom tooltip class, native title is easiest
    const industryNode = subIndustries ? (
        <span className="cursor-help flex items-center gap-1 group relative">
            <span className="truncate">{mainIndustry}</span>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full whitespace-nowrap group-hover:bg-slate-200 transition-colors">
                +{subIndustries.split(',').length}
            </span>
            <div className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full left-0 mt-2 bg-slate-800 text-white text-xs p-2 rounded shadow-lg z-50 min-w-[200px] whitespace-normal pointer-events-none transition-all duration-200">
                {subIndustries}
            </div>
        </span>
    ) : (
        mainIndustry
    );

    return (
        <Card padding="sm" className="h-full">
            <CardHeader icon="domain" title="Company Health" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-3">
                <DataInsight label="Industry" value={industryNode} />
                <DataInsight label="Revenue" value={ch?.revenueRange ?? '—'} />
                <DataInsight label="Headquarters" value={ch?.geography ?? '—'} />
                <DataInsight label="Employees" value={employees ?? '—'} />
                {hiringVelocity && (
                    <DataInsight label="Hiring Velocity" value={hiringVelocity} highlight />
                )}
                {marketShare && (
                    <DataInsight label="Market Share" value={marketShare} />
                )}
            </div>
        </Card>
    );
}
