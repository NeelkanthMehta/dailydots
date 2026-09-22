import { MOODS, type Mood } from '../types';

interface MoodPickerProps {
  value: Mood;
  onChange: (mood: Mood) => void;
}

export function MoodPicker({ value, onChange }: MoodPickerProps) {
  return (
    <div role="radiogroup" aria-label="Mood" className="flex flex-wrap gap-2">
      {MOODS.map((mood) => {
        const selected = mood.label === value.label;
        return (
          <button
            key={mood.label}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(mood)}
            className={`flex flex-col items-center gap-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 ${
              selected
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-100'
                : 'border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
            }`}
          >
            <span className="text-xl" aria-hidden="true">
              {mood.emoji}
            </span>
            {mood.label}
          </button>
        );
      })}
    </div>
  );
}
