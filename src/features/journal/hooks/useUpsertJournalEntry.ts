import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertJournalEntry } from '../api';
import { journalEntriesQueryKey } from './useJournalEntries';

export function useUpsertJournalEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: journalEntriesQueryKey });
    },
  });
}
