'use client';

import { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useState, useEffect } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false); 
      }
    };

    checkIfMobile();

    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header toggleSidebar={toggleSidebar} showHamburger={isMobile} />
      <div className="flex">
        <Sidebar isMobile={isMobile} isOpen={isOpen} onClose={closeSidebar} />
        <main className={`flex-1 overflow-y-auto p-4 transition-all duration-300 ${isMobile && isOpen ? 'ml-0' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}