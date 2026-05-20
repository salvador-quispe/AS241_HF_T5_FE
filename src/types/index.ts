// ─── Common ───────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  message: string
  status: number
}

export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  page: number
  size: number
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: number
  name: string
  email: string
  role: 'ADMIN' | 'USER'
  createdAt: string
}
