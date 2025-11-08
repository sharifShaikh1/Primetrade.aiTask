"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/userStore';
import { adminService, User } from '@/services/adminService';
import DashboardLayout from '@/components/DashboardLayout';

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useUserStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }

    fetchUsers();
  }, [isAuthenticated, user, router]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminService.getUsers();
      setUsers(res.data.users);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = async (id: string, currentRole: string) => {
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      await adminService.updateUserRole(id, newRole as 'user' | 'admin');
      toast.success('User role updated');
      fetchUsers();
    } catch (err: any)  {
      toast.error(err?.response?.data?.message || 'Failed to update role');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await adminService.deleteUser(id);
      toast.success('User deleted');
      fetchUsers();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to delete user');
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <DashboardLayout>
      <main className="container">
        <h1>Admin — User Management</h1>
        <div className="card">
          {users.length === 0 ? (
            <div>No users found.</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>{new Date(u.createdAt).toLocaleString()}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-sm btn-outline" onClick={() => handleToggleRole(u._id, u.role)}>
                          {u.role === 'admin' ? 'Demote' : 'Promote'}
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}
