/**
 * Navigation Configuration
 * 
 * Defines the main sidebar sections and nested folder-style tabs
 * for the prospecting and qualification workflows.
 */

export interface NavTab {
    id: string;
    label: string;
    icon: string;
}

export interface NavSection {
    id: string;
    label: string;
    icon: string;
    tabs?: readonly NavTab[];
}

export const NAV_CONFIG: readonly NavSection[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    {
        id: 'prospect',
        label: 'Prospect',
        icon: 'person_search',
        tabs: [
            { id: 'profile', label: 'Profile', icon: 'person' },
            { id: 'power', label: 'Power', icon: 'groups' },
            { id: 'pain', label: 'Pain', icon: 'target' },
            { id: 'path', label: 'Path', icon: 'moving' }
        ]
    },
    {
        id: 'qualification',
        label: 'Qualification',
        icon: 'fact_check',
        tabs: [
            { id: 'budget', label: 'Budget', icon: 'payments' },
            { id: 'authority', label: 'Authority', icon: 'shield_person' },
            { id: 'bant_need', label: 'Need', icon: 'psychology' },
            { id: 'bant_timeline', label: 'Timeline', icon: 'schedule' },
        ]
    },
    { id: 'need', label: 'Need', icon: 'psychology' },
    {
        id: 'proposition',
        label: 'Proposition',
        icon: 'lightbulb',
        tabs: [
            { id: 'timeline', label: 'Timeline', icon: 'timeline' }
        ]
    },
] as const;
