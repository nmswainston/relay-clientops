'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/shared/ThemeToggle';
import Logo from '@/components/shared/Logo';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Mock authentication - simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Store mock auth state (in real app, use proper auth)
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/dashboard');
    }, 500);
  };

  return (
    <>
      {/* Full viewport background overlay */}
      <div className="fixed inset-0 bg-bg-base dark:bg-bg-base-dark -z-10" />
      
      {/* Login content */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute top-6 right-6 z-10">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md relative z-0">
        <div className="bg-surface rounded-2xl shadow-2xl p-8 sm:p-10 dark:bg-surface-dark border border-border-subtle dark:border-border-subtle-dark">
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="mb-6">
              <Logo
                width={180}
                height={60}
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-2">Relay</h1>
            <p className="text-text-secondary dark:text-text-secondary-dark">Your gateway to streamlined hardware ordering</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-text-primary dark:text-text-primary-dark mb-2">Sign In</h2>
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
              Access your recent orders, track shipments, and reorder in just a few clicks.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              disabled={isLoading}
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              disabled={isLoading}
            />
            
            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-info-600 dark:text-info-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-semibold text-info-900 dark:text-info-300">Demo Mode</p>
                <p className="text-xs text-info-700 dark:text-info-400 mt-1">Use any email and password to sign in</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

