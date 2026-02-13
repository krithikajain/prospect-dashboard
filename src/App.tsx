import { useState } from 'react';
import { StageDashboardShell } from '@/components/dashboard/StageDashboardShell';
import { QualificationHub } from '@/components/cards/QualificationHub';
import { StakeholderMap } from '@/components/cards/StakeholderMap';
import { ExecutionDeck } from '@/components/cards/ExecutionDeck';
import { NotesCard } from '@/components/cards/NotesCard';
import { AddNoteDialog } from '@/components/dialogs/AddNoteDialog';
import { CreateTaskDialog } from '@/components/dialogs/CreateTaskDialog';
import { SendInviteDialog } from '@/components/dialogs/SendInviteDialog';
import { currentProspect } from '@/data/prospectData';

function App() {
  const [data] = useState(currentProspect);

  // Dialog States
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [taskDefaultTitle, setTaskDefaultTitle] = useState('');

  // Handlers
  const handleAddNote = () => setIsNoteOpen(true);

  const handleCreateTask = (title?: string) => {
    if (typeof title === 'string') {
      setTaskDefaultTitle(title);
    } else {
      setTaskDefaultTitle('');
    }
    setIsTaskOpen(true);
  };

  const handleSendInvite = () => setIsInviteOpen(true);

  return (
    <div className="bg-background min-h-screen font-sans text-foreground">
      <StageDashboardShell
        data={data}
        onAddNote={handleAddNote}
        onCreateTask={() => handleCreateTask()}
        onSendInvite={handleSendInvite}
      >
        {/* Left Column (Intelligence) - 4 cols wide on large screens */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          <div className="min-h-[250px]">
            <QualificationHub data={data} />
          </div>
          <div className="min-h-[300px] flex-grow">
            <StakeholderMap data={data} />
          </div>
        </div>

        {/* Right Column (Execution) - 8 cols wide on large screens */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
          <div className="min-h-[500px]">
            <ExecutionDeck data={data} />
          </div>
          <div className="min-h-[300px]">
            {/* Reusing NotesCard for Timeline, making it full width in this column */}
            <NotesCard onAddNoteClick={handleAddNote} />
          </div>
        </div>
      </StageDashboardShell>

      {/* Dialogs */}
      <AddNoteDialog open={isNoteOpen} onOpenChange={setIsNoteOpen} />
      <CreateTaskDialog
        open={isTaskOpen}
        onOpenChange={setIsTaskOpen}
        defaultTitle={taskDefaultTitle}
      />
      <SendInviteDialog
        open={isInviteOpen}
        onOpenChange={setIsInviteOpen}
        defaultEmail={data.identity.email}
      />
    </div>
  );
}

export default App;

