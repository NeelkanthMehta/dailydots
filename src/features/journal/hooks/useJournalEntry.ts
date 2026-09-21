import { useQuery } from '@tanstack/react-query';
import { getJournalEntry } from '../api';

export function useJournalEntry(date: string | undefined) {
  return useQuery({
    queryKey: ['journal', 'entries', date] as const,
    queryFn: () => getJournalEntry(date as string),
    enabled: Boolean(date),
  });
}
