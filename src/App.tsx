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

  // Specific metrics for the Bento Grid
  const metrics = [
    {
      label: "Active Users",
      value: data.company_scale?.active_users || "N/A",
      subValue: "Global Reach",
      icon: Users
    },
    {
      label: "Organizations",
      value: data.company_scale?.organizations || "N/A",
      subValue: "Enterprise Clients",
      icon: Building2
    },
    {
      label: "Previous Exit",
      value: data.company_scale?.recent_exit || "N/A",
      subValue: "Blackboard",
      icon: DollarSign
    },
    {
      label: "Funding",
      value: data.company_scale?.funding || "$120M",
      subValue: "Series C",
      icon: DollarSign
    },
  ];

  // Filter out N/A metrics if desired, or keep them to show gaps? 
  // User said "clean all that". "N/A" is better than fake data.


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

          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* Left Column: Stacked (Profile + Readiness + Stakeholder) */}
            <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
              <ProfileCard
                identity={data.identity}
                industry={data.industry_trends.industry}
                website={data.identity.website}
                className="h-auto"
              />
              <ReadinessCard data={data} className="flex-1" />
              <StakeholderCard stakeholders={data.stakeholders} />
            </div>

            {/* Right Main Content */}
            <div className="flex-1 flex flex-col gap-6">

              {/* Row 1: Metric Tiles (Bento Row) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

              {/* Row 2: Strategic Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 min-h-[350px]">
                <InsightsCard data={data.pain_urgency} industry={data.industry_trends} className="h-full" />
              </div>

              {/* Row 3: Action Engine + Sticky Notes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                <ActionEngineCard
                  tasks={data.action_engine.tasks}
                  onCreateTask={handleCreateTask}
                  className="h-full"
                />
                <StickyNotesCard
                  className="h-full"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </ProspectProfileShell>
  );
}

export default App;
