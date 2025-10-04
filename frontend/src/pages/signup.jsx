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
    <section className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-semibold">Sign Up</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full rounded-md border border-border bg-card px-3 py-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button className="w-full rounded-md bg-primary px-3 py-2 text-white">Create Account</button>
      </form>
      <p className="mt-3 text-sm">
        Already have an account?{" "}
        <Link className="text-primary underline" to="/login">
          Login
        </Link>
      </p>
    </section>
  )
}
