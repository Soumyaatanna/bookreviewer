import React from "react"
import { Link } from "react-router-dom"
import RatingStars from "./rating-stars.jsx"

export default function BookCard({ book, index = 0 }) {
  // simple palette to vary tile colors
  const palette = ["bg-amber-100 text-amber-900", "bg-rose-100 text-rose-900", "bg-sky-100 text-sky-900", "bg-lime-100 text-lime-900", "bg-violet-100 text-violet-900"]
  const color = palette[index % palette.length]

  return (
    <div className="rounded-md border border-border bg-card p-4 hover:shadow-lg transition-shadow duration-150">
      <div className={`mb-3 h-40 w-full rounded-md flex items-center justify-center overflow-hidden ${color}`}>
        <div className="px-4 text-center text-2xl font-semibold">{book.title}</div>
      </div>

      <h3 className="mb-1 text-lg font-semibold line-clamp-2" title={book.title}>
        {book.title}
      </h3>

      <p className="mb-2 text-sm text-muted truncate">
        by {book.author} • {book.genre} • {book.year}
      </p>

      <div className="mb-3 flex items-center gap-2">
        <RatingStars value={book.averageRating || 0} />
        <span className="text-sm text-muted">({book.reviewCount || 0})</span>
      </div>

      <p className="line-clamp-3 text-sm text-foreground/90">{book.description}</p>

      <div className="mt-4">
        <Link to={`/books/${book._id}`} className="inline-block rounded-md bg-amber-600 px-3 py-1.5 text-sm text-white">
          View Details
        </Link>
      </div>
    </div>
  )
}
