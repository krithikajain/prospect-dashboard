import { Card, CardHeader } from '@/components/ui/Card';
import { ChecklistItem } from '@/components/ui/ChecklistItem';

/**
 * Urgency Drivers checklist — reasons they need to buy now.
 */
export function UrgencyDrivers() {
    return (
        <Card className="p-6">
            <CardHeader icon="local_fire_department" title="Urgency Drivers" />
            <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-1 mb-5">Why must they buy today?</p>

            <div className="space-y-3">
                <ChecklistItem label="Budget cycle expiry" checked />
                <ChecklistItem label="Competitive threat (New entrant)" checked />
                <ChecklistItem label="Compliance deadline" checked={false} />
                <ChecklistItem label="Executive mandate" checked={false} />
            </div>
        </Card>
    );
}
