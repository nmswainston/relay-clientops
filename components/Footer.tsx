import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/60 dark:border-slate-800/60 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Crafted by{' '}
          <Link
            href="https://consolelogic.net"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:underline decoration-gray-400 dark:decoration-gray-500 underline-offset-2 transition-all duration-200"
          >
            console.log(ic)
          </Link>
        </p>
      </div>
    </footer>
  );
}