import React from "react"

export default function SkeletonBookCard() {
  return (
    <div className="rounded-md border border-border bg-card p-4 animate-pulse">
      <div className="mb-3 h-40 w-full bg-muted rounded-md" />
      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
      <div className="h-3 bg-muted rounded w-1/2 mb-3" />
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded" />
        <div className="h-3 bg-muted rounded w-5/6" />
      </div>
    </div>
  )
}
