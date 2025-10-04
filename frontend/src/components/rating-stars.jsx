"use client"

import React from "react"

export default function RatingStars({ value = 0, onChange, size = 18 }) {
  const stars = [1, 2, 3, 4, 5]
  const isInteractive = typeof onChange === "function"
  return (
    <div className="inline-flex items-center gap-1">
      {stars.map((s) => (
        <button
          key={s}
          type="button"
          onClick={isInteractive ? () => onChange(s) : undefined}
          aria-label={`Rate ${s}`}
          className={isInteractive ? "cursor-pointer" : "cursor-default"}
          style={{ color: s <= value ? "gold" : "gray", fontSize: size }}
        >
          ★
        </button>
      ))}
    </div>
  )
}
