import { useState, type FormEvent } from 'react';
import { z } from 'zod';
import { todayIso } from '../../../shared/lib/date';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { Textarea } from '../../../shared/ui/Textarea';
import { MoodPicker } from './MoodPicker';
import { MOODS, type JournalEntry, type JournalEntryInput, type Mood } from '../types';

const entrySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  content: z.string().trim().min(1, 'Write something before saving'),
});

interface JournalEntryFormProps {
  initialEntry?: JournalEntry | null;
  defaultDate?: string;
  onSubmit: (input: JournalEntryInput) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function JournalEntryForm({
  initialEntry,
  defaultDate,
  onSubmit,
  isSubmitting,
  submitLabel = 'Save entry',
}: JournalEntryFormProps) {
  const [date, setDate] = useState(initialEntry?.date ?? defaultDate ?? todayIso());
  const [mood, setMood] = useState<Mood>(initialEntry?.mood ?? MOODS[1]);
  const [content, setContent] = useState(initialEntry?.content ?? '');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const result = entrySchema.safeParse({ date, content });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Please check the form');
      return;
    }

    setError(null);
    onSubmit({ date: result.data.date, mood, content: result.data.content });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="entry-date" className="mb-1 block text-sm font-medium">
          Date
        </label>
        <Input
          id="entry-date"
          type="date"
          value={date}
          max={todayIso()}
          onChange={(event) => setDate(event.target.value)}
          className="max-w-xs"
        />
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          Saving on a date with an existing entry updates it instead of creating a new one.
        </p>
      </div>

      <div>
        <p className="mb-1 block text-sm font-medium">Mood</p>
        <MoodPicker value={mood} onChange={setMood} />
      </div>

      <div>
        <label htmlFor="entry-content" className="mb-1 block text-sm font-medium">
          Journal entry
        </label>
        <Textarea
          id="entry-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={8}
          placeholder="How was your day?"
        />
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <Button type="submit" disabled={isSubmitting} className="self-start">
        {isSubmitting ? 'Saving…' : submitLabel}
      </Button>
    </form>
  );
}
