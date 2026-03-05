import { Card } from '@/shared/components/Card';

/**
 * Dark-themed card showing procurement champion verification status.
 */
export function ProcurementHistory() {
    return (
        <Card className="h-full p-6 bg-gradient-to-br from-[#161616] to-[#2c2c2c] border-white/5 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-emerald-400 text-xl">history_edu</span>
                <h3 className="text-white font-bold tracking-tight">Procurement History</h3>
            </div>

            <div className="flex flex-col items-center justify-center py-6 text-center h-[calc(100%-40px)]">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                    <span className="material-symbols-outlined text-[32px]">verified</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Known Champion</h4>
                <p className="text-xs text-gray-400 leading-relaxed px-4">
                    LinkedIn recommendations suggest they successfully navigated cross-departmental alignment for a major infrastructure pivot in 2022.
                </p>
            </div>
        </Card>
    );
}
