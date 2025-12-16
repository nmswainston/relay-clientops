'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Don't show header on login page
  if (pathname === '/login') {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/orders', label: 'Orders' },
  ];
  
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/80 dark:bg-slate-900/80 dark:border-slate-800/80 dark:shadow-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/dashboard" 
            className="flex items-center group transition-transform duration-200 hover:scale-105" 
            aria-label="Relay home"
          >
            <Image
              src="/logo.svg"
              alt="Relay"
              width={160}
              height={40}
              style={{ width: '160px', height: '40px' }}
              priority
              className="transition-opacity duration-200 group-hover:opacity-90"
            />
          </Link>
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === '/dashboard' && pathname === '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    'relative',
                    isActive
                      ? cn(
                          'text-primary-700 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-300',
                          'shadow-sm'
                        )
                      : cn(
                          'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                          'dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-gray-100'
                        )
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-t-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
            <div className="flex items-center space-x-3 ml-2 sm:ml-4 pl-2 sm:pl-4 border-l border-gray-200 dark:border-slate-700">
              <div className="hidden sm:block text-sm text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Demo User</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

