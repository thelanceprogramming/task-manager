'use client';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isMobile, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`
          ${isMobile ? 'fixed inset-y-0 left-0 z-50 w-64' : 'w-64 h-screen'}
          bg-white text-gray-700 p-6 border-r border-gray-100 shadow
          transition-all duration-300 ease-in-out mx-2
          ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : ''}
        `}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-light text-gray-900">Dashboard</h2>
          {isMobile && (
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          )}
        </div>
        <nav>
          <ul className="space-y-3">
            <li>
              <a href="#" className="block p-3 hover:bg-blue-50 rounded-lg text-blue-600 hover:text-blue-700 transition-all">
                <span className="font-medium">Overview</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

