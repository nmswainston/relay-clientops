'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export function useAuthGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      const redirectUrl = pathname ? `?redirect=${encodeURIComponent(pathname)}` : '';
      router.replace(`/login${redirectUrl}`);
      return;
    }

    setIsReady(true);
  }, [isAuthenticated, isLoading, pathname, router]);

  return isReady;
}
