// src/app/(app)/edit-task/[id]/page.tsx
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from '@/lib/api/axios';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = useParams();
  const { user } = useAuth(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'medium',
    status: 'todo',
    is_favorite: false
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  // Fetch task data on mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/tasks/${id}`);
        const task = response.data;
        
        setFormData({
          title: task.title,
          description: task.description || '',
          due_date: task.due_date ? task.due_date.split('T')[0] : '',
          priority: task.priority,
          status: task.status,
          is_favorite: task.is_favorite
        });
      } catch (err) {
        setError('Failed to fetch task data.');
        console.error('Task fetch error:', err);
      } finally {
        setFetching(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleFavorite = () => {
    setFormData(prev => ({
      ...prev,
      is_favorite: !prev.is_favorite
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.put(`/api/tasks/${id}`, {
        ...formData,
        due_date: formData.due_date || null
      });
      
      if (response.status === 200) {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Task update error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-blue-100 bg-opacity-10 z-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
              Dashboard
            </Link>
          </li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-500">Edit Task</li>
        </ol>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Task</h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex gap-8">
        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow flex-1">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Complete project proposal"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the task details, requirements, and objectives..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                id="due_date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-3">
                Priority *
              </label>
              <div className="flex flex-wrap gap-2">
                {['low', 'medium', 'high'].map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => setFormData({...formData, priority})}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      formData.priority === priority
                        ? priority === 'low'
                          ? 'bg-green-100 text-green-800 ring-2 ring-green-300'
                          : priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800 ring-2 ring-yellow-300'
                          : 'bg-red-100 text-red-800 ring-2 ring-red-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    {formData.priority === priority && (
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              {/* Hidden select for form submission */}
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
                className="hidden"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={handleToggleFavorite}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  formData.is_favorite 
                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={formData.is_favorite ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                {formData.is_favorite ? 'Favorited' : 'Add to Favorites'}
              </button>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="flex justify-center py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : 'Update Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}