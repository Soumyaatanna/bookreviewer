"use client"

import React from "react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/axios.js"

export default function AddEditBook({ mode }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [form, setForm] = useState({ title: "", author: "", description: "", genre: "", year: "" })
  const [error, setError] = useState("")

  useEffect(() => {
    if (mode === "edit" && id) {
      api.get(`/api/books/${id}`).then((res) => {
        const b = res.data
        setForm({ title: b.title, author: b.author, description: b.description, genre: b.genre, year: b.year })
      })
    }
  }, [mode, id])

  const submit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      if (mode === "create") {
        const res = await api.post("/api/books", { ...form, year: Number(form.year) })
        navigate(`/books/${res.data._id}`)
      } else {
        await api.put(`/api/books/${id}`, { ...form, year: Number(form.year) })
        navigate(`/books/${id}`)
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save book")
    }
  }

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold">{mode === "create" ? "Add Book" : "Edit Book"}</h1>
      <form onSubmit={submit} className="grid grid-cols-1 gap-3">
        <input
          className="rounded-md border border-border bg-card px-3 py-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required
        />
        <input
          className="rounded-md border border-border bg-card px-3 py-2"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
          required
        />
        <input
          className="rounded-md border border-border bg-card px-3 py-2"
          placeholder="Genre"
          value={form.genre}
          onChange={(e) => setForm((f) => ({ ...f, genre: e.target.value }))}
          required
        />
        <input
          className="rounded-md border border-border bg-card px-3 py-2"
          type="number"
          placeholder="Published Year"
          value={form.year}
          onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
          required
        />
        <textarea
          className="rounded-md border border-border bg-card px-3 py-2"
          rows={5}
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          required
        />
        {error && <div className="text-sm text-red-500">{error}</div>}
        <div className="flex gap-2">
          <button className="rounded-md bg-primary px-3 py-2 text-white">
            {mode === "create" ? "Create" : "Save"}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="rounded-md border border-border px-3 py-2">
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}
