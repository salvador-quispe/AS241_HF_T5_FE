import { useAuthStore } from '../store/authStore'

export function useAuth() {
  const { token, user, setAuth, clearAuth } = useAuthStore()

  const isAuthenticated = !!token
  const isAdmin = user?.role === 'ADMIN'

  return { token, user, isAuthenticated, isAdmin, setAuth, clearAuth }
}
