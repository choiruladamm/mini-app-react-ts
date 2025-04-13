export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate: string;
  tags: string[];
  createdAt: string;
}

export interface TaskState {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
  sortBy: 'priority' | 'dueDate' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}