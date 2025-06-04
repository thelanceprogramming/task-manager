// src/components/tasks/TaskCard.tsx
'use client';

import { Task } from '@/types/task';
import PriorityBadge from './PriorityBadge';
import StatusTag from './StatusTag';
import TaskActions from './TaskActions';

interface TaskCardProps {
  task: Task;
  onPinToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskCard = ({ task, onPinToggle, onDelete }: TaskCardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative ${
      task.is_favorite ? 'border-l-4 border-l-blue-500' : ''
    }`}>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 pr-4">
            {task.title}
            {task.is_favorite && (
              <span className="ml-2 text-xs text-blue-500">(Pinned)</span>
            )}
          </h3>
          <PriorityBadge priority={task.priority} />
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{task.description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <StatusTag status={task.status} />
          
          {task.due_date && (
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(task.due_date).toLocaleDateString()}
            </div>
          )}
        </div>
        
        <TaskActions 
          task={task} 
          onPinToggle={onPinToggle} 
          onDelete={onDelete} 
        />
      </div>
    </div>
  );
};

export default TaskCard;