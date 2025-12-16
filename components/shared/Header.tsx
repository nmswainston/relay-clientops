'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
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
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md shadow-sm border-b border-border-subtle dark:bg-surface-dark/80 dark:border-border-subtle-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/dashboard" 
            className="flex items-center group transition-transform duration-200 hover:scale-105" 
            aria-label="Relay home"
          >
            <Logo
              width={160}
              height={40}
              priority
              className="group-hover:opacity-90"
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
                          'text-accent-700 bg-accent-50 dark:bg-accent-900/30 dark:text-accent-300',
                          'shadow-sm'
                        )
                      : cn(
                          'text-text-primary hover:bg-surface-elevated hover:text-text-primary',
                          'dark:text-text-primary-dark dark:hover:bg-surface-elevated-dark dark:hover:text-text-primary-dark'
                        )
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-600 dark:bg-accent-400 rounded-t-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
            <div className="flex items-center space-x-3 ml-2 sm:ml-4 pl-2 sm:pl-4 border-l border-border dark:border-border-dark">
              <div className="hidden sm:block text-sm text-text-primary dark:text-text-primary-dark">
                <span className="font-semibold">Demo User</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm font-medium text-text-primary hover:text-text-primary hover:bg-surface-elevated dark:text-text-primary-dark dark:hover:text-text-primary-dark dark:hover:bg-surface-elevated-dark rounded-lg transition-colors duration-200"
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

