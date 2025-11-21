'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  
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
            <Link
              href="/dashboard"
              className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/dashboard'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-100'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800'
              }`}
            >
              Dashboard
            </Link>
            <div className="flex items-center space-x-2">
              <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-200">
                <span className="font-medium">John Doe</span>
                <span className="text-gray-500 ml-1 sm:ml-2 hidden sm:inline dark:text-gray-400">IT Manager</span>
              </div>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

