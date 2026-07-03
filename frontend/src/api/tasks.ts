import { apiClient } from './client';
import type { Task } from '../types';

export const getTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get('/tasks');
  return response.data.data.tasks;
};

export const getTask = async (id: string): Promise<Task> => {
  const response = await apiClient.get(`/tasks/${id}`);
  return response.data.data;
};

export const createTask = async (data: any): Promise<Task> => {
  const response = await apiClient.post('/tasks', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

export const updateTask = async ({ id, data }: { id: string; data: any }): Promise<Task> => {
  const response = await apiClient.put(`/tasks/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};
