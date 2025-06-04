// src/components/tasks/StatusTag.tsx
'use client';

interface StatusTagProps {
  status: string;
}

const StatusTag = ({ status }: StatusTagProps) => {
  const statusClasses = {
    todo: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    backlog: 'bg-purple-100 text-purple-800',
  };

  const formatStatus = (status: string) => {
    const formatted = status.replace('_', ' ');
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${
      statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'
    }`}>
      {formatStatus(status)}
    </span>
  );
};

export default StatusTag;