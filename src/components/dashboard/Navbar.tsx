import { Search, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Navbar() {
    return (
        <nav className="h-16 border-b border-indigo-100/50 bg-white/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
                {/* Logo Area */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-md ring-1 ring-white/20">
                        PI
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                        Prospect Intel
                    </span>
                </div>

                {/* Center Search */}
                <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search prospects, companies, or signals..."
                        className="pl-9 h-9 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-full"
                    />
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full">
                        <Bell className="w-4 h-4" />
                    </Button>
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs ring-2 ring-white border border-indigo-200">
                        JD
                    </div>
                    <Button variant="ghost" size="icon" className="md:hidden text-slate-500">
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </nav>
    );
}
