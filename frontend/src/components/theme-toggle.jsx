"use client"

"use client"
import React from "react"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <button
      className="rounded-md border border-border px-3 py-1.5 text-sm"
      onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      aria-label="Toggle theme"
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  )
}
