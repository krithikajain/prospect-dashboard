import { Card, CardHeader } from '@/components/ui/Card';
import { MetricBox } from '@/components/ui/MetricBox';

/**
 * Top-row band showing funding, organizations, active users, and recent exit.
 */
export function OrganizationalFootprint() {
    return (
        <Card>
            <CardHeader icon="business" title="Organizational Footprint" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricBox label="Funding" value="$120M" />
                <MetricBox label="Organizations" value="1,500+" />
                <MetricBox label="Active Users" value="10 M+" />
                <MetricBox label="Recent Exit" value="$1.7 B" />
            </div>
        </Card>
    );
}
