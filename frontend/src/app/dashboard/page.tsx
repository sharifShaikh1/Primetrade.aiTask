'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useTaskStore } from '@/store/taskStore';
import { CreateTaskData, Task } from '@/services/taskService';
import DashboardLayout from '@/components/DashboardLayout';

// Reusable union types derived from Task model
type Status = Task['status'];
type Priority = Task['priority'];

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();
  const { tasks, loading, filters, fetchTasks, setFilters } = useTaskStore();
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchTasks();
  }, [isAuthenticated, router, fetchTasks]);

  useEffect(() => {
    fetchTasks();
  }, [filters, fetchTasks]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <DashboardLayout>
      <main className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>My Tasks</h1>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            + Create Task
          </button>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Filter by Status</label>
              <select 
                className="form-select" 
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value as Status })}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Filter by Priority</label>
              <select 
                className="form-select"
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value as Priority })}
              >
                <option value="">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks found. Create your first task!</p>
          </div>
        ) : (
          <div className="grid">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={setEditingTask}
                onDelete={useTaskStore.getState().deleteTask}
              />
            ))}
          </div>
        )}

        {showModal && (
          <TaskModal
            onClose={() => setShowModal(false)}
            onSave={useTaskStore.getState().createTask}
          />
        )}

        {editingTask && (
          <TaskModal
            task={editingTask}
            onClose={() => setEditingTask(null)}
            onSave={(data) => useTaskStore.getState().updateTask(editingTask._id, data)}
          />
        )}
      </main>
    </DashboardLayout>
  );
}

function TaskCard({ task, onEdit, onDelete }: { task: Task; onEdit: (task: Task) => void; onDelete: (id: string) => void }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{task.title}</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className={`badge badge-${task.status}`}>{task.status}</span>
          <span className={`badge badge-${task.priority}`}>{task.priority}</span>
        </div>
      </div>
      <p style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>{task.description}</p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => onEdit(task)} className="btn btn-sm btn-secondary">
          Edit
        </button>
        <button onClick={() => onDelete(task._id)} className="btn btn-sm btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}

function TaskModal({ task, onClose, onSave }: { task?: Task; onClose: () => void; onSave: (data: CreateTaskData) => void }) {
  type FormData = {
    title: string;
    description: string;
    status: Status;
    priority: Priority;
  };

  const [formData, setFormData] = useState<FormData>({
    title: task?.title || '',
    description: task?.description || '',
    status: (task?.status as Status) || 'pending',
    priority: (task?.priority as Priority) || 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      onSave(formData);
    }
    else {
      const payload = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
      };
      onSave(payload as CreateTaskData);
    }
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div className="card" style={{ maxWidth: '500px', width: '100%', margin: '1rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
          {task ? 'Edit Task' : 'Create New Task'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              minLength={3}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          {task && (
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              {task ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
