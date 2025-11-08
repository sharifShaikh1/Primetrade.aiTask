import {create} from 'zustand';
import { taskService, Task, CreateTaskData } from '@/services/taskService';
import { toast } from 'react-toastify';

type Status = Task['status'];
type Priority = Task['priority'];

interface TaskState {
  tasks: Task[];
  loading: boolean;
  filters: {
    status: Status | '';
    priority: Priority | '';
  };
  fetchTasks: () => Promise<void>;
  createTask: (data: CreateTaskData) => Promise<void>;
  updateTask: (id: string, data: any) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilters: (filters: { status: Status | ''; priority: Priority | '' }) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: true,
  filters: { status: '', priority: '' },
  fetchTasks: async () => {
    try {
      set({ loading: true });
      const { filters } = get();
      const filterParams = {
        ...(filters.status && { status: filters.status }),
        ...(filters.priority && { priority: filters.priority }),
      };
      const response = await taskService.getTasks(filterParams);
      set({ tasks: response.data.tasks });
    } catch (error: any) {
      toast.error('Failed to fetch tasks');
    } finally {
      set({ loading: false });
    }
  },
  createTask: async (data: CreateTaskData) => {
    try {
      await taskService.createTask(data);
      toast.success('Task created successfully');
      await get().fetchTasks();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create task';
      toast.error(message);
    }
  },
  updateTask: async (id: string, data: any) => {
    try {
      await taskService.updateTask(id, data);
      toast.success('Task updated successfully');
      await get().fetchTasks();
    } catch (error: any) {
      toast.error('Failed to update task');
    }
  },
  deleteTask: async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskService.deleteTask(id);
      toast.success('Task deleted successfully');
      await get().fetchTasks();
    } catch (error: any) {
      toast.error('Failed to delete task');
    }
  },
  setFilters: (filters) => {
    set({ filters });
  },
}));
