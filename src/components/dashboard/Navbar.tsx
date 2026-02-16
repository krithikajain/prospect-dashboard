import { Search, Bell, Menu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Navbar() {
    return (
        <nav className="h-16 border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-50">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-[1600px]">
                {/* Logo Area */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                    </div>
                    <span className="font-semibold text-lg tracking-tight text-slate-100">
                        Prospect<span className="text-indigo-400">Intel</span>
                    </span>
                </div>

                {/* Center Search */}
                <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <Input
                        placeholder="Search prospects, companies, or signals..."
                        className="pl-9 h-9 bg-white/5 border-white/10 text-slate-300 placeholder:text-slate-600 focus:bg-white/10 focus:border-indigo-500/50 transition-all rounded-full"
                    />
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/5 rounded-full relative">
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-[#0B0F17]"></span>
                    </Button>

                    <div className="flex items-center gap-3 pl-4 border-l border-white/5">
                        <div className="text-right hidden sm:block">
                            <div className="text-xs font-medium text-slate-200">Jordan D.</div>
                            <div className="text-[10px] text-slate-500">Enterprise Sales</div>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-[#0B0F17] shadow-lg shadow-indigo-500/20">
                            JD
                        </div>
                    </div>

                    <Button variant="ghost" size="icon" className="md:hidden text-slate-400">
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </nav>
    );
}
