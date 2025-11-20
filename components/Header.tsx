'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  // Don't show header on login page
  if (pathname === '/login') {
    return null;
  }
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">Better Direct</h1>
          </Link>
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <Link
              href="/dashboard"
              className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/dashboard'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </Link>
            <div className="flex items-center space-x-2">
              <div className="text-xs sm:text-sm text-gray-700">
                <span className="font-medium">John Doe</span>
                <span className="text-gray-500 ml-1 sm:ml-2 hidden sm:inline">IT Manager</span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

