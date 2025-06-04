// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/api/axios';
import { useAuth } from '@/hooks/useAuth';
import TaskCard from '../../components/tasks/TaskCard';
import TaskCardSkeleton from '../../components/skeleton/TaskCardSkeleton';
import { Task } from '@/types/task';
import Link from 'next/link';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const togglePin = async (taskId: number) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, is_favorite: !task.is_favorite } : task
      );
      setTasks(updatedTasks.sort((a, b) => (b.is_favorite ? 1 : 0) - (a.is_favorite ? 1 : 0)));
      await axios.patch(`/api/tasks/${taskId}/favorite`);
    } catch (error) {
      console.error('Failed to toggle pin:', error);
    }
  };

  const handleDelete = async (taskId: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${taskId}`);
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      axios
        .get('/api/tasks')
        .then((res) => {
          const sortedTasks = [...res.data.data].sort((a, b) => 
            (b.is_favorite ? 1 : 0) - (a.is_favorite ? 1 : 0)
          );
          setTasks(sortedTasks);
        })
        .catch((err) => {
          console.error('Failed to fetch tasks:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [authLoading, user]);

  if (authLoading || !user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-blue-100 bg-opacity-10 z-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Task Overview</h2>
        {tasks.length > 0 && (
          <Link
            href="/add-task"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
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
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
            Add Task
          </Link>
        )}
      </div>

      <hr className="border-gray-200 mb-6" />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <TaskCardSkeleton key={i} />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-500 text-lg mb-6">No tasks found. Create your first task!</p>
          <Link
            href="/add-task"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
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
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
            Add Task
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onPinToggle={togglePin} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
}