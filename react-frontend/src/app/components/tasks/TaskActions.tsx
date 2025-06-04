// src/components/tasks/TaskActions.tsx
'use client';

import { Task } from '@/types/task';
import Link from 'next/link';

interface TaskActionsProps {
  task: Task;
  onPinToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskActions = ({ task, onPinToggle, onDelete }: TaskActionsProps) => {
  return (
    <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-gray-100">
      <button 
        onClick={() => onPinToggle(task.id)}
        className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
        aria-label={task.is_favorite ? "Unpin task" : "Pin task"}
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d={task.is_favorite ? 
              "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" : 
              "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            } 
            fill={task.is_favorite ? "currentColor" : "none"}
          />
        </svg>
      </button>

      <Link
        href={`/edit-task/${task.id}`}
        className="p-2 text-gray-500 hover:text-green-600 transition-colors"
        aria-label="Edit task"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
          />
        </svg>
      </Link>

      <button 
        onClick={() => onDelete(task.id)}
        className="p-2 text-gray-500 hover:text-red-600 transition-colors"
        aria-label="Delete task"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
          />
        </svg>
      </button>
    </div>
  );
};

export default TaskActions;