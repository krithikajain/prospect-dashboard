/**
 * Placeholder component for sections currently under development.
 */
export function PlaceholderView({ title, icon }: { title: string; icon: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-24 text-center glass-card mt-8">
            <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-6 border-2 border-slate-200">
                <span className="material-symbols-outlined text-[40px]">{icon}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{title} Module</h2>
            <p className="text-slate-500 max-w-md">
                This section is currently under development. Detailed analysis and tools for {title.toLowerCase()} will be available here.
            </p>
        </div>
    );
}
