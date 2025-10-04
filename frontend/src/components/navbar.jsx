"use client"

import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth-context.jsx"
import ThemeToggle from "./theme-toggle.jsx"

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold text-primary">
          BookReview
        </Link>
        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/books/new" className="rounded-md bg-primary px-3 py-1.5 text-sm text-white">
                Add Book
              </Link>
              <Link to="/profile" className="rounded-md border border-border px-3 py-1.5 text-sm">
                {user.name}
              </Link>
              <button onClick={handleLogout} className="rounded-md border border-border px-3 py-1.5 text-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-md border border-border px-3 py-1.5 text-sm">
                Login
              </Link>
              <Link to="/signup" className="rounded-md bg-primary px-3 py-1.5 text-sm text-white">
                Sign Up
              </Link>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
