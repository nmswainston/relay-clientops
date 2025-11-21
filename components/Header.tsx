'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import ThemeToggle from './ThemeToggle';

const navigationLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/orders', label: 'Orders' },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  // Don't show header on login page
  if (pathname === '/login') {
    return null;
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 dark:bg-slate-900 dark:border-slate-800 dark:shadow-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center" aria-label="Better Direct home">
            <Image
              src="/logo.svg"
              alt="Better Direct"
              width={160}
              height={40}
              style={{ width: '160px', height: '40px' }}
              priority
            />
          </Link>
          <nav className="flex items-center space-x-2 sm:space-x-4">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-100'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex items-center space-x-3">
              <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 text-right">
                <span className="block font-medium">{user?.name ?? 'Guest'}</span>
                <span className="text-gray-500 dark:text-gray-400">{user?.role ?? 'Not signed in'}</span>
              </div>
              <ThemeToggle />
              {isAuthenticated && (
                <button
                  onClick={logout}
                  className="px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 transition-colors"
                >
                  Log out
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
