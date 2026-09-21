import { useQuery } from '@tanstack/react-query';
import { listJournalEntries } from '../api';

export const journalEntriesQueryKey = ['journal', 'entries'] as const;

export function useJournalEntries() {
  return useQuery({
    queryKey: journalEntriesQueryKey,
    queryFn: listJournalEntries,
  });
}
