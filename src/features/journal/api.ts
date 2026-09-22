import { supabase } from '../../shared/lib/supabase';
import { readJson, removeJson } from '../../shared/lib/storage';
import type { JournalEntry, JournalEntryInput } from './types';

// COPILOT_PROMPT: Supabase-backed data service with one-time localStorage import
// Assumption: anonymous Supabase Auth is enabled for this project.

const STORAGE_KEY = 'dailydots:journal-entries';

type EntriesByDate = Record<string, JournalEntry>;
type JournalRow = {
  date: string;
  mood: JournalEntry['mood'];
  content: string;
  created_at: string;
  updated_at: string;
};

async function getUserId(): Promise<string> {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;

  if (sessionData.session?.user.id) return sessionData.session.user.id;

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.user) {
    throw error ?? new Error('Unable to create an anonymous journal session.');
  }

  return data.user.id;
}

function toJournalEntry(row: JournalRow): JournalEntry {
  return {
    date: row.date,
    mood: row.mood,
    content: row.content,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function importLocalEntries(userId: string): Promise<void> {
  const localEntries = Object.values(readJson<EntriesByDate>(STORAGE_KEY, {}));
  if (localEntries.length === 0) return;

  const rows = localEntries.map((entry) => ({
    user_id: userId,
    date: entry.date,
    mood: entry.mood,
    content: entry.content,
    created_at: entry.createdAt,
    updated_at: entry.updatedAt,
  }));

  const { error } = await supabase.from('journal_entries').upsert(rows, {
    onConflict: 'user_id,date',
  });
  if (error) throw error;

  removeJson(STORAGE_KEY);
}

export async function listJournalEntries(): Promise<JournalEntry[]> {
  const userId = await getUserId();
  await importLocalEntries(userId);

  const { data, error } = await supabase
    .from('journal_entries')
    .select('date, mood, content, created_at, updated_at')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  if (error) throw error;

  return (data as JournalRow[]).map(toJournalEntry);
}

export async function getJournalEntry(date: string): Promise<JournalEntry | null> {
  const userId = await getUserId();
  await importLocalEntries(userId);

  const { data, error } = await supabase
    .from('journal_entries')
    .select('date, mood, content, created_at, updated_at')
    .eq('user_id', userId)
    .eq('date', date)
    .maybeSingle();
  if (error) throw error;

  return data ? toJournalEntry(data as JournalRow) : null;
}

export async function upsertJournalEntry(input: JournalEntryInput): Promise<JournalEntry> {
  const userId = await getUserId();
  const existing = await getJournalEntry(input.date);
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('journal_entries')
    .upsert(
      {
        user_id: userId,
        date: input.date,
        mood: input.mood,
        content: input.content,
        created_at: existing?.createdAt ?? now,
        updated_at: now,
      },
      { onConflict: 'user_id,date' },
    )
    .select('date, mood, content, created_at, updated_at')
    .single();
  if (error) throw error;

  return toJournalEntry(data as JournalRow);
}

export async function deleteJournalEntry(date: string): Promise<void> {
  const userId = await getUserId();
  const { error } = await supabase
    .from('journal_entries')
    .delete()
    .eq('user_id', userId)
    .eq('date', date);
  if (error) throw error;
}
