import { useEffect } from 'react';
import { useJournalEntries } from '../features/journal/hooks/useJournalEntries';
import { useDeleteJournalEntry } from '../features/journal/hooks/useDeleteJournalEntry';
import { JournalEntryCard } from '../features/journal/components/JournalEntryCard';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../shared/ui/Button';
import type { JournalEntry } from '../features/journal/types';
import { MoodCalendar } from '../features/journal/components/MoodCalendar';

export function JournalsPage() {
  const [searchParams] = useSearchParams();
  const { data: entries = [], isLoading, error } = useJournalEntries();
  const deleteEntry = useDeleteJournalEntry();
  const selectedDate = searchParams.get('date');

  useEffect(() => {
    if (!selectedDate || isLoading) return;

    document.getElementById(`journal-${selectedDate}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [isLoading, selectedDate]);

  function handleDelete(date: string) {
    if (window.confirm('Delete this journal entry? This cannot be undone.')) {
      deleteEntry.mutate(date);
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Journals - Dailydots</h1>
        <Link to="/journals/new">
          <Button>Add new</Button>
        </Link>
      </header>

      <MoodCalendar entries={entries} />

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">
          Unable to sync your journal right now. Please refresh or try again.
        </p>
      ) : isLoading ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading…</p>
      ) : entries.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          No entries yet. Start your first journal entry to see it here.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {entries.map((entry: JournalEntry) => (
            <div key={entry.date} id={`journal-${entry.date}`} className="scroll-mt-6">
              <JournalEntryCard
                entry={entry}
                onDelete={handleDelete}
                isDeleting={deleteEntry.isPending && deleteEntry.variables === entry.date}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
