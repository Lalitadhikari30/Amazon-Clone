import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api.js'

const AuthContext = createContext(null)

const STORAGE_KEY = 'amazon_clone_auth_v1'

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json)
    return v ?? fallback
  } catch {
    return fallback
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    const saved = raw ? safeParse(raw, null) : null
    if (saved?.token) {
      setToken(saved.token)
      setUser(saved.user || null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!token) {
      localStorage.removeItem(STORAGE_KEY)
      return
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }))
  }, [token, user])

  async function login(email, password) {
    try {
      const payload = await api.auth.login({ email, password })
      setToken(payload.token)
      setUser(payload.user)
      return payload
    } catch (err) {
      if (err?.code === 'NO_API_BASE_URL') {
        const payload = {
          token: 'demo.jwt.token',
          user: {
            id: 'demo-user',
            name: 'Demo User',
            email,
            role: 'USER',
          },
          demo: true,
        }
        setToken(payload.token)
        setUser(payload.user)
        return payload
      }
      throw err
    }
  }

  function logout() {
    setToken(null)
    setUser(null)
  }

  const value = useMemo(() => ({
    token,
    user,
    loading,
    isAuthenticated: Boolean(token),
    role: user?.role || 'GUEST',
    login,
    logout,
  }), [token, user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
