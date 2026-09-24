import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface SupabaseSessionState {
  session: Session | null;
  isAnonymous: boolean;
  isLoading: boolean;
}

/** Tracks the current Supabase auth session, including anonymous-to-permanent upgrades. */
export function useSupabaseSession(): SupabaseSessionState {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  return { session, isAnonymous: session?.user.is_anonymous ?? false, isLoading };
}
