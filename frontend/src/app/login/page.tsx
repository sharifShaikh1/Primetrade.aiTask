'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { authService, LoginData } from '@/services/authService';
import { useUserStore } from '@/store/userStore';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  const login = useUserStore((state) => state.login);

  const onSubmit = async (data: LoginData) => {
    setLoading(true);
    try {
      const response = await authService.login(data);
      
      login(response.data.token, response.data.user);
      
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ maxWidth: '500px', marginTop: '4rem' }}>
      <div className="card">
        <h1 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '2rem' }}>
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email address'
                }
              })}
              placeholder="john@example.com"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              {...register('password', { 
                required: 'Password is required'
              })}
              placeholder="••••••••"
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: 'var(--primary)', fontWeight: '500' }}>
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}
