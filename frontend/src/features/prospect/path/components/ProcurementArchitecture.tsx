import { Card, CardHeader } from '@/shared/components/Card';
import { getSequencePastelColor, getSequenceIcon } from '@/lib/theme';

export function ProcurementArchitecture({
    steps,
    bottlenecks,
}: {
    steps: string[];
    bottlenecks: string[];
}) {
    if (steps.length === 0 && bottlenecks.length === 0) return null;

    const mappedSteps = steps.map(step => {
        const matched = bottlenecks.filter(b => {
            const bNormalized = b.toLowerCase();
            const sNormalized = step.toLowerCase();
            return bNormalized.includes(sNormalized) || sNormalized.includes(bNormalized.split('(')[0].trim());
        });
        return { step, bottlenecks: matched };
    });

    const mappedStrs = mappedSteps.flatMap(s => s.bottlenecks);
    const unmappedBottlenecks = bottlenecks.filter(b => !mappedStrs.includes(b));

    return (
        <Card className="p-6 bg-white border border-gray-200 flex flex-col gap-6 overflow-hidden">
            <CardHeader icon="account_tree" title="Procurement Architecture" />

            {mappedSteps.length > 0 && (
                <div className="flex w-full py-2 hidden sm:flex">
                    {mappedSteps.map((mapped, i) => {
                        const isFirst = i === 0;
                        const isLast = i === mappedSteps.length - 1;

                        let clip = 'polygon(0 0, calc(100% - 24px) 0, 100% 50%, calc(100% - 24px) 100%, 0 100%, 24px 50%)';
                        if (isFirst && isLast) {
                            clip = 'none';
                        } else if (isFirst) {
                            clip = 'polygon(0 0, calc(100% - 24px) 0, 100% 50%, calc(100% - 24px) 100%, 0 100%)';
                        }

                        const bgColor = getSequencePastelColor(i);
                        const icon = getSequenceIcon(i);

                        return (
                            <div key={i} className={`flex-1 flex flex-col items-center relative ${!isFirst ? '-ml-4' : ''}`}>
                                <div
                                    className={`w-full flex-shrink-0 flex flex-col items-center justify-center min-h-[90px] ${bgColor} text-slate-800 px-2 py-4 relative shadow-sm`}
                                    style={{ clipPath: clip }}
                                >
                                    <span className={`material-symbols-outlined text-[28px] mb-2 font-light ${isFirst ? 'pl-2' : ''} ${isLast ? 'pr-2' : 'pr-6'}`}>
                                        {icon}
                                    </span>
                                    <span className={`text-center font-bold text-[10px] md:text-[11px] uppercase tracking-wider px-1 leading-snug ${isFirst ? 'pl-2' : ''} ${isLast ? 'pr-2' : 'pr-6'}`}>
                                        {mapped.step}
                                    </span>
                                </div>

                                {mapped.bottlenecks.length > 0 && (
                                    <div className={`mt-2 flex flex-col items-center text-center px-1 ${!isFirst ? 'pl-5' : ''}`}>
                                        <div className="w-0.5 h-6 bg-red-200 mb-1" />
                                        <span className="material-symbols-outlined text-[16px] text-red-500 mb-1">warning</span>
                                        {mapped.bottlenecks.map((b, idx) => {
                                            const bText = b.replace(mapped.step, '').replace(/[()]/g, '').trim() || b;
                                            return (
                                                <p key={idx} className="text-[11px] text-red-700 font-bold leading-tight bg-red-50 border border-red-100 px-2 py-1 rounded w-full max-w-[120px] break-words shadow-sm">
                                                    {bText}
                                                </p>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {mappedSteps.length > 0 && (
                <div className="flex flex-col gap-2 sm:hidden">
                    {mappedSteps.map((mapped, i) => {
                        const bgColor = getSequencePastelColor(i);
                        const icon = getSequenceIcon(i);
                        return (
                            <div key={i} className="flex flex-col gap-2">
                                <div className={`flex items-center gap-3 p-3 rounded-md ${bgColor} text-slate-800 shadow-sm`}>
                                    <span className="material-symbols-outlined">{icon}</span>
                                    <span className="font-bold text-[12px] uppercase tracking-wider">{mapped.step}</span>
                                </div>
                                {mapped.bottlenecks.map((b, idx) => {
                                    const bText = b.replace(mapped.step, '').replace(/[()]/g, '').trim() || b;
                                    return (
                                        <div key={idx} className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-md p-2 ml-4">
                                            <span className="material-symbols-outlined text-[14px] text-red-500 shrink-0">warning</span>
                                            <p className="text-[11px] text-red-700 font-bold leading-snug">{bText}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            )}

            {unmappedBottlenecks.length > 0 && (
                <div className="mt-4 border-t border-gray-100 pt-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 flex items-center gap-1.5 mb-4">
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        General Bottlenecks
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {unmappedBottlenecks.map((b, i) => (
                            <div key={i} className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg p-3">
                                <span className="material-symbols-outlined text-[15px] text-red-500 shrink-0 mt-0.5">block</span>
                                <p className="text-[12px] text-red-800 font-semibold leading-snug">{b}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}
