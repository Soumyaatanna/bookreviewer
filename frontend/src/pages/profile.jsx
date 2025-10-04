"use client"

import React from "react"
import { useAuth } from "../context/auth-context.jsx"

export default function Profile() {
  const { user } = useAuth()
  return (
    <section className="mx-auto max-w-xl">
      <h1 className="mb-4 text-2xl font-semibold">Profile</h1>
      <div className="rounded-md border border-border bg-card p-4">
        <div>
          <span className="text-muted">Name: </span>
          {user?.name}
        </div>
        <div>
          <span className="text-muted">Email: </span>
          {user?.email}
        </div>
      </div>
    </section>
  )
}
