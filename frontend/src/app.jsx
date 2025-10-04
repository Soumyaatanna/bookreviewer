import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/navbar.jsx"
import ErrorBoundary from "./components/ErrorBoundary.jsx"
import Login from "./pages/login.jsx"
import Signup from "./pages/signup.jsx"
import BookList from "./pages/book-list.jsx"
import BookDetails from "./pages/book-details.jsx"
import AddEditBook from "./pages/add-edit-book.jsx"
import Profile from "./pages/profile.jsx"
import ProtectedRoute from "./components/protected-route.jsx"

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <ErrorBoundary>
          <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route
            path="/books/new"
            element={
              <ProtectedRoute>
                <AddEditBook mode="create" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books/:id/edit"
            element={
              <ProtectedRoute>
                <AddEditBook mode="edit" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </div>
  )
}
