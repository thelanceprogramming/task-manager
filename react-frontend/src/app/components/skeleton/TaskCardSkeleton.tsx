// components/skeleton/TaskCardSkeleton.tsx
import React from 'react';

export default function TaskCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 relative">
      {/* Shiny overlay element */}
      <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine" />
      
      <div className="p-5 space-y-4">
        {/* Header section */}
        <div className="flex justify-between items-start">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded-full w-3/4"></div>
          {/* Priority badge skeleton */}
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
        </div>
        
        {/* Status and date section */}
        <div className="flex items-center justify-between">
          {/* Status tag skeleton */}
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          {/* Date skeleton */}
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-200 rounded-full mr-1"></div>
            <div className="h-4 bg-gray-200 rounded-full w-16"></div>
          </div>
        </div>
        
        {/* Action buttons skeleton */}
        <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      
      {/* Add the shine animation to your globals.css */}
      <style jsx global>{`
        @keyframes shine {
          to {
            transform: translateX(100%);
          }
        }
        .animate-shine {
          animation: shine 1.5s infinite;
        }
      `}</style>
    </div>
  );
}