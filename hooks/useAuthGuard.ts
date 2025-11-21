'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuthGuard() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (!auth) {
      router.push('/login');
    } else {
      setIsReady(true);
    }
  }, [router]);

  return isReady;
}

