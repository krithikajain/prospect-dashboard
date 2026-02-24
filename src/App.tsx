import { useState } from 'react';
import { normalizeProspectData } from '@/lib/normalizer';
import rawData from '@/data/studio_results_20260212_1512.json';
import { Navbar, PageHeader, ProfileDropdown } from '@/components/layout';
import { Stage0Home, Stage1Profile, Stage2Stakeholder, Stage4Need, Stage5Engagement, Stage6Timeline } from '@/components/stages';

const STAGES = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'power', label: 'Power', icon: 'groups' },
    { id: 'pain', label: 'Pain', icon: 'target' },
    { id: 'engagement', label: 'Engagement', icon: 'rocket_launch' },
    { id: 'timeline', label: 'Timeline', icon: 'timeline' },
] as const;

export default function App() {
    const data = normalizeProspectData(rawData[0]);
    const [currentStage, setCurrentStage] = useState(0);

    const StageView = () => {
        switch (currentStage) {
            case 0: return <Stage0Home />;
            case 1: return <Stage1Profile data={data} />;
            case 2: return <Stage2Stakeholder data={data} />;
            case 3: return <Stage4Need data={data} />;
            case 4: return <Stage5Engagement data={data} />;
            case 5: return <Stage6Timeline data={data} />;
            default: return null;
        }
    };

    return (
        <div className="h-screen w-full flex flex-col bg-[#F9FAFB] text-[#000000] font-sans overflow-hidden">
            <Navbar stages={[...STAGES]} currentStage={currentStage} onStageChange={setCurrentStage} />
            <ProfileDropdown />

            <main className="flex-1 flex flex-col pt-24 px-12 pb-12 overflow-y-auto">
                <div className="max-w-[1400px] mx-auto w-full">
                    {currentStage !== 0 && <PageHeader label={STAGES[currentStage].label} />}
                    <StageView />
                </div>
            </main>
        </div>
    );
}
