import { create } from 'zustand';
import { getUser, removeAuthToken, setAuthToken, setUser, User } from '@/lib/auth';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (token, user) => {
    setAuthToken(token);
    setUser(user);
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    removeAuthToken();
    set({ user: null, isAuthenticated: false });
  },
  checkAuth: () => {
    const user = getUser();
    if (user) {
      set({ user, isAuthenticated: true });
    } else {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
