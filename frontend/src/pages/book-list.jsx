"use client"

import React from "react"
import { useEffect, useState } from "react"
import api from "../api/axios.js"
import BookCard from "../components/book-card.jsx"
import Pagination from "../components/pagination.jsx"
import SortFilterBar from "../components/sort-filter-bar.jsx"
import SkeletonBookCard from "../components/skeleton-book-card.jsx"

export default function BookList() {
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState({ q: "", genre: "", author: "", sort: "-rating" })
  const [loading, setLoading] = useState(true)

  const load = async (p = page, f = filters) => {
    setLoading(true)
    const params = new URLSearchParams({
      page: p,
      limit: 5,
      ...(f.q ? { q: f.q } : {}),
      ...(f.genre ? { genre: f.genre } : {}),
      ...(f.author ? { author: f.author } : {}),
      ...(f.sort ? { sort: f.sort } : {}),
    })
    const res = await api.get(`/api/books?${params.toString()}`)
    setBooks(res.data.items)
    setPage(res.data.page)
    setTotalPages(res.data.totalPages)
    setLoading(false)
  }

  useEffect(() => {
    load(1, filters)
  }, [filters])

  return (
    <section>
      <h1 className="mb-2 text-2xl font-semibold">Books</h1>
      <SortFilterBar initial={filters} onChange={setFilters} />
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBookCard key={i} />
          ))}
        </div>
      ) : (
        <>
          {books.length === 0 ? (
            <div className="rounded-md border border-border bg-card p-6">No books found.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((b, i) => (
                <BookCard key={b._id} book={b} index={i} />
              ))}
            </div>
          )}
          <Pagination page={page} totalPages={totalPages} onPage={(p) => load(p)} />
        </>
      )}
    </section>
  )
}
