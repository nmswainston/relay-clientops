'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuthGuard() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const auth = localStorage.getItem('isAuthenticated');
    if (!auth) {
      router.push('/login');
      setIsLoading(false);
    } else {
      setIsReady(true);
      setIsLoading(false);
    }
  }, [router]);

  return { isReady, isLoading };
}

