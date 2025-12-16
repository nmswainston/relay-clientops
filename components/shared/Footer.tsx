import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle dark:border-border-subtle-dark mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-sm text-text-secondary dark:text-text-secondary-dark text-center">
          Crafted by{' '}
          <Link
            href="https://consolelogic.net"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-text-primary dark:text-text-primary-dark hover:text-accent-600 dark:hover:text-accent-400 hover:underline decoration-text-muted dark:decoration-text-muted-dark underline-offset-2 transition-all duration-200"
          >
            console.log(ic)
          </Link>
        </p>
      </div>
    </footer>
  );
}

