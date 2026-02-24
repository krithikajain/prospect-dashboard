import { useState } from 'react';
import { Card } from '@/components/ui/Card';

interface ProfileCardProps {
    name: string;
    company: string;
    role: string;
    functionalOwnership?: string;
    personalityTags: string[];
    email?: string;
    website?: string;
    digitalFootprint?: string;
    recentNews?: string;
}

/**
 * Flip-card showing the prospect's photo/info on front, connect links on back.
 */
export function ProfileCard({
    name, company, role, functionalOwnership,
    personalityTags, email, website, digitalFootprint, recentNews,
}: ProfileCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <Card padding="none" className="relative overflow-hidden flex-1 min-h-[500px] flex flex-col border-none shadow-xl rounded-[24px] perspective-1000">
            <div className={`w-full h-full absolute inset-0 transition-transform duration-700 preserve-3d ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                {/* FRONT */}
                <FrontFace
                    name={name}
                    company={company}
                    role={role}
                    functionalOwnership={functionalOwnership}
                    personalityTags={personalityTags}
                    onFlip={() => setIsFlipped(true)}
                    isFlipped={isFlipped}
                />

                {/* BACK */}
                <BackFace
                    name={name}
                    company={company}
                    email={email}
                    website={website}
                    digitalFootprint={digitalFootprint}
                    recentNews={recentNews}
                    onFlip={() => setIsFlipped(false)}
                    isFlipped={isFlipped}
                />
            </div>
        </Card>
    );
}

/* ────────────────────────── Front Face ────────────────────────── */

function FrontFace({ name, company, role, functionalOwnership, personalityTags, onFlip, isFlipped }: {
    name: string; company: string; role: string; functionalOwnership?: string;
    personalityTags: string[]; onFlip: () => void; isFlipped: boolean;
}) {
    return (
        <div className={`absolute inset-0 backface-hidden w-full h-full flex flex-col justify-end transition-opacity duration-300 ${isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
            <img alt={name} className="absolute inset-0 w-full h-full object-cover object-top" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" />
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#161616] via-[#161616]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#161616] to-transparent" />

            <div className="relative z-10 p-6 text-white w-full h-full flex flex-col justify-between">
                <div className="mt-6 flex justify-between items-start">
                    <h2 className="text-[36px] font-medium leading-[1.1] tracking-tight w-[70%]">
                        {name.split(' ').map((part, i) => <span key={i}>{part}<br /></span>)}
                    </h2>
                    <span className="material-symbols-outlined text-white text-[24px] opacity-90" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>

                <div className="mt-auto mb-6 space-y-3 font-light text-[14px]">
                    <div>
                        <p className="font-semibold text-white text-[16px]">{role} at {company}</p>
                        <p className="text-gray-300 text-[14px] mt-0.5">{company}</p>
                    </div>
                    <p className="text-gray-300 leading-relaxed max-w-[95%] border-t border-white/10 pt-3">
                        Focused on {functionalOwnership?.toLowerCase() || 'revenue operations & strategy'}.
                    </p>
                </div>

                <div className="flex flex-col items-start gap-4">
                    <button onClick={onFlip} className="bg-white text-slate-900 px-8 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-1 shadow-sm w-fit self-start">
                        Connect <span className="text-xl leading-none font-light mb-0.5">+</span>
                    </button>
                    <div className="flex items-center justify-start gap-2 pt-1 w-full overflow-x-auto no-scrollbar">
                        {personalityTags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="px-3.5 py-1.5 rounded-full bg-[#1A1C20]/80 backdrop-blur-md text-[11px] font-medium text-gray-200 shadow-sm border border-white/10 whitespace-nowrap">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ────────────────────────── Back Face ────────────────────────── */

function BackFace({ name, company, email, website, digitalFootprint, recentNews, onFlip, isFlipped }: {
    name: string; company: string; email?: string; website?: string;
    digitalFootprint?: string; recentNews?: string;
    onFlip: () => void; isFlipped: boolean;
}) {
    return (
        <div className={`absolute inset-0 backface-hidden w-full h-full [transform:rotateY(180deg)] flex flex-col transition-opacity duration-300 ${!isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
            <img alt={name} className="absolute inset-0 w-full h-full object-cover opacity-20" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80" />
            <div className="absolute inset-0 bg-[#1A1C20]/95 backdrop-blur-xl" />

            <div className="absolute inset-0 p-5 text-white flex flex-col">
                <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-3">
                    <div>
                        <h3 className="text-xl font-medium mb-0.5">Connect</h3>
                        <p className="text-xs text-gray-400">Direct channels & features</p>
                    </div>
                    <button onClick={onFlip} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors shrink-0 cursor-pointer relative z-50">
                        <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-3 mb-5">
                    <SocialIcon href={`https://linkedin.com/in/${name.replace(/\s+/g, '').toLowerCase()}`} bg="bg-[#0A66C2]">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                    </SocialIcon>
                    <SocialIcon href={`mailto:${email || 'contact@acmecorp.com'}`}>
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                    </SocialIcon>
                    <SocialIcon href={website || '#'}>
                        <span className="material-symbols-outlined text-[20px]">language</span>
                    </SocialIcon>
                </div>

                {/* Mentions */}
                <div className="flex-1 overflow-y-auto pr-1 -mr-1 space-y-3 pb-2">
                    <h4 className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-2">Latest Mentions</h4>
                    {digitalFootprint && (
                        <MentionLink icon="podcasts" iconColor="text-red-400" title="Recent Interview" text={digitalFootprint} />
                    )}
                    <MentionLink icon="article" iconColor="text-blue-400" title="Company News" text={recentNews || `${company} announces major strategic shifts in their latest press release, focusing heavily on operational scalability.`} />
                    <MentionLink icon="smart_display" iconColor="text-gray-300" title="YouTube Panel" text="Speaking at SaaStr Annual on 'Scaling Go-To-Market Strategies in the Current Era'." isYoutube />
                </div>
            </div>
        </div>
    );
}

/* ────────────────────────── Helpers ────────────────────────── */

function SocialIcon({ href, bg = 'bg-white/10', children }: { href: string; bg?: string; children: React.ReactNode }) {
    return (
        <a href={href} className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center text-white hover:opacity-90 transition-opacity border border-white/5`}>
            {children}
        </a>
    );
}

function MentionLink({ icon, iconColor, title, text, isYoutube }: { icon: string; iconColor: string; title: string; text: string; isYoutube?: boolean }) {
    return (
        <a href="#" className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group block">
            <div className="flex items-center gap-2">
                {isYoutube ? (
                    <svg className="w-[16px] h-[16px] text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" clipRule="evenodd" /></svg>
                ) : (
                    <span className={`material-symbols-outlined ${iconColor} text-[16px]`}>{icon}</span>
                )}
                <span className="text-xs font-medium text-gray-200">{title}</span>
            </div>
            <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{text}</p>
        </a>
    );
}
