"use client"

import React from "react"
import api from "../api/axios.js"

const AuthContext = React.createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  // Debug log to verify provider is initialized in development only
  try {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log("[auth-context] AuthProvider initializing")
    }
  } catch (e) {
    // ignore in environments where console may be unavailable
  }

  React.useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setLoading(false)
      return
    }
    api
      .get("/api/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token")
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password })
    localStorage.setItem("token", res.data.token)
    setUser(res.data.user)
    return res.data.user
  }

  const signup = async (name, email, password) => {
    const res = await api.post("/api/auth/register", { name, email, password })
    localStorage.setItem("token", res.data.token)
    setUser(res.data.user)
    return res.data.user
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const value = React.useMemo(() => ({ user, loading, login, signup, logout }), [user, loading])
  return React.createElement(AuthContext.Provider, { value }, children)
}

export const useAuth = () => {
  const ctx = React.useContext(AuthContext)
  if (ctx === null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return ctx
}
