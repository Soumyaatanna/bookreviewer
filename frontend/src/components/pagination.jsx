"use client"

import React from "react"

export default function Pagination({ page, totalPages, onPage }) {
  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        className="rounded-md border border-border px-3 py-1 text-sm disabled:opacity-50"
        onClick={() => onPage(page - 1)}
        disabled={page <= 1}
      >
        Prev
      </button>
      <span className="text-sm">
        {page} / {totalPages || 1}
      </span>
      <button
        className="rounded-md border border-border px-3 py-1 text-sm disabled:opacity-50"
        onClick={() => onPage(page + 1)}
        disabled={page >= (totalPages || 1)}
      >
        Next
      </button>
    </div>
  )
}
