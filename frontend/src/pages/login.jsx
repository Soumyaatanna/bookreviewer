"use client"

import React from "react"
import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useAuth } from "../context/auth-context.jsx"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const submit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await login(email, password)
      const to = location.state?.from?.pathname || "/"
      navigate(to, { replace: true })
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed")
    }
  }

  return (
    <section className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-semibold">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full rounded-md border border-border bg-card px-3 py-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full rounded-md border border-border bg-card px-3 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-sm text-red-500">{error}</div>}
        <button className="w-full rounded-md bg-primary px-3 py-2 text-white">Login</button>
      </form>
      <p className="mt-3 text-sm">
        No account?{" "}
        <Link className="text-primary underline" to="/signup">
          Sign up
        </Link>
      </p>
    </section>
  )
}
