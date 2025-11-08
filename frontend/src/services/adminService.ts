import api from '../lib/axios';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface UsersResponse {
  success: boolean;
  count: number;
  data: { users: User[] };
}

export const adminService = {
  async getUsers(): Promise<UsersResponse> {
    const response = await api.get<UsersResponse>('/admin/users');
    return response.data;
  },

  async updateUserRole(id: string, role: 'user' | 'admin') {
    const response = await api.put(`/admin/users/${id}/role`, { role });
    return response.data;
  },

  async deleteUser(id: string) {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },
};
