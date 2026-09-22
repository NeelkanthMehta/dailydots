import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toIsoDate } from '../../../shared/lib/date';
import type { JournalEntry } from '../types';

interface MoodCalendarProps {
  entries: JournalEntry[];
}

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function monthLabel(date: Date): string {
  return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

export function MoodCalendar({ entries }: MoodCalendarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());
  const entryByDate = new Map(entries.map((entry) => [entry.date, entry]));
  const firstDay = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
  const daysInMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0,
  ).getDate();
  const leadingBlankDays = firstDay.getDay();
  const calendarDays = Array.from({ length: leadingBlankDays + daysInMonth }, (_, index) => {
    if (index < leadingBlankDays) return null;
    return new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), index - leadingBlankDays + 1);
  });

  function shiftMonth(amount: number) {
    setVisibleMonth(
      (currentMonth) => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + amount, 1),
    );
  }

  return (
    <section
      aria-labelledby="mood-calendar-heading"
      className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          aria-expanded={isExpanded}
          aria-controls="mood-calendar-content"
          className="rounded-lg text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500"
        >
          <h2 id="mood-calendar-heading" className="text-lg font-semibold">
            Mood calendar
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {entries.length} {entries.length === 1 ? 'day' : 'days'} journaled
          </p>
        </button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            aria-label="Show previous month"
            className="rounded-lg px-2.5 py-1.5 text-lg text-neutral-600 hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            ‹
          </button>
          <span className="min-w-32 text-center text-sm font-medium">{monthLabel(visibleMonth)}</span>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            aria-label="Show next month"
            className="rounded-lg px-2.5 py-1.5 text-lg text-neutral-600 hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            ›
          </button>
        </div>
      </div>

      {isExpanded && (
        <div id="mood-calendar-content" className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {weekdayLabels.map((weekday) => (
            <span key={weekday} className="py-1">
              {weekday}
            </span>
          ))}
          {calendarDays.map((day, index) => {
            if (!day) return <span key={`blank-${index}`} aria-hidden="true" className="min-h-12" />;

            const date = toIsoDate(day);
            const entry = entryByDate.get(date);
            const dayContent = (
              <>
                <span>{day.getDate()}</span>
                {entry ? (
                  <span
                    className="text-xl leading-none"
                    title={entry.mood.label}
                    aria-hidden="true"
                  >
                    {entry.mood.emoji}
                  </span>
                ) : (
                  <span className="h-5" aria-hidden="true" />
                )}
              </>
            );

            return (
              <Link
                key={date}
                to={`/journals?date=${date}`}
                aria-label={
                  entry
                    ? `${date}: ${entry.mood.label}. Edit journal entry`
                    : `${date}: Add journal entry`
                }
                className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 ${
                  entry
                    ? 'text-neutral-700 hover:bg-primary-50 dark:text-neutral-200 dark:hover:bg-neutral-800'
                    : 'text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                }`}
              >
                {dayContent}
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}