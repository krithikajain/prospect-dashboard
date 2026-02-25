import { Card, CardHeader } from '@/components/ui/Card';
import { InfoRow } from '@/components/ui/InfoRow';

/**
 * Stakeholders Involved card: legal, IT security, procurement with friction tags.
 */
export function StakeholdersInvolved() {
    return (
        <Card className="p-6 group hover:shadow-lg transition-all duration-300">
            <CardHeader icon="groups" title="2. Stakeholders Involved" />
            <div className="mt-4 flex flex-col gap-4">
                <InfoRow
                    icon="gavel"
                    iconColor="bg-indigo-50 text-indigo-500"
                    title="Legal & Compliance"
                    description="Contract review expected to take 3 weeks."
                    trailing={<FrictionTag label="Friction: High" />}
                />
                <InfoRow
                    icon="shield_person"
                    iconColor="bg-emerald-50 text-emerald-500"
                    title="IT Security"
                    description="Must pass vendor architectural review board."
                    trailing={<FrictionTag label="SOC2 Required" />}
                />
                <InfoRow
                    icon="request_quote"
                    iconColor="bg-amber-50 text-amber-500"
                    title="Procurement"
                    description="Requires 3 competitive bids or sole source justification."
                    trailing={<FrictionTag label="Standard Onboarding" />}
                />
            </div>
        </Card>
    );
}

function FrictionTag({ label }: { label: string }) {
    return (
        <span className="text-[10px] text-gray-500 font-semibold bg-white border border-gray-100 px-2 py-0.5 rounded-full shrink-0">
            {label}
        </span>
    );
}
