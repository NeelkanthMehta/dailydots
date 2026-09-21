export interface Mood {
  emoji: string;
  label: string;
}

export const MOODS: readonly Mood[] = [
  { emoji: '😄', label: 'Great' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😔', label: 'Low' },
  { emoji: '😢', label: 'Rough' },
] as const;

export interface JournalEntry {
  /** ISO calendar date (yyyy-mm-dd), unique per entry. */
  date: string;
  mood: Mood;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type JournalEntryInput = {
  date: string;
  mood: Mood;
  content: string;
};
