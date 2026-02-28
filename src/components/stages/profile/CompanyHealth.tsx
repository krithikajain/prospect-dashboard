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
        <Card padding="sm" className="h-full">
            <CardHeader icon="domain" title="Company Health" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-3">
                <DataInsight label="Industry" value={data.industry_trends?.industry || "SaaS"} />
                <DataInsight label="Revenue" value={pf?.company?.revenue_range} />
                <DataInsight label="Headquarters" value={pf?.company?.geography} />
                <DataInsight label="Employees" value={pf?.business?.kpis?.employees} />
                <DataInsight label="Hiring Velocity" value={pf?.business?.kpis?.hiring_velocity} highlight />
                <DataInsight label="Market Share" value={pf?.business?.kpis?.market_share} />
                {/* <DataInsight className="col-span-1 md:col-span-2" label="Growth Stage" value={<span className="bg-slate-900 text-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold">{pf?.company?.growth_stage} • {pf?.company?.funding_status}</span>} /> */}
            </div>
        </Card>
    );
}
