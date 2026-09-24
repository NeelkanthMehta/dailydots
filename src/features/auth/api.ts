import { supabase } from '../../shared/lib/supabase';
import { ensureSession } from '../../shared/lib/authSession';

/** Distinguishes auth-related failures from application errors so the UI can react appropriately. */
export class AuthError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'AuthError';
  }
}

/** Links an email to the current session, upgrading an anonymous user in place on confirmation. */
export async function sendMagicLink(email: string): Promise<void> {
  await ensureSession();

  const { error } = await supabase.auth.updateUser(
    { email },
    { emailRedirectTo: window.location.origin },
  );
  if (error) throw new AuthError('Unable to send the sign-in link.', { cause: error });
}
