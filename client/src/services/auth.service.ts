import { User } from '../types/user'

const API_BASE = '/api/auth'

export const authService = {
  async register(name: string, email: string): Promise<User> {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || 'Ro‘yxatdan o‘tishda xatolik')
    }
    const user = await res.json()
    localStorage.setItem('taklif_user', JSON.stringify(user))
    return user
  },

  async login(email: string): Promise<User> {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || 'Kirishda xatolik')
    }
    const user = await res.json()
    localStorage.setItem('taklif_user', JSON.stringify(user))
    return user
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem('taklif_user')
    return raw ? JSON.parse(raw) : null
  },

  logout() {
    localStorage.removeItem('taklif_user')
  },
}
