import React from "react"
import BookList from "./book-list.jsx"
import { Link } from "react-router-dom"

function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-28 text-center">
        <h1 className="text-5xl font-extrabold leading-tight mb-4">Discover Your Next Great Read</h1>
        <p className="text-lg mb-8 text-slate-700">Share reviews, explore books, and connect with fellow readers</p>
        <div className="flex justify-center gap-4">
          <Link to="/" className="rounded-full bg-amber-600 text-white px-6 py-3 font-medium">Browse Books</Link>
          <Link to="/signup" className="rounded-full border border-amber-300 text-amber-800 px-6 py-3 font-medium">Join Now</Link>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const items = [
    { title: "Extensive Library", text: "Browse thousands of books across all genres, added by our community" },
    { title: "Honest Reviews", text: "Read genuine reviews from real readers to make informed choices" },
    { title: "Community Driven", text: "Join a community of book lovers and share your literary journey" },
  ]
  return (
    <section className="bg-background py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {items.map((it) => (
            <div key={it.title} className="p-6">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">📚</div>
              <h3 className="font-semibold mb-2">{it.title}</h3>
              <p className="text-sm text-muted">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <BookList />
      </main>
    </div>
  )
}
