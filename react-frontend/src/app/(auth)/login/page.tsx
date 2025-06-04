'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/api/axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';  // <-- import Link from next/link

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth(false); // Do NOT redirect if unauthenticated

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [loading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('/login', { email, password, remember: rememberMe });
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Invalid credentials or server error');
    }
  };

  if (loading || user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-blue-100 bg-opacity-10 z-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Column */}
      <div className="hidden lg:block lg:w-1/2 bg-indigo-600">
        <div className="h-full flex items-center justify-center p-12">
          <img
            src="/images/illustration.svg"
            alt="Login Illustration"
            className="max-w-md w-full"
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me checkbox */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </form>

          {/* Sign up link using next/link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/register">
              <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                Sign Up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
