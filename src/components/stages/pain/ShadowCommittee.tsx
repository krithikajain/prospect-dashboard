import { Card, CardHeader } from '@/components/ui/Card';
import { InfoRow } from '@/components/ui/InfoRow';

interface ShadowCommitteeProps {
    role: string;
}

/**
 * Shadow buying committee card — roles expected to weigh in on the deal.
 */
export function ShadowCommittee({ role }: ShadowCommitteeProps) {
    return (
        <Card className="h-full p-6">
            <CardHeader icon="groups" title="Shadow Committee" />
            <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-1 mb-4 leading-relaxed">
                Based on {role} historically, expect these cross-functional roles to inevitably weigh in.
            </p>
            <div className="flex flex-col gap-3">
                <InfoRow icon="gavel" iconColor="bg-indigo-50 text-indigo-500" title="Legal & Compliance" description="Expected friction: High" />
                <InfoRow icon="shield_person" iconColor="bg-emerald-50 text-emerald-500" title="IT Security Operations" description="Requires SOC2 / ISO validation" />
                <InfoRow icon="request_quote" iconColor="bg-amber-50 text-amber-500" title="Procurement Desk" description="Standard vendor onboarding" />
            </div>
        </Card>
    );
}
