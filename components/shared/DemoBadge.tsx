export default function DemoBadge() {
  return (
    <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-800 rounded-lg text-sm">
      <svg className="w-4 h-4 text-info-600 dark:text-info-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="font-medium text-info-900 dark:text-info-300">Demo Mode</span>
      <span className="text-info-700 dark:text-info-400">All data is mock</span>
    </div>
  );
}

