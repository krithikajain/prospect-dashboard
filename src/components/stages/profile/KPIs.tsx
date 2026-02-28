import { Card, CardHeader } from '@/components/ui/Card';
import type { DashboardData } from '@/types/dashboard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface KPIsProps {
    kpis?: DashboardData['profile_fit']['business']['kpis'];
}

export function KPIs({ kpis }: KPIsProps) {
    if (!kpis) return null;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-slate-800 mb-1">{`Year ${label}`}</p>
                    <p className="text-sm text-slate-600">{`Revenue Growth: ${data.revenue_growth}%`}</p>
                    <p className="text-sm text-emerald-600">{`Net Profit Margin: ${data.net_profit_margin}%`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card padding="sm" className="flex flex-col h-full hover:shadow-2xl transition-all duration-300">
            <CardHeader icon="monitoring" title="KPIs" className="mb-2" />
            <div className="flex-1 mt-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3 block">Revenue Growth (5Y)</span>
                <div className="h-[140px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={kpis.revenue_history} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} dy={10} />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 11 }}
                                tickFormatter={(val) => `${val}%`}
                                dx={-10}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="revenue_growth"
                                stroke="#1E293B"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#1E293B', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 6, fill: '#0F172A', strokeWidth: 2, stroke: '#fff' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>
    );
}
