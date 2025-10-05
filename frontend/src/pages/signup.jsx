"use client"

import React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/auth-context.jsx"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { signup } = useAuth()

  const submit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await signup(name, email, password)
      navigate("/", { replace: true })
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed")
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
  <div className="w-full max-w-md rounded-xl border border-border bg-card p-8">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">📚</div>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-2">Create Account</h2>
        <p className="text-sm text-center text-muted mb-6">Join BookReview and start exploring</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              className="w-full rounded-md border border-border bg-background px-3 py-2"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              className="w-full rounded-md border border-border bg-background px-3 py-2"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              className="w-full rounded-md border border-border bg-background px-3 py-2"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <button className="w-full rounded-full bg-amber-600 dark:bg-amber-500 px-4 py-3 text-white font-medium">Sign Up</button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-primary font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
