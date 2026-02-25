import { Card, CardHeader, DataInsight } from '@/components/ui/Card';
import type { DashboardData } from '@/types/dashboard';

interface CompanyHealthProps {
    data: DashboardData;
}

/**
 * Company health card: data insights grid layout.
 */
export function CompanyHealth({ data }: CompanyHealthProps) {
    const pf = data.profile_fit;
    return (
        <Card className="h-full">
            <CardHeader icon="domain" title="Company Health" />
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                <DataInsight label="Industry" value={data.industry_trends?.industry || "SaaS"} />
                <DataInsight label="Revenue" value={pf?.company?.revenue_range} />
                <DataInsight label="Geography" value={pf?.company?.geography} />
                <DataInsight label="Employees" value={data.identity?.company_size || "500-1000"} />
                <DataInsight label="Growth Stage" value={<span className="bg-slate-900 text-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold">{pf?.company?.growth_stage} • {pf?.company?.funding_status}</span>} />
                <DataInsight label="Hiring Trend" value={pf?.company?.hiring_trend} highlight />
            </div>
        </Card>
    );
}
