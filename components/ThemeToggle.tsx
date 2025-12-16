'use client';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme, isReady } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={theme === 'dark'}
      aria-label="Toggle theme"
      disabled={!isReady}
      className={`inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-2 text-[var(--color-text-primary)] shadow-sm transition-colors hover:bg-[var(--color-surface-elevated)] focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-[var(--color-surface)] disabled:opacity-60 disabled:cursor-not-allowed dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-dark)] dark:text-[var(--color-text-primary-dark)] dark:hover:bg-[var(--color-surface-elevated-dark)] dark:focus:ring-offset-[var(--color-bg-base-dark)] ${className}`}
    >
      <span className="sr-only">Toggle color theme</span>
      {theme === 'dark' ? (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      )}
    </button>
  );
}


