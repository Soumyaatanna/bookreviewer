"use client"

import React from "react"
import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import api from "../api/axios.js"
import { useAuth } from "../context/auth-context.jsx"
import RatingStars from "../components/rating-stars.jsx"
import ReviewItem from "../components/review-item.jsx"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

export default function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [myRating, setMyRating] = useState(0)
  const [myText, setMyText] = useState("")
  const [error, setError] = useState("")

  const isOwner =
    (user && book && user._id === book.addedBy?.toString?.()) || (book?.owner?._id && user?._id === book.owner._id)

  const load = async () => {
    setLoading(true)
    const res = await api.get(`/api/books/${id}`)
    setBook(res.data)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [id])

  const submitReview = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await api.post(`/api/reviews/${id}`, { rating: myRating, reviewText: myText })
      setMyRating(0)
      setMyText("")
      await load()
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add review")
    }
  }

  const onReviewUpdated = (updated) => {
    setBook((b) => ({ ...b, reviews: b.reviews.map((r) => (r._id === updated._id ? updated : r)) }))
  }

  const onReviewDeleted = (rid) => {
    setBook((b) => ({ ...b, reviews: b.reviews.filter((r) => r._id !== rid) }))
  }

  const deleteBook = async () => {
    if (!confirm("Delete this book?")) return
    await api.delete(`/api/books/${id}`)
    navigate("/")
  }

  const distribution = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    ;(book?.reviews || []).forEach((r) => {
      counts[r.rating] = (counts[r.rating] || 0) + 1
    })
    return Object.entries(counts).map(([rating, count]) => ({ rating, count }))
  }, [book])

  if (loading) return <div>Loading...</div>
  if (!book) return <div>Not found</div>

  return (
    <section className="space-y-6">
      <div className="rounded-md border border-border bg-card p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{book.title}</h1>
            <p className="text-sm text-muted">
              by {book.author} • {book.genre} • {book.year}
            </p>
            <div className="mt-2">
              <RatingStars value={book.averageRating || 0} />{" "}
              <span className="text-sm text-muted">({book.reviewCount || 0})</span>
            </div>
          </div>
          {isOwner && (
            <div className="flex gap-2">
              <Link to={`/books/${book._id}/edit`} className="rounded-md border border-border px-3 py-1.5 text-sm">
                Edit
              </Link>
              <button onClick={deleteBook} className="rounded-md border border-border px-3 py-1.5 text-sm">
                Delete
              </button>
            </div>
          )}
        </div>
        <p className="mt-3 text-sm">{book.description}</p>
      </div>

      <div className="rounded-md border border-border bg-card p-4">
        <h2 className="mb-3 text-lg font-semibold">Rating Distribution</h2>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distribution} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-md border border-border bg-card p-4">
        <h2 className="mb-3 text-lg font-semibold">Reviews</h2>
        {book.reviews?.length ? (
          <div className="space-y-3">
            {book.reviews.map((r) => (
              <ReviewItem key={r._id} review={r} onUpdated={onReviewUpdated} onDeleted={onReviewDeleted} />
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted">No reviews yet.</div>
        )}
        {user ? (
          <form onSubmit={submitReview} className="mt-4 space-y-2">
            <div>
              <label className="mb-1 block text-sm">Your Rating</label>
              <RatingStars value={myRating} onChange={setMyRating} />
            </div>
            <textarea
              className="w-full rounded-md border border-border bg-background p-2 text-sm"
              rows={3}
              placeholder="Write your thoughts..."
              value={myText}
              onChange={(e) => setMyText(e.target.value)}
            />
            {error && <div className="text-sm text-red-500">{error}</div>}
            <button className="rounded-md bg-primary px-3 py-1.5 text-sm text-white">Submit Review</button>
          </form>
        ) : (
          <div className="mt-3 text-sm">Please log in to add a review.</div>
        )}
      </div>
    </section>
  )
}
