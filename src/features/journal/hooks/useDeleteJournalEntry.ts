import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteJournalEntry } from '../api';
import { journalEntriesQueryKey } from './useJournalEntries';

export function useDeleteJournalEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: journalEntriesQueryKey });
    },
  });
}
