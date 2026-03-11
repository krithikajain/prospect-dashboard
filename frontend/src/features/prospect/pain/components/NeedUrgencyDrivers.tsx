import { Card, CardHeader } from '@/shared/components/Card';
import { ChecklistItem } from '@/shared/components/ChecklistItem';

/**
 * "Why Now?" urgency drivers checklist for the Need stage.
 */
export function NeedUrgencyDrivers() {
    return (
        <Card className="p-6 group hover:shadow-md transition-all duration-300 bg-white border border-gray-100 h-full">
            <CardHeader icon="bolt" title="3. Urgency Drivers" />
            <p className="text-[11px] font-medium text-gray-400 mb-4 px-1">(Why Now?)</p>
            <div className="space-y-3">
                <ChecklistItem label="Budget Window Closing" description="Q4 Fiscal Year End approaching" checked />
                <ChecklistItem label="Leadership Push" description="Board mandated operational efficiency" checked />
                <ChecklistItem label="Regulatory Change" description="No immediate compliance threat" checked={false} />
            </div>
        </Card>
    );
}
