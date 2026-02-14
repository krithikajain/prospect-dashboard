import type { ReactNode } from "react";
import { LiquidChrome } from "@/components/ui/LiquidChrome";

interface ProspectProfileShellProps {
    children: ReactNode;
}

export function ProspectProfileShell({ children }: ProspectProfileShellProps) {
    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-100 relative overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
            {/* Background: Liquid Chrome */}
            <div className="fixed inset-0 z-0">
                <LiquidChrome
                    baseColor={[0.1, 0.1, 0.15]} // Deep metallic dark
                    speed={0.2}
                    amplitude={0.4}
                    interactive={true}
                    className="w-full h-full opacity-60" // Reduced opacity to blend with bg
                />
            </div>

            <main className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
                {children}
            </main>
        </div>
    );
}
