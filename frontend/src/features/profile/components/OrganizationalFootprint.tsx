import * as React from 'react';
import { Card, CardHeader } from '@/shared/components/Card';
import { MetricBox } from '@/shared/components/MetricBox';
import type { DashboardData } from '@/types/dashboard';

/**
 * Props for the OrganizationalFootprint component.
 */
interface OrganizationalFootprintProps {
    /** The normalized dashboard data providing company profile details. */
    data?: DashboardData;
}

/**
 * A top-level summary component displaying the prospect's organizational scale and status.
 * Renders a horizontal band of interactive metrics including funding, user count, and growth stage.
 * Features hover-reactive tiles for enhanced user engagement.
 * 
 * @param {OrganizationalFootprintProps} props - The component props.
 * @returns {JSX.Element} The rendered OrganizationalFootprint component.
 */
export function OrganizationalFootprint({ data }: OrganizationalFootprintProps) {
    const fundingStatus = data?.profile_fit?.company?.funding_status;
    const stageLabel = fundingStatus ? `${fundingStatus}` : 'Series C';

    return (
        <Card padding="sm" className="h-full flex flex-col justify-center">
            <CardHeader icon="business" title="Organizational Footprint" className="mb-2" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 flex-1 items-center mt-2 mb-2">
                <MetricBoxHover label="Funding" value="$120M" smallIcon="payments" />
                <MetricBoxHover label="Organizations" value="1,500+" smallIcon="corporate_fare" />
                <MetricBoxHover label="Active Users" value="10 M+" smallIcon="groups" />
                <MetricBoxHover label="Recent Exit" value="$1.7 B" smallIcon="moving" />
                <MetricBoxHover label="Growth Stage" value={stageLabel} smallIcon="trending_up" className="col-span-2 md:col-span-1" />
            </div>
        </Card>
    );
}

/**
 * Enhanced wrapper for the MetricBox component that adds hover animations and shadow effects.
 * 
 * @param {React.ComponentProps<typeof MetricBox>} props - Standard MetricBox props.
 * @returns {JSX.Element} The rendered MetricBoxHover component.
 */
function MetricBoxHover(props: React.ComponentProps<typeof MetricBox>) {
    return (
        <div className="group/tile transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md rounded-2xl">
            <MetricBox {...props} className={`transition-colors duration-200 group-hover/tile:bg-slate-100/80 group-hover/tile:border-slate-200 ${props.className ?? ''}`} />
        </div>
    );
}
