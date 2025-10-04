"use client"

import React from "react"
import { useState } from "react"
import RatingStars from "./rating-stars.jsx"
import api from "../api/axios.js"
import { useAuth } from "../context/auth-context.jsx"

export default function ReviewItem({ review, onUpdated, onDeleted }) {
  const { user } = useAuth()
  const isOwner = user?._id === review.userId?._id
  const [editing, setEditing] = useState(false)
  const [rating, setRating] = useState(review.rating)
  const [text, setText] = useState(review.reviewText || "")

  const save = async () => {
    const res = await api.put(`/api/reviews/${review._id}`, { rating, reviewText: text })
    onUpdated(res.data)
    setEditing(false)
  }

  const remove = async () => {
    if (!confirm("Delete review?")) return
    await api.delete(`/api/reviews/${review._id}`)
    onDeleted(review._id)
  }

  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="mb-1 text-sm text-muted">{review.userId?.name}</div>
      {editing ? (
        <div className="space-y-2">
          <RatingStars value={rating} onChange={setRating} />
          <textarea
            className="w-full rounded-md border border-border bg-background p-2 text-sm"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={save} className="rounded-md bg-primary px-3 py-1 text-sm text-white">
              Save
            </button>
            <button onClick={() => setEditing(false)} className="rounded-md border border-border px-3 py-1 text-sm">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <RatingStars value={review.rating} />
          {review.reviewText && <p className="mt-2 text-sm">{review.reviewText}</p>}
          {isOwner && (
            <div className="mt-2 flex gap-2">
              <button onClick={() => setEditing(true)} className="rounded-md border border-border px-3 py-1 text-sm">
                Edit
              </button>
              <button onClick={remove} className="rounded-md border border-border px-3 py-1 text-sm">
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
