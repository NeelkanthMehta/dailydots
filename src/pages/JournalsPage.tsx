import { useJournalEntries } from '../features/journal/hooks/useJournalEntries';
import { useDeleteJournalEntry } from '../features/journal/hooks/useDeleteJournalEntry';
import { JournalEntryCard } from '../features/journal/components/JournalEntryCard';
import { Link } from 'react-router-dom';
import { Button } from '../shared/ui/Button';
import type { JournalEntry } from '../features/journal/types';

export function JournalsPage() {
  const { data: entries = [], isLoading } = useJournalEntries();
  const deleteEntry = useDeleteJournalEntry();

  function handleDelete(date: string) {
    if (window.confirm('Delete this journal entry? This cannot be undone.')) {
      deleteEntry.mutate(date);
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Journals</h1>
        <Link to="/journals/new">
          <Button>Add new</Button>
        </Link>
      </header>

      {isLoading ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading…</p>
      ) : entries.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No entries yet. Start your first journal entry to see it here.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {entries.map((entry: JournalEntry) => (
            <JournalEntryCard
              key={entry.date}
              entry={entry}
              onDelete={handleDelete}
              isDeleting={deleteEntry.isPending && deleteEntry.variables === entry.date}
            />
          ))}
        </div>
      )}
    </div>
  );
}
