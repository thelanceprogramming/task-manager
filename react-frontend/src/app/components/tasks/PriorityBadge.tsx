// src/components/tasks/PriorityBadge.tsx
'use client';

interface PriorityBadgeProps {
  priority: string;
}

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const priorityClasses = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  const formattedPriority = priority.charAt(0).toUpperCase() + priority.slice(1);

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${
      priorityClasses[priority as keyof typeof priorityClasses] || 'bg-gray-100 text-gray-800'
    }`}>
      {formattedPriority}
    </span>
  );
};

export default PriorityBadge;