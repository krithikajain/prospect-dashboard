import * as React from 'react';
import { Card, CardHeader } from '@/shared/components/Card';
import { MetricBox } from '@/shared/components/MetricBox';
import { useProspecting } from '@/context/ProspectingContext';

/**
 * Displays the prospect's organizational scale and status.
 * Reads live data from the LLM response in the SSoT. No props needed.
 */
export function OrganizationalFootprint() {
    const { prospectingData } = useProspecting();
    const orgFootprint = prospectingData.insights?.profile?.orgFootprint;

    const cards = [];

    if (orgFootprint?.fundingValue && orgFootprint.fundingValue !== 'null' && orgFootprint.fundingValue !== '—') {
        cards.push({
            label: "Funding",
            value: orgFootprint.fundingValue.split('|')[0]?.trim(),
            subValue: orgFootprint.fundingValue.includes('|') ? orgFootprint.fundingValue.split('|')[1]?.trim() : undefined,
            smallIcon: "payments"
        });
    }

    if (orgFootprint?.organizations && orgFootprint.organizations !== 'null' && orgFootprint.organizations !== '—') {
        cards.push({
            label: "Organizations",
            value: orgFootprint.organizations.split('|')[0]?.trim(),
            subValue: orgFootprint.organizations.includes('|') ? orgFootprint.organizations.split('|')[1]?.trim() : undefined,
            smallIcon: "corporate_fare"
        });
    }

    if (orgFootprint?.activeUsers && orgFootprint.activeUsers !== 'null' && orgFootprint.activeUsers !== '—') {
        cards.push({
            label: "Active Users",
            value: orgFootprint.activeUsers.split('|')[0]?.trim(),
            subValue: orgFootprint.activeUsers.includes('|') ? orgFootprint.activeUsers.split('|')[1]?.trim() : undefined,
            smallIcon: "groups"
        });
    }

    if (orgFootprint?.recentExit && orgFootprint.recentExit !== 'null' && orgFootprint.recentExit !== '—') {
        cards.push({
            label: "Recent Exit",
            value: orgFootprint.recentExit.split('|')[0]?.trim(),
            subValue: orgFootprint.recentExit.includes('|') ? orgFootprint.recentExit.split('|')[1]?.trim() : undefined,
            smallIcon: "moving"
        });
    }

    if (orgFootprint?.growthStage && orgFootprint.growthStage !== 'null' && orgFootprint.growthStage !== '—') {
        cards.push({
            label: "Growth Stage",
            value: orgFootprint.growthStage.split('|')[0]?.trim(),
            subValue: orgFootprint.growthStage.includes('|') ? orgFootprint.growthStage.split('|')[1]?.trim() : undefined,
            smallIcon: "trending_up"
        });
    }

    const gridCols = cards.length === 1 ? 'md:grid-cols-1' :
        cards.length === 2 ? 'md:grid-cols-2' :
            cards.length === 3 ? 'md:grid-cols-3' :
                cards.length === 4 ? 'md:grid-cols-4' :
                    'md:grid-cols-5';

    if (cards.length === 0) return null;

    return (
        <Card padding="sm" className="h-full flex flex-col justify-center">
            <CardHeader icon="business" title="Organizational Footprint" className="mb-2" />
            <div className={`grid grid-cols-2 ${gridCols} gap-3 flex-1 items-center mt-2 mb-2`}>
                {cards.map((c) => (
                    <MetricBoxHover
                        key={c.label}
                        label={c.label}
                        value={c.value!}
                        subValue={c.subValue}
                        smallIcon={c.smallIcon}
                        valueClassName="text-[19px] whitespace-nowrap"
                    />
                ))}
            </div>
        </Card>
    );
}

/**
 * Enhanced wrapper for MetricBox with hover animations.
 */
function MetricBoxHover(props: React.ComponentProps<typeof MetricBox>) {
    return (
        <div className="group/tile transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md rounded-2xl">
            <MetricBox
                {...props}
                className={`transition-colors duration-200 group-hover/tile:bg-slate-100/80 group-hover/tile:border-slate-200 ${props.className ?? ''}`}
            />
        </div>
    );
}
