import React from "react"
import { Link } from "react-router-dom"
import RatingStars from "./rating-stars.jsx"

export default function BookCard({ book }) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <h3 className="mb-1 text-lg font-semibold">{book.title}</h3>
      <p className="mb-2 text-sm text-muted">
        by {book.author} • {book.genre} • {book.year}
      </p>
      <div className="mb-3">
        <RatingStars value={book.averageRating || 0} />{" "}
        <span className="text-sm text-muted">({book.reviewCount || 0})</span>
      </div>
      <p className="line-clamp-3 text-sm">{book.description}</p>
      <div className="mt-4">
        <Link to={`/books/${book._id}`} className="text-sm text-primary underline">
          View Details
        </Link>
      </div>
    </div>
  )
}
