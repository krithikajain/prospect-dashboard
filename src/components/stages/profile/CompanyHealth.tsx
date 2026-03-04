import { Card, CardHeader, DataInsight } from '@/components/ui/Card';
import type { DashboardData } from '@/types/dashboard';

/**
 * Props for the CompanyHealth component.
 */
interface CompanyHealthProps {
    /** The normalized prospect dashboard data. */
    data: DashboardData;
}

/**
 * A layout component that presents a high-level summary of the company's vital signs.
 * Includes industry focus, financial range, geographic presence, and workforce velocity.
 * 
 * @param {CompanyHealthProps} props - The component props.
 * @returns {JSX.Element} The rendered CompanyHealth component.
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
            </div>
        </Card>
    );
}
