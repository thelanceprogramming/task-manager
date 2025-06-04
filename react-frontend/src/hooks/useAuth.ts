// hooks/useAuth.ts
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/api/axios'; // Ensure axios includes withCredentials

export function useAuth(redirectIfUnauthenticated = true) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/user', { withCredentials: true }) 
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        if (redirectIfUnauthenticated) {
          router.replace('/login');
        }
      })
      .finally(() => setLoading(false));
  }, [router, redirectIfUnauthenticated]);

  return { user, loading };
}
