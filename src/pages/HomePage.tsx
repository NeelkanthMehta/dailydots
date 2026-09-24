import { useNavigate } from 'react-router-dom';
import { useJournalEntries } from '../features/journal/hooks/useJournalEntries';
import { useUpsertJournalEntry } from '../features/journal/hooks/useUpsertJournalEntry';
import { JournalEntryForm } from '../features/journal/components/JournalEntryForm';
import { JournalEntryCard } from '../features/journal/components/JournalEntryCard';
import { useDeleteJournalEntry } from '../features/journal/hooks/useDeleteJournalEntry';
import { Card } from '../shared/ui/Card';
import { todayIso } from '../shared/lib/date';
import type { JournalEntry, JournalEntryInput } from '../features/journal/types';

export function HomePage() {
  const navigate = useNavigate();
  const { data: entries = [], isLoading, error } = useJournalEntries();
  const upsertEntry = useUpsertJournalEntry();
  const deleteEntry = useDeleteJournalEntry();

  const today = todayIso();
  const todayEntry = entries.find((entry: JournalEntry) => entry.date === today) ?? null;
  const recentEntries = entries.filter((entry: JournalEntry) => entry.date !== today).slice(0, 3);

  function handleQuickAdd(input: JournalEntryInput) {
    upsertEntry.mutate(input);
  }

  function handleDelete(date: string) {
    if (window.confirm('Delete this journal entry? This cannot be undone.')) {
      deleteEntry.mutate(date);
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <header>
        <h1 className="text-2xl font-semibold">Home - Dailydots</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'} logged so far.
        </p>
      </header>

      {error && (
        <Card>
          <p className="text-sm text-red-600 dark:text-red-400">
            Unable to sync your journal right now. Please refresh or try again.
          </p>
        </Card>
      )}

      <Card>
          <h2 className="mb-3 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {todayEntry ? "Update today's entry" : "Today's entry"}
        </h2>
        {isLoading ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading…</p>
        ) : (
          <JournalEntryForm
            key={todayEntry?.updatedAt ?? 'new'}
            initialEntry={todayEntry}
            defaultDate={today}
            onSubmit={handleQuickAdd}
            isSubmitting={upsertEntry.isPending}
            submitLabel={todayEntry ? 'Update entry' : 'Save entry'}
          />
        )}
      </Card>

      {recentEntries.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Recent entries
            </h2>
            <button
              type="button"
              className="text-xs font-medium text-primary-600 hover:underline dark:text-primary-500"
              onClick={() => navigate('/journals')}
            >
              View all
            </button>
          </div>
          {recentEntries.map((entry: JournalEntry) => (
            <JournalEntryCard
              key={entry.date}
              entry={entry}
              onDelete={handleDelete}
              isDeleting={deleteEntry.isPending && deleteEntry.variables === entry.date}
            />
          ))}
        </section>
      )}
    </div>
  );
}
