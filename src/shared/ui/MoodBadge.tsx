interface BadgeProps {
  emoji: string;
  label: string;
  className?: string;
}

export function MoodBadge({ emoji, label, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200 ${className}`}
    >
      <span aria-hidden="true">{emoji}</span>
      {label}
    </span>
  );
}
