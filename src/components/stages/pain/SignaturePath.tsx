import { Card } from '@/components/ui/Card';

interface SignaturePathProps {
    contactName: string;
}

/**
 * Horizontal path visualization: Contact → Committee → Economic Buyer.
 */
export function SignaturePath({ contactName }: SignaturePathProps) {
    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 border-b border-border-light pb-4 mb-4">
                <span className="material-symbols-outlined text-secondary-text">conversion_path</span>
                <h3 className="text-sm font-bold tracking-widest uppercase">The Signature Path</h3>
            </div>
            <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-6 mt-1">Distance to Economic Buyer</p>

            <div className="flex items-center justify-between relative px-2">
                {/* Progress line */}
                <div className="absolute left-[15%] right-[15%] top-1/2 h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
                <div className="absolute left-[15%] w-[35%] top-1/2 h-0.5 bg-blue-500 -translate-y-1/2 z-0" />

                <PathNode
                    avatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contactName}`}
                    name={contactName.split(' ')[0]}
                    role="Internal Champion"
                    size="lg"
                />
                <PathNode
                    icon="group"
                    name="Committee"
                    role="Technical Validation"
                />
                <PathNode
                    icon="account_balance"
                    name="CFO / Board"
                    role="Economic Buyer"
                    muted
                    size="lg"
                />
            </div>
        </Card>
    );
}

function PathNode({ avatar, icon, name, role, muted, size = 'md' }: {
    avatar?: string; icon?: string; name: string; role: string; muted?: boolean; size?: 'md' | 'lg';
}) {
    const sizeClass = size === 'lg' ? 'w-14 h-14' : 'w-12 h-12';
    return (
        <div className="relative z-10 flex flex-col items-center gap-3">
            <div className={`${sizeClass} rounded-full border-4 border-white ${muted ? 'bg-gray-50 text-gray-400 opacity-60' : avatar ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'} flex items-center justify-center ${avatar ? 'shadow-md' : 'shadow-sm'}`}>
                {avatar ? (
                    <img src={avatar} alt={name} className="w-full h-full rounded-full" />
                ) : (
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                )}
            </div>
            <div className="text-center">
                <p className="text-xs font-bold text-slate-800">{name}</p>
                <p className="text-[10px] text-gray-400 font-medium">{role}</p>
            </div>
        </div>
    );
}
