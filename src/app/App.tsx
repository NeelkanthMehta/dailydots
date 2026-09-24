import { useEffect } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { JournalsPage } from '../pages/JournalsPage';
import { AddJournalPage } from '../pages/AddJournalPage';
import { useTheme } from '../shared/hooks/useTheme';
import { EmailSignInForm } from '../features/auth/components/EmailSignInForm';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-primary-600 text-white'
      : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
  }`;

export function App() {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  useEffect(() => {
    const pageTitles: Record<string, string> = {
      '/': 'Home',
      '/journals': 'My Journals',
      '/journals/new': 'Add New',
    };

    document.title = `${pageTitles[pathname] ?? 'Home'} - Dailydots`;
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <nav className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <NavLink
              to="/"
              end
              aria-label="Dailydots home"
              className="flex items-center gap-2 rounded-lg text-sm font-semibold text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 dark:text-neutral-100"
            >
              <span className="grid h-6 w-6 grid-cols-2 gap-1" aria-hidden="true">
                <span className="rounded-full bg-primary-500" />
                <span className="rounded-full bg-primary-600" />
                <span className="rounded-full bg-primary-600" />
                <span className="rounded-full bg-primary-500" />
              </span>
              Dailydots
            </NavLink>
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
          </div>
          <div className="flex items-center gap-3">
            <EmailSignInForm />
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="rounded-lg p-2 text-sm text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
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
