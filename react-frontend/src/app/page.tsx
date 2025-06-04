// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth(false); // Don't redirect automatically

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-100 bg-opacity-10 z-50">
      <div className="w-12 h-12 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}