import { readJson, writeJson } from '../../shared/lib/storage';
import type { JournalEntry, JournalEntryInput } from './types';

// COPILOT_PROMPT: localStorage-backed data service for journal entries
// Assumption: one entry per calendar date, keyed by ISO date string.
// This module is the only place that knows about the storage mechanism,
// so it can be swapped for Supabase calls later without touching UI code.

const STORAGE_KEY = 'dailydots:journal-entries';

type EntriesByDate = Record<string, JournalEntry>;

function readAll(): EntriesByDate {
  return readJson<EntriesByDate>(STORAGE_KEY, {});
}

function writeAll(entries: EntriesByDate): void {
  writeJson(STORAGE_KEY, entries);
}

/** Simulates async I/O so callers (React Query) behave the same as with a remote backend. */
function resolveAsync<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export async function listJournalEntries(): Promise<JournalEntry[]> {
  const entries = Object.values(readAll());
  entries.sort((a, b) => b.date.localeCompare(a.date));
  return resolveAsync(entries);
}

export async function getJournalEntry(date: string): Promise<JournalEntry | null> {
  const entries = readAll();
  return resolveAsync(entries[date] ?? null);
}

export async function upsertJournalEntry(input: JournalEntryInput): Promise<JournalEntry> {
  const entries = readAll();
  const existing = entries[input.date];
  const now = new Date().toISOString();

  const entry: JournalEntry = {
    date: input.date,
    mood: input.mood,
    content: input.content,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  entries[input.date] = entry;
  writeAll(entries);
  return resolveAsync(entry);
}

export async function deleteJournalEntry(date: string): Promise<void> {
  const entries = readAll();
  delete entries[date];
  writeAll(entries);
  return resolveAsync(undefined);
}
