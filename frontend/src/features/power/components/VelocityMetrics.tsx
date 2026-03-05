import { Card } from '@/shared/components/Card';
import { ScoreDisplay } from '@/shared/components/ScoreDisplay';
import { StatusTag } from '@/shared/components/StatusTag';
import { glassVariants, themeVariants } from '@/lib/theme';
import type { VelocityScores } from './velocityScoring';
export function VelocityMetrics({ scores }: { scores: VelocityScores }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* 1. Velocity & Path Score */}
                <Card className={`flex flex-col shrink-0 p-6 pt-5 min-h-[160px] border shadow-sm transition-colors duration-300 ${scores.lightLabel === 'Green Light' ? glassVariants.emerald :
                    scores.lightLabel === 'Yellow Light' ? glassVariants.amber :
                        glassVariants.red
                    }`}>
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-xs font-bold text-gray-500 tracking-[0.15em] uppercase">Velocity Score</p>
                        <StatusTag
                            label={scores.lightLabel}
                            variant={scores.lightLabel === 'Green Light' ? 'emerald' : scores.lightLabel === 'Yellow Light' ? 'amber' : 'red'}
                            icon={scores.lightLabel === 'Green Light' ? 'traffic' : scores.lightLabel === 'Yellow Light' ? 'warning' : 'block'}
                            className="h-fit"
                        />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4 relative z-10 w-full mt-2">
                        <ScoreDisplay
                            score={scores.velocityPath}
                            tooltip={
                                <>
                                    <div className="font-semibold text-white text-sm mb-2 pb-2 border-b border-gray-700">Calculation Logic</div>
                                    <div className="space-y-1.5 font-medium">
                                        <div className="flex justify-between"><span>Ecosystem Fit:</span> <span className="text-emerald-400">{scores.ecosystemFit}</span></div>
                                        <div className="flex justify-between"><span>Access Strength:</span> <span className="text-emerald-400">{scores.accessStrength}</span></div>
                                        <div className="flex justify-between"><span>Intent:</span> <span className="text-emerald-400">{scores.intent}</span></div>
                                        <div className="my-1 border-t border-gray-600"></div>
                                        <div className="flex justify-between"><span>Base Average:</span> <span className="text-white">{Math.round((scores.ecosystemFit + scores.accessStrength + scores.intent) / 3)}</span></div>
                                        <div className="flex justify-between"><span>Friction Penalty:</span> <span className="text-red-400">-{Math.round(scores.switchingResistance * 0.50)}</span></div>
                                    </div>
                                </>
                            }
                        />
                    </div>
                    <p className="text-[13px] font-semibold text-slate-700 mt-2">Do the physics allow this deal to move?</p>
                </Card>

                {/* 2. Ecosystem Fit */}
                <Card className="flex flex-col shrink-0 p-6 pt-5 border shadow-sm group hover:shadow-md transition-shadow">
                    <p className="text-xs font-bold text-gray-500 tracking-[0.15em] uppercase mb-4">Ecosystem Fit</p>
                    <div className="flex gap-2 items-end mb-4">
                        <span className="text-4xl text-slate-800 font-light leading-none tracking-tight">{scores.ecosystemFit}</span>
                    </div>
                    <div className="mt-auto">
                        <StatusTag label="Medium Friction" variant="amber" icon="sync_problem" />
                        <p className="text-[11px] font-medium text-gray-400 mt-2 line-clamp-2">Is this plug-and-play or integration hell?</p>
                    </div>
                </Card>

                {/* 3. Access Strength */}
                <Card className="flex flex-col shrink-0 p-6 pt-5 border shadow-sm group hover:shadow-md transition-shadow">
                    <p className="text-xs font-bold text-gray-500 tracking-[0.15em] uppercase mb-4">Access Strength</p>
                    <div className="flex gap-2 items-end mb-4">
                        <span className="text-4xl text-slate-800 font-light leading-none tracking-tight">{scores.accessStrength}</span>
                    </div>
                    <div className="mt-auto">
                        <StatusTag label="Warm Path Confirmed" variant="emerald" icon="how_to_reg" />
                        <p className="text-[11px] font-medium text-gray-400 mt-2 line-clamp-2">Do I have a bridge inside the account?</p>
                    </div>
                </Card>

                {/* 4. Intent Score */}
                <Card className="flex flex-col shrink-0 p-6 pt-5 border shadow-sm group hover:shadow-md transition-shadow">
                    <p className="text-xs font-bold text-gray-500 tracking-[0.15em] uppercase mb-4">Intent Score</p>
                    <div className="flex gap-2 items-end mb-4">
                        <span className="text-4xl text-slate-800 font-light leading-none tracking-tight">{scores.intent}</span>
                    </div>
                    <div className="mt-auto">
                        <StatusTag label="Evaluating" variant="emerald" icon="search" />
                        <p className="text-[11px] font-medium text-gray-400 mt-2 line-clamp-2">Are they actively in-market?</p>
                    </div>
                </Card>

            </div>

            {/* Driver Tags */}
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mr-2">Primary Drivers</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border shadow-sm ${themeVariants.emerald}`}>Warm intro available</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border shadow-sm ${themeVariants.emerald}`}>Active hiring for migration</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border shadow-sm ${themeVariants.amber}`}>Security constraints</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border shadow-sm ${themeVariants.red}`}>High switching cost</span>
            </div>
        </div>
    );
}
