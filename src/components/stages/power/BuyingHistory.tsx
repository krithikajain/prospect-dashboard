import { Card, CardHeader } from '@/components/ui/Card';

/**
 * Buying Behavior History card showing past purchase patterns.
 */
export function BuyingHistory() {
    return (
        <Card className="p-6 group hover:shadow-lg transition-all duration-300">
            <CardHeader icon="history" title="4. Buying Behavior History" />
            <div className="mt-4 space-y-4">
                <HistoryBlock
                    icon="shopping_bag"
                    iconColor="text-blue-500"
                    bgColor="bg-blue-50/50 border-blue-100/50"
                    labelColor="text-blue-800/60"
                    label="Bought Similar Tools?"
                    text="Yes, history of large enterprise software deployments (e.g., Salesforce, Workday integrations)."
                />
                <HistoryBlock
                    icon="hub"
                    iconColor="text-emerald-500"
                    bgColor="bg-emerald-50/50 border-emerald-100/50"
                    labelColor="text-emerald-800/60"
                    label="Purchasing Structure"
                    text="Centralized. IT procurement dictates terms, but business units hold final vendor selection power."
                />
            </div>
        </Card>
    );
}

function HistoryBlock({ icon, iconColor, bgColor, labelColor, label, text }: {
    icon: string; iconColor: string; bgColor: string; labelColor: string; label: string; text: string;
}) {
    return (
        <div className={`${bgColor} border p-4 rounded-xl flex items-start gap-4`}>
            <span className={`material-symbols-outlined ${iconColor} mt-0.5`}>{icon}</span>
            <div>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${labelColor} block mb-0.5`}>{label}</span>
                <span className="text-sm font-medium text-slate-800 leading-snug">{text}</span>
            </div>
        </div>
    );
}
