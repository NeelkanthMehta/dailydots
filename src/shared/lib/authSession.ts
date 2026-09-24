import { supabase } from './supabase';
import type { Session } from '@supabase/supabase-js';

/** Returns the current session, creating an anonymous one if none exists yet. */
export async function ensureSession(): Promise<Session> {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;

  if (sessionData.session) return sessionData.session;

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.session) {
    throw error ?? new Error('Unable to create an anonymous session.');
  }

  return data.session;
}
