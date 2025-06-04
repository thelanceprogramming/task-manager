'use client';

import { useRouter } from 'next/navigation';
import axios from '@/lib/api/axios';

interface HeaderProps {
  toggleSidebar: () => void;
  showHamburger: boolean;
}

export function Header({ toggleSidebar, showHamburger }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white p-4 border-b border-gray-100 m-2 shadow">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {showHamburger && (
            <button 
              onClick={toggleSidebar}
              className="mr-4 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <h1 className="text-xl font-light text-gray-700">Welcome back!</h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-sm" />
          <button
            onClick={handleLogout}
            className="text-sm bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-xs"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}