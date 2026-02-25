interface PageHeaderProps {
    label: string;
    breadcrumb?: string;
}

/**
 * Breadcrumb trail + large page title shown on all non-home stages.
 */
export function PageHeader({ label, breadcrumb = "Workspace / Hunt Pipeline" }: PageHeaderProps) {
    return (
        <div className="mb-8 mt-4 pl-2">
            <div className="flex items-center gap-3 text-secondary-text text-sm tracking-widest uppercase mb-3">
                <span className="material-symbols-outlined text-[18px]">home</span>
                <span>{breadcrumb}</span>
            </div>
            <h1 className="text-6xl font-extralight tracking-tight text-black">{label}</h1>
        </div>
    );
}
