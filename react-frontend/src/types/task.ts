// src/types/task.ts
export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date?: string | null;
  is_favorite: boolean;
}