import { ProspectProfileShell } from '@/components/dashboard/ProspectProfileShell';
import { Navbar } from '@/components/dashboard/Navbar';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { ReadinessCard } from '@/components/dashboard/ReadinessCard';
import { ActionEngineCard } from '@/components/dashboard/ActionEngineCard';
import { StakeholderCard } from '@/components/dashboard/StakeholderCard';
import { InsightsCard } from '@/components/dashboard/InsightsCard';
import { StickyNotesCard } from '@/components/dashboard/StickyNotesCard';
import { MetricTile } from '@/components/dashboard/MetricTile';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { normalizeProspectData } from '@/lib/normalizer';
import rawData from '@/data/studio_results_20260212_1512.json';
import { Users, Building2, DollarSign } from 'lucide-react';

function App() {
  const data = normalizeProspectData(rawData[0]);

  // Placeholder handlers
  // Placeholder handlers
  const handleAddNote = () => console.log('Add note');
  const handleCreateTask = () => console.log('Create task');
  const handleSendInvite = () => console.log('Send Invite');

  // Specific metrics for the Bento Grid (previously in CompanySnapshot)
  const metrics = [
    { label: "Active Users", value: "10M+", subValue: "Global Reach", icon: Users },
    { label: "Organizations", value: "1,500+", subValue: "Enterprise Clients", icon: Building2 },
    { label: "Funding", value: "$120M", subValue: "Series C", icon: DollarSign },
  ];

  return (
    <ProspectProfileShell>
      <div className="space-y-2">
        <Navbar />

        {/* Bento Grid Layout */}
        <div className="relative z-10 p-6 max-w-[1600px] mx-auto space-y-8">

          {/* Header Actions */}
          <DashboardHeader
            onAddNote={handleAddNote}
            onSendInvite={handleSendInvite}
          />

          <div className="flex flex-col lg:flex-row gap-6">

            {/* Left Column: Stacked (Profile + Readiness) */}
            <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
              <ProfileCard
                identity={data.identity}
                industry={data.industry_trends.industry}
                website={data.identity.website}
                className="h-auto"
              />
              <ReadinessCard data={data} className="flex-1" />
            </div>

            {/* Right Main Content */}
            <div className="flex-1 flex flex-col gap-6">

              {/* Row 1: Metric Tiles (Bento Row) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metrics.map((m, i) => (
                  <MetricTile
                    key={i}
                    label={m.label}
                    value={m.value}
                    subValue={m.subValue}
                    icon={m.icon}
                    delay={i * 0.1}
                  />
                ))}
              </div>

              {/* Row 2: Action Engine + Insights + Sticky Notes */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[350px]">
                <ActionEngineCard
                  tasks={data.action_engine.tasks}
                  onCreateTask={handleCreateTask}
                  className="lg:col-span-1 h-full"
                />
                <InsightsCard data={data.pain_urgency} className="lg:col-span-1 h-full" />
                <StickyNotesCard
                  onAddNote={handleAddNote}
                  className="lg:col-span-1 h-full"
                />
              </div>

              {/* Row 3: Stakeholders */}
              <div>
                <StakeholderCard stakeholders={data.stakeholders} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </ProspectProfileShell>
  );
}

export default App;
