import { Link } from 'react-router-dom';
import { formatDisplayDate } from '../../../shared/lib/date';
import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';
import { MoodBadge } from '../../../shared/ui/MoodBadge';
import type { JournalEntry } from '../types';

interface JournalEntryCardProps {
  entry: JournalEntry;
  onDelete: (date: string) => void;
  isDeleting?: boolean;
}

export function JournalEntryCard({ entry, onDelete, isDeleting }: JournalEntryCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {formatDisplayDate(entry.date)}
          </p>
          <MoodBadge emoji={entry.mood.emoji} label={entry.mood.label} className="mt-1" />
        </div>
        <div className="flex shrink-0 gap-2">
          <Link to={`/journals/new?date=${entry.date}`}>
            <Button variant="secondary" className="px-3 py-1.5 text-xs">
              Edit
            </Button>
          </Link>
          <Button
            variant="danger"
            className="px-3 py-1.5 text-xs"
            onClick={() => onDelete(entry.date)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>
      <p className="whitespace-pre-wrap text-sm text-neutral-700 dark:text-neutral-300">
        {entry.content}
      </p>
    </Card>
  );
}
