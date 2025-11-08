import api from '../lib/axios';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
  status?: string;
  priority?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
}

export interface TasksResponse {
  success: boolean;
  count: number;
  data: {
    tasks: Task[];
  };
}

export interface TaskResponse {
  success: boolean;
  data: {
    task: Task;
  };
}

export const taskService = {
  async getTasks(filters?: { status?: string; priority?: string }): Promise<TasksResponse> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    
    const response = await api.get<TasksResponse>(`/tasks?${params.toString()}`);
    return response.data;
  },

  async getTask(id: string): Promise<TaskResponse> {
    const response = await api.get<TaskResponse>(`/tasks/${id}`);
    return response.data;
  },

  async createTask(data: CreateTaskData): Promise<TaskResponse> {
    const response = await api.post<TaskResponse>('/tasks', data);
    return response.data;
  },

  async updateTask(id: string, data: UpdateTaskData): Promise<TaskResponse> {
    const response = await api.put<TaskResponse>(`/tasks/${id}`, data);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
