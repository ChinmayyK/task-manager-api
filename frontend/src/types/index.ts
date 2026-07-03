export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string | null;
  attachment: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
