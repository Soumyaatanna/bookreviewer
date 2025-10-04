"use client"

import React from "react"
import { useEffect, useState } from "react"

export default function SortFilterBar({ initial, onChange }) {
  const [q, setQ] = useState(initial.q || "")
  const [genre, setGenre] = useState(initial.genre || "")
  const [author, setAuthor] = useState(initial.author || "")
  const [sort, setSort] = useState(initial.sort || "-rating")

  useEffect(() => {
    const h = setTimeout(() => onChange({ q, genre, author, sort }), 400)
    return () => clearTimeout(h)
  }, [q, genre, author, sort])

  return (
    <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-4">
      <input
        className="rounded-md border border-border bg-card px-3 py-2 text-sm"
        placeholder="Search title/author/genre"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <input
        className="rounded-md border border-border bg-card px-3 py-2 text-sm"
        placeholder="Filter by genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        className="rounded-md border border-border bg-card px-3 py-2 text-sm"
        placeholder="Filter by author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <select
        className="rounded-md border border-border bg-card px-3 py-2 text-sm"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="-rating">Top Rated</option>
        <option value="rating">Lowest Rated</option>
        <option value="-year">Newest</option>
        <option value="year">Oldest</option>
      </select>
    </div>
  )
}
