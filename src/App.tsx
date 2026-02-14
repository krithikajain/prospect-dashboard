import { ProspectProfileShell } from '@/components/dashboard/ProspectProfileShell';
import { Navbar } from '@/components/dashboard/Navbar';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { ReadinessCard } from '@/components/dashboard/ReadinessCard';
import { ActionEngineCard } from '@/components/dashboard/ActionEngineCard';
import { StakeholderCard } from '@/components/dashboard/StakeholderCard';
import { InsightsCard } from '@/components/dashboard/InsightsCard';
import { StickyNotesCard } from '@/components/dashboard/StickyNotesCard';
import { RiskFlagsCard } from '@/components/dashboard/RiskFlagsCard';
import { CompanySnapshotCard } from '@/components/dashboard/CompanySnapshotCard';
import { normalizeProspectData } from '@/lib/normalizer';
import rawData from '@/data/studio_results_20260212_1512.json';

function App() {
  const data = normalizeProspectData(rawData[0]);

  // Placeholder handlers
  const handleAddNote = () => console.log('Add note');
  const handleCreateTask = () => console.log('Create task');

  return (
    <ProspectProfileShell>
      <div className="space-y-6">
        <Navbar />

        {/* Main Grid: 12 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-20">

          {/* --- ROW 1: PRIMARY IDENTITY & METRICS --- */}

          {/* Col 1: Hero Profile (4 cols) */}
          <div className="md:col-span-6 lg:col-span-4 h-[440px]">
            <ProfileCard
              identity={data.identity}
              className="h-full"
            />
          </div>

          {/* Col 2: Company Snapshot (4 cols) */}
          <div className="md:col-span-6 lg:col-span-4 h-[440px]">
            <CompanySnapshotCard
              identity={data.identity}
              className="h-full"
            />
          </div>

          {/* Col 3: Readiness Index (4 cols) */}
          <div className="md:col-span-12 lg:col-span-4 h-[440px]">
            <ReadinessCard
              data={data}
              className="h-full"
            />
          </div>

          {/* --- ROW 2: CONTEXT & ACTION --- */}

          {/* Col 1: Stakeholders (4 cols) */}
          <div className="md:col-span-6 lg:col-span-4 h-[380px]">
            <StakeholderCard
              stakeholders={data.stakeholders}
              className="h-full"
            />
          </div>

          {/* Col 2: Insights (4 cols) */}
          <div className="md:col-span-6 lg:col-span-4 h-[380px]">
            <InsightsCard
              data={data.pain_urgency}
              className="h-full"
            />
          </div>

          {/* Col 3: Action Engine (4 cols) */}
          <div className="md:col-span-12 lg:col-span-4 h-[380px]">
            <ActionEngineCard
              tasks={data.action_engine.tasks}
              onCreateTask={handleCreateTask}
              className="h-full"
            />
          </div>

          {/* --- ROW 3: TERTIARY --- */}

          {/* Notes (8 cols) */}
          <div className="md:col-span-12 lg:col-span-8">
            <RiskFlagsCard
              risks={data.risk_analysis.risks}
            />
          </div>

          {/* Risks (4 cols - swapped to match visual hierarchy often seen: notes + risks) */}
          <div className="md:col-span-12 lg:col-span-4">
            <StickyNotesCard
              onAddNote={handleAddNote}
            />
          </div>

        </div>
      </div>
    </ProspectProfileShell>
  );
}

export default App;
