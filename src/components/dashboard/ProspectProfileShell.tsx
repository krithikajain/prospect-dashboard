import type { ReactNode } from "react";
import { LiquidChrome } from "@/components/ui/LiquidChrome";

interface ProspectProfileShellProps {
    children: ReactNode;
}

export function ProspectProfileShell({ children }: ProspectProfileShellProps) {
    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-white bg-[#4F6CA0] selection:bg-[#E5BE5B]/30 selection:text-white">
            {/* Background: Liquid Chrome with SmartStory Colors */}
            <div className="fixed inset-0 z-0">
                <LiquidChrome
                    baseColor={[0.31, 0.42, 0.63]} // Smart Blue
                    accentColor={[0.90, 0.75, 0.36]} // Metallic Gold
                    speed={0.2}
                    amplitude={0.4}
                    interactive={true}
                    className="w-full h-full opacity-100"
                />
            </div>

            <main className="relative z-10 container mx-auto px-4 pb-8 max-w-[1600px]">
                {children}
            </main>
        </div>
    );
}
