import { Card, CardHeader } from '@/components/ui/Card';

interface AuthorityPathProps {
    contactName: string;
}

/**
 * Vertical signature path: Contact → (1 hop) → Economic Buyer.
 */
export function AuthorityPath({ contactName }: AuthorityPathProps) {
    return (
        <Card className="p-6 group hover:shadow-lg transition-all duration-300">
            <CardHeader icon="manage_accounts" title="1. Authority" />
            <div className="mt-4">
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Contact Tag:</span>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md text-xs font-semibold border border-emerald-100">Decision Maker</span>
                </div>

                <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-6 mt-1">The Signature Path</p>

                <div className="flex flex-col gap-6 relative px-2">
                    {/* Contact */}
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border-2 border-white bg-blue-50 text-blue-600 flex items-center justify-center shadow-md shrink-0">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contactName}`} alt="Contact" className="w-full h-full rounded-full" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">{contactName}</p>
                                <p className="text-xs text-gray-500 font-medium">Internal Champion</p>
                            </div>
                        </div>
                    </div>

                    {/* Hop indicator */}
                    <div className="flex items-center gap-3 pl-5">
                        <div className="w-0.5 h-8 bg-gray-200" />
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full">
                            <span className="material-symbols-outlined text-[14px] text-amber-500">social_distance</span>
                            <span className="text-[10px] text-amber-600 font-semibold uppercase tracking-wider">Distance: 1 Hop</span>
                        </div>
                    </div>

                    {/* Economic Buyer */}
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border-2 border-white bg-blue-500 text-white flex items-center justify-center shadow-sm shrink-0">
                                <span className="material-symbols-outlined text-[20px]">account_balance</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">CFO / Board</p>
                                <p className="text-xs text-blue-600 font-bold">Economic Buyer (0 Hops)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
