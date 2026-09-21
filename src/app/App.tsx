import { NavLink, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { JournalsPage } from '../pages/JournalsPage';
import { AddJournalPage } from '../pages/AddJournalPage';
import { useTheme } from '../shared/hooks/useTheme';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-primary-600 text-white'
      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
  }`;

export function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen">
      <nav className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <div className="flex gap-2">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/journals" className={navLinkClass}>
              My Journals
            </NavLink>
            <NavLink to="/journals/new" className={navLinkClass}>
              Add New
            </NavLink>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="rounded-lg p-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journals" element={<JournalsPage />} />
        <Route path="/journals/new" element={<AddJournalPage />} />
      </Routes>
    </div>
  );
}
