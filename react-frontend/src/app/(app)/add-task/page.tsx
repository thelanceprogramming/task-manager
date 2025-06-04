// src/app/(app)/add-task/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from '@/lib/api/axios';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function AddTaskPage() {
  const router = useRouter();
  const { user } = useAuth(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/tasks', {
        ...formData,
        due_date: formData.due_date || null,
        status: 'todo',
        is_favorite: false
      });
      
      if (response.status === 201) {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Task creation error:', err);
    } finally {
      setLoading(false);
    }
  };

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
          <li className="text-gray-500">Add Task</li>
        </ol>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Task</h1>
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
          </div>

          <div className="pt-4 flex justify-end">
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
                  Creating...
                </>
              ) : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}