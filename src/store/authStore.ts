import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  user: { id: number; name: string; email: string; role: string } | null
  setAuth: (token: string, user: AuthState['user']) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => {
        localStorage.setItem('token', token)
        set({ token, user })
      },
      clearAuth: () => {
        localStorage.removeItem('token')
        set({ token: null, user: null })
      },
    }),
    { name: 'auth-storage' },
  ),
)
