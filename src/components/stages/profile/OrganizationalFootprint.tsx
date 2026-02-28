import * as React from 'react';
import { Card, CardHeader } from '@/components/ui/Card';
import { MetricBox } from '@/components/ui/MetricBox';
import type { DashboardData } from '@/types/dashboard';

interface OrganizationalFootprintProps { data?: DashboardData; }

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

function MetricBoxHover(props: React.ComponentProps<typeof MetricBox>) {
    return (
        <div className="group/tile transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md rounded-2xl">
            <MetricBox {...props} className={`transition-colors duration-200 group-hover/tile:bg-slate-100/80 group-hover/tile:border-slate-200 ${props.className ?? ''}`} />
        </div>
    );
}
