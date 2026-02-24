import { Card, CardHeader } from '@/components/ui/Card';
import { MetricBox } from '@/components/ui/MetricBox';
import { ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

interface CompanyHealthProps {
    revenueRange?: string;
    growthStage?: string;
    fundingStatus?: string;
}

const revenueChartData = [{ v: 20 }, { v: 25 }, { v: 35 }, { v: 50 }, { v: 75 }, { v: 95 }];
const hiringChartData = [{ v: 30 }, { v: 20 }, { v: 40 }, { v: 60 }, { v: 50 }, { v: 85 }];

/**
 * Company health card: revenue bar chart, hiring trend area chart, growth stage.
 */
export function CompanyHealth({ revenueRange, growthStage, fundingStatus }: CompanyHealthProps) {
    return (
        <Card className="h-full">
            <CardHeader icon="domain" title="Company Health" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Revenue */}
                <MetricBox
                    label="Revenue"
                    value={revenueRange || '$50M - $100M'}
                    trend={{ direction: 'up', label: '32% YoY' }}
                    className="h-32"
                    chart={
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <Bar dataKey="v" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    }
                />

                {/* Hiring Trend */}
                <MetricBox
                    label="Hiring Trend"
                    value="Expanding"
                    trend={{ direction: 'up', label: '+15%' }}
                    className="h-32"
                    chart={
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={hiringChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <Area type="monotone" dataKey="v" stroke="#10b981" fill="#10b981" />
                            </AreaChart>
                        </ResponsiveContainer>
                    }
                />

                {/* Growth Stage */}
                <MetricBox
                    label="Growth Stage"
                    value={growthStage || 'N/A'}
                    icon="account_tree"
                    className="h-32 justify-center"
                />
                {fundingStatus && (
                    <span className="absolute bottom-4 left-4 px-2 py-0.5 rounded border border-purple-200 bg-purple-50 text-[10px] font-bold uppercase tracking-wider text-purple-600">
                        {fundingStatus}
                    </span>
                )}
            </div>
        </Card>
    );
}
