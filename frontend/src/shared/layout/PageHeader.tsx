/**
 * Props for the PageHeader component.
 */
interface PageHeaderProps {
    /** The main title text for the page. */
    label: string;
    /** 
     * The breadcrumb text to display above the title. 
     * @default "Workspace / Hunt Pipeline"
     */
    breadcrumb?: string;
}

/**
 * Standard header component for application pages (stages).
 * Displays a breadcrumb trail with an icon and a large, stylized page title.
 * 
 * @param {PageHeaderProps} props - The component props.
 * @returns {JSX.Element} The rendered PageHeader component.
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
