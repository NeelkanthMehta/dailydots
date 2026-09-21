import { useSearchParams, useNavigate } from 'react-router-dom';
import { JournalEntryForm } from '../features/journal/components/JournalEntryForm';
import { useJournalEntry } from '../features/journal/hooks/useJournalEntry';
import { useUpsertJournalEntry } from '../features/journal/hooks/useUpsertJournalEntry';
import { Card } from '../shared/ui/Card';
import type { JournalEntryInput } from '../features/journal/types';

export function AddJournalPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const editDate = searchParams.get('date') ?? undefined;

  const { data: existingEntry, isLoading } = useJournalEntry(editDate);
  const upsertEntry = useUpsertJournalEntry();

  function handleSubmit(input: JournalEntryInput) {
    upsertEntry.mutate(input, {
      onSuccess: () => navigate('/journals'),
    });
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <header>
        <h1 className="text-2xl font-semibold">
          {editDate ? 'Edit journal entry' : 'Add new journal'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Only one entry is kept per day — saving on a date that already has an entry updates it.
        </p>
      </header>

      <Card>
        {isLoading && editDate ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading…</p>
        ) : (
          <JournalEntryForm
            key={existingEntry?.date ?? editDate ?? 'new'}
            initialEntry={existingEntry}
            defaultDate={editDate}
            onSubmit={handleSubmit}
            isSubmitting={upsertEntry.isPending}
            submitLabel={existingEntry ? 'Update entry' : 'Save entry'}
          />
        )}
      </Card>
    </div>
  );
}
