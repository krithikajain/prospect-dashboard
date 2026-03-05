import { Card } from '@/shared/components/Card';
import type { TimelineEvaluation } from '@/lib/domain/timelineEvaluation';
import { getPressureTheme, themeVariants, type PressureLevel } from '@/lib/theme';
import { StatusTag } from '@/shared/components/StatusTag';

export function CompellingEventsStrip({
    events,
}: TimelineEvaluation['compellingEvents']) {
    if (events.length === 0) {
        return (
            <Card className="p-4 bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-slate-300 text-[20px]">hourglass_empty</span>
                <span className="text-[12px] text-slate-500 font-medium">No active forcing function identified.</span>
            </Card>
        );
    }

    const typeIcons: Record<string, string> = {
        regulatory: 'gavel',
        fiscal: 'account_balance',
        competitive: 'flag',
        market: 'trending_up'
    };

    const typeTheme: Record<string, keyof typeof themeVariants> = {
        regulatory: 'purple',
        fiscal: 'blue',
        competitive: 'orange',
        market: 'teal'
    };

    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-slate-500 ml-1">Compelling Events & Deadlines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {events.map((evt, i) => {
                    const themeKey = typeTheme[evt.type] || 'slate';
                    const tColorObj = themeVariants[themeKey] || themeVariants.slate;
                    const pressureTheme = getPressureTheme(evt.pressure as PressureLevel);

                    return (
                        <Card key={i} className="p-4 bg-white border border-slate-200 shadow-sm relative overflow-hidden">
                            <div className="flex justify-between items-start mb-3 mt-1">
                                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border ${tColorObj}`}>
                                    <span className="material-symbols-outlined text-[12px] opacity-70">{typeIcons[evt.type] || 'event'}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-wider">{evt.type}</span>
                                </div>

                                <StatusTag label={evt.pressure} variant={pressureTheme} className="!border-0 !px-2 !py-0.5 !text-[9px]" />
                            </div>

                            <p className="text-[13px] font-semibold text-slate-800 leading-snug mb-4" title={evt.label}>
                                {evt.label.split('.')[0] + (evt.label.includes('.') ? '.' : '')}
                            </p>

                            <div className="flex items-end justify-between mt-auto">
                                <div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Target Date</span>
                                    <span className="text-[12px] font-bold text-slate-700">{evt.date || 'TBD'}</span>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
