"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/userStore';
import { authService } from '@/services/authService';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useUserStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      // ignore logout errors
    }
    logout();
    router.push('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">Task Manager</div>
      <nav className="sidebar-nav">
        <Link href="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>
          Dashboard
        </Link>
        {user?.role === 'admin' && (
          <Link href="/admin" className={pathname === '/admin' ? 'active' : ''}>
            Admin
          </Link>
        )}
      </nav>
      <button onClick={handleLogout} className="btn btn-link sidebar-logout">
        Logout
      </button>
    </aside>
  );
}
