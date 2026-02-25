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
                <MetricBox label="Funding" value="$120M" smallIcon="payments" />
                <MetricBox label="Organizations" value="1,500+" smallIcon="corporate_fare" />
                <MetricBox label="Active Users" value="10 M+" smallIcon="groups" />
                <MetricBox label="Recent Exit" value="$1.7 B" smallIcon="moving" />
            </div>
        </Card>
    );
}
