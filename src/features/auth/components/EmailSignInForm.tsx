import { useState, type FormEvent } from 'react';
import { z } from 'zod';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { useSupabaseSession } from '../../../shared/hooks/useSupabaseSession';
import { sendMagicLink } from '../api';

const emailSchema = z.string().trim().email('Enter a valid email address');

export function EmailSignInForm() {
  const { session, isAnonymous } = useSupabaseSession();
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isAnonymous && session) {
    return (
      <span className="text-xs text-neutral-500 dark:text-neutral-400">
        Signed in as {session.user.email}
      </span>
    );
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-xs font-medium text-primary-600 hover:underline dark:text-primary-500"
      >
        Save your journal
      </button>
    );
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Please check the form');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await sendMagicLink(result.data);
      setIsSent(true);
    } catch {
      setError('Unable to send the sign-in link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSent) {
    return (
      <span className="text-xs text-neutral-500 dark:text-neutral-400">
        Check your email for a sign-in link.
      </span>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
        className="w-48 py-1 text-xs"
      />
      <Button type="submit" variant="secondary" disabled={isSubmitting} className="py-1 text-xs">
        {isSubmitting ? 'Sending…' : 'Send link'}
      </Button>
      {error && <span className="text-xs text-red-600 dark:text-red-400">{error}</span>}
    </form>
  );
}
